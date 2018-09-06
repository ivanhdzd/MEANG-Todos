import { User } from '../../models/user.model';
import { Actions, SET_CURRENT_USER, CLEAR_CURRENT_USER } from '../actions/current-user.actions';

/**
 * Current user reducer function.
 * @param state (User) old state value, it's read only.
 * @param action (Actions) to do in this reducer.
 * @returns User
 */
export function currentUser(state: User = null, action: Actions): User {
	switch (action.type) {
		case SET_CURRENT_USER:
			return <User>action.payload;
		case CLEAR_CURRENT_USER:
			return null;
		default:
			return state;
	}
}