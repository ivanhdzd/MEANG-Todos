import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Apollo } from 'apollo-angular';

import { BaseAuthService } from '../../bases/base-auth.service';
import { AUTH_STATUS } from '../../enumerators/auth-status.enumerator';
import { AppState } from '../../ngrx/app-state';
import { User } from '../../models/user.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService extends BaseAuthService {
	/** Apollo instance name */
	protected apolloIntance: string = 'public';

	constructor(protected apollo: Apollo, protected store: Store<AppState>) {
		super(apollo, store);
	}

	/**
	 * Sign in an user by email and password.
	 * @param email (string) to can sign in.
	 * @param password (string) to can sign in.
	 * @returns Promise<void>
	 */
	public async SignIn(email: string, password: string): Promise<void> {
		const query: string = `query ($email: String!, $password: String!)
			{ signIn(email: $email, password: $password) }`;
		const variables: any = { email, password };
		const { signIn } = await this.Query(query, variables);
		this.token = signIn;
		this.PublishStatus(AUTH_STATUS.CLIENT);
	}

	/**
	 * Sign up new user.
	 * @param user (User) data to create new user.
	 * @param password (string) user.
	 * @returns Promise<void>
	 */
	public async SignUp(user: User, password: string): Promise<void> {
		const mutation: string = `mutation ($user: UserInput!, $password: String!)
			{ signUp(user: $user, password: $password) }`;
		const variables: any = { user, password };
		await this.Mutation(mutation, variables);
	}
}