import jwt from 'jsonwebtoken';

import User from '../models/user';

const secret = process.env.JWT_SECRET;

/**
 * Decrypt JTW token.
 * @param {string} authorization data get from headers or params connections.
 * @returns {Object} JWT token decrypted.
 */
function decryptJWT(authorization) {
	if (!authorization) throw new Error('User token not found.');

	const [ bearer, token ] = authorization.split(' ');
	if (bearer !== 'Bearer') throw new Error('Authorization header malformed.');

	return jwt.verify(token, secret);
}

/**
 * Asynchronus function.
 * Authenticate user by it authorization token.
 * @param {string} authorization data get from headers or params connections.
 * @returns {User} user data.
 */
export async function authenticate(authorization) {
	const { id } = decryptJWT(authorization);

	const user = await User.findById(id);
	if (!user) throw new Error('User data from token not found.');

	return user;
}