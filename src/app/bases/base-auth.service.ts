import { Apollo } from 'apollo-angular';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';

import { AppState } from '../ngrx/app-state';
import { BaseApolloGraphQLService } from './base-apollo-graphql.service';
import { ClearCurrentUser } from '../ngrx/actions/current-user.actions';
import { AUTH_STATUS } from '../enumerators/auth-status.enumerator';
import { User } from '../models/user.model';

export abstract class BaseAuthService extends BaseApolloGraphQLService {
//#region VARIABLES

	/** Authentication status value */
	private static _status: AUTH_STATUS = AUTH_STATUS.LOADING;
	/** A BehaviorSubject authentication status */
	private static _statusBS: BehaviorSubject<AUTH_STATUS> = new BehaviorSubject<AUTH_STATUS>(AUTH_STATUS.LOADING);

	/** ID client token properties */
	public get token(): string { return localStorage.getItem('token') }
	public set token(token: string) { localStorage.setItem('token', token) }

//#endregion VARIABLES

	constructor(
		protected apollo: Apollo,
		protected store: Store<AppState>
	) {
		super(apollo);
		this._Init();
	}

//#region PUBLIC

	/**
	 * Sign out current user, this action sign out authenticated user and clear all user data.
	 * @returns void
	 */
	public SignOut(): void {
		localStorage.clear();
		this.PublishStatus(AUTH_STATUS.PUBLIC);
		this.store.dispatch(new ClearCurrentUser(null));
	}

	/**
	 * Subscribe to auth status.
	 * @param callback Function with status as unique parameter.
	 * @returns Subscription
	 */
	public Subscribe2Status(callback: Function): Subscription {
		return BaseAuthService._statusBS.subscribe((status: AUTH_STATUS) => callback(status));
	}

	/**
	 * Subscribe to current user data.
	 * @param callback Function with current user data as unique parameter.
	 * @returns Subscription
	 */
	public Subscribe2CurrentUser(callback: Function): Subscription {
		return this.store.select('currentUser').subscribe((user: User) => callback(user));
	}

//#endregion PUBLIC

//#region PROTECTED

	/**
	 * Publis authentication status
	 * @param status (AUTH_STATUS) to publish to _statusBS BehaviorSubject.
	 * @returns void
	 */
	protected PublishStatus(status: AUTH_STATUS): void {
		if (BaseAuthService._status === status) return;
		BaseAuthService._status = status;
		BaseAuthService._statusBS.next(status);
	}

//#endregion PROTECTED

//#region PRIVATE

	/**
	 * Check if an user already logged and go to it corresponding route.
	 * @returns void
	 */
	private _Init(): void {
		if (this.token) this.PublishStatus(AUTH_STATUS.CLIENT);
		else this.PublishStatus(AUTH_STATUS.PUBLIC);
	}

//#endregion PRIVATE
}