import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Apollo } from 'apollo-angular';

import { AppState } from '../../../ngrx/app-state';
import { SetCurrentUser } from '../../../ngrx/actions/current-user.actions';
import { BaseAuthService } from '../../../bases/base-auth.service';
import { User } from '../../../models/user.model';

@Injectable()
export class AuthService extends BaseAuthService {
	protected apolloIntance: string = 'client';

	constructor(
		protected apollo: Apollo,
		protected store: Store<AppState>
	) {
		super(apollo, store);
	}

	/**
	 * Read user data from backend.
	 * @returns Promise<User>
	 */
	public async ReadUser(): Promise<User> {
		const query: string = `query { readUser
			{ username, name, lastName, motherLastName, email, phone } }`;
		const { readUser } = await this.Query(query);
		const user: User = <User>readUser;
		this.store.dispatch(new SetCurrentUser(user));
		return user;
	}
}