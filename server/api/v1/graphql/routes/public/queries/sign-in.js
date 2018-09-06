import { SignInUser } from '../../../../functions/graphql/queries/sign-in-user';

export const signInDef = `signIn(email: String!, password: String!): String!`;

export async function signIn(root, { email, password }, context, info) {
	try {
		return await SignInUser(email, password);
	} catch (err) {
		console.error('ERROR: [graphql/public/query] signIn:', err);
		throw new Error(err);
	} finally {
		console.info('[graphql/public/query] signIn');
	}
};

/*
{
	"query": "query ($email: String!, $password: String!) { signIn(email: $email, password: $password) }",
	"variables": {
		"email": "your@email.address",
		"password": "your-password"
	}
}
*/