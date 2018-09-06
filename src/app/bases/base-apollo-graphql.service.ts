import { Apollo } from 'apollo-angular';
import { Subscription, Observable } from 'rxjs';
import gql from 'graphql-tag';

export abstract class BaseApolloGraphQLService {
	protected apolloIntance: string = null;

	constructor(protected apollo: Apollo) {}

	/**
	 * Send a GraphQL query to backend and return it response.
	 * @param query (string) GraphQL definition.
	 * @param variables (any) optional GraphQL query data variables.
	 * @returns Promise<any> data GraphQL response
	 */
	protected async Query(query: string, variables: any = null): Promise<any> {
		const queryOptions: any = { query: gql`${ query }`, ...variables && { variables } };
		return new Promise<any>((resolve: Function, reject: Function) => {
			const sub: Subscription = this.apollo.use(this.apolloIntance).watchQuery<any>(queryOptions)
				.valueChanges.subscribe(({ data, errors }) => {
					if (sub) sub.unsubscribe();
					if (errors) reject(errors);
					else resolve(data);
				}, (err: Error) => reject(err));
		});
	}

	/**
	 * Send a GraphQL mutation to backend and return it response.
	 * @param mutation (string) GraphQL definition.
	 * @param variables (any) optional GraphQL mutation data variables.
	 * @returns Promise<any> data GraphQL response
	 */
	protected async Mutation(mutation: string, variables: any = null): Promise<any> {
		const mutationOptions: any = { mutation: gql`${ mutation }`, ...variables && { variables } };
		return new Promise<any>((resolve: Function, reject: Function) => {
			const sub: Subscription = this.apollo.use(this.apolloIntance).mutate(mutationOptions)
				.subscribe(({ data, errors }) => {
					if (sub) sub.unsubscribe();
					if (errors) reject(errors);
					else resolve(data);
				}, (err: Error) => reject(err));
		});
	}

	/**
	 * Subscribe to GraphQL backend subscription.
	 * @param subscription (string) GraphQL definition.
	 * @param variables (any) optional GraphQL subscription data variables.
	 * @returns (Observable<any>)
	 */
	protected Subscription(subscription: string, variables: any = null): Observable<any> {
		const subscriptionOptions: any = { query: gql`${ subscription }`, ...variables && { variables } };
		return this.apollo.use(this.apolloIntance).subscribe(subscriptionOptions);
	}
}