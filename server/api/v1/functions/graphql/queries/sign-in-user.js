import User from '../../../models/user';

/**
 * Asynchronus function.
 * Sign in user to get ir access token.
 * @param {string} email to find user.
 * @param {string} password to validate user access.
 * @returns {string} (string) token.
 */
export async function SignInUser(email, password) {
	const user = await User.findOne({ email });
	if (!user) throw new Error('User not found.');
	if (!user.validatePassword(password)) throw new Error('Password incorrect.');
	return user.generateJWT();
}