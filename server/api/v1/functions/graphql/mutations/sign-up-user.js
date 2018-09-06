import User from '../../../models/user';

/**
 * Asynchronus function.
 * Sign up new user, if email is valid, returns true, else returns an error.
 * @param {User} user data.
 * @param {string} password to set into nnew user.
 * @returns {boolean} default true.
 */
export async function SignUpUser(user, password) {
	user = new User(user);
	if (!user) throw new Error('Can\'t create new user.');

	user.setPassword(password);
	user = await user.save();
	if (!user) throw new Error('Can\'t save new user.');

	return true;
}