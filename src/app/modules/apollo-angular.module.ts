import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';

import { GQL_PUBLIC_URL, GQL_CLIENT_URL, WS_GQL_CLIENT_URL } from '../constants/urls';
import { AuthService } from '../services/auth/auth.service';
import { AUTH_STATUS } from '../enumerators/auth-status.enumerator';

@NgModule({
	imports: [
		HttpClientModule,
		ApolloModule,
		HttpLinkModule
	],
	exports: [
		ApolloModule,
		HttpLinkModule
	]
})
export class ApolloAngularModule {
	/** Authentication status instance */
	private _authStatus: AUTH_STATUS = AUTH_STATUS.LOADING;

	constructor(apollo: Apollo, httpLink: HttpLink, auth: AuthService) {
		/** Create Apollo public instance, it not need authentication credentials */
		this._createApolloPublic(apollo, httpLink);
		/** Subscribe to authentication status */
		auth.status$.subscribe((status: AUTH_STATUS) => {
			if (this._authStatus === status) return;
			/** Store authentication status */
			this._authStatus = status;
			/** Store apollo client instance in a variable */
			const apolloInstance = apollo.use('client');
			/** Create/reset apollo client instance according to authentication status */
			switch (status) {
				case AUTH_STATUS.PUBLIC:
					/** If apollo client instane exists, reset it */
					if (apolloInstance) apolloInstance.getClient().resetStore();
					break;
				case AUTH_STATUS.CLIENT:
					/** If apollo client instane exists reset it, else create it */
					if (apolloInstance) apolloInstance.getClient().resetStore();
					else this._createApolloClient(apollo, httpLink, auth);
					break;
			}
		});
	}

	/**
	 * Create Apollo Public bind with server.
	 * @param apollo (Apollo) service.
	 * @param httpLink (HttpLink) service.
	 * @returns void
	 */
	private _createApolloPublic(apollo: Apollo, httpLink: HttpLink): void {
		const link = httpLink.create({ uri: GQL_PUBLIC_URL });
		const cache = new InMemoryCache();
		apollo.create({ link, cache }, 'public');
	}

	/**
	 * Create Apollo Client bind with server.
	 * @param apollo (Apollo) service.
	 * @param httpLink (HttpLink) service.
	 * @returns void
	 */
	private _createApolloClient(apollo: Apollo, httpLink: HttpLink, auth: AuthService): void {
		/** Create WebSocket Subscriptions with authentication credentials to apollo client instance */
		const ws = new WebSocketLink({
			uri: WS_GQL_CLIENT_URL,
			options: {
				connectionParams: { authorization: `Bearer ${ auth.token }` },
				reconnect: true
			}
		});
		/** Create Apollo queries/mutations Http link connection with authentication credentials */
		const http = setContext((_, { headers }) => {
			if (!headers) headers = new HttpHeaders();
			const token: string = auth.token;
			if (token) headers = headers.append('authorization', `Bearer ${ token }`);
			return { headers };
		}).concat(httpLink.create({ uri: GQL_CLIENT_URL }));
		/** Binds WebSocket and Http link connections */
		const link = split(({ query }) => {
			const res = getMainDefinition(query);
			return res.kind === 'OperationDefinition' && res.operation === 'subscription';
		}, ws, http);
		/** Creates new chache instance */
		const cache = new InMemoryCache();
		/** Create apollo client instance */
		apollo.create({ link, cache }, 'client');
	}
}