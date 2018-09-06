import { Action } from '@ngrx/store';

import { User } from '../../models/user.model';

export const SET_CURRENT_USER: string = '[CURRENT_USER] Set';
export const CLEAR_CURRENT_USER: string = '[CURRENT_USER] Clear';

/**
 * Ngrx store action to set current user stte.
 * It needs an User in a constructor parameter.
 */
export class SetCurrentUser implements Action {
	readonly type: string = SET_CURRENT_USER;
	constructor(public payload: User) {}
}

/**
 * Ngrx store action to clear current user state.
 * It needs a null value in a constructor parameter.
 */
export class ClearCurrentUser implements Action {
	readonly type: string = CLEAR_CURRENT_USER;
	constructor(public payload: void) {}
}

export type Actions = SetCurrentUser | ClearCurrentUser;