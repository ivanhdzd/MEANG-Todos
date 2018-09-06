import { SignUpUser } from '../../../../functions/graphql/mutations/sign-up-user';

export const signUpDef = `signUp(user: UserInput!, password: String!): Boolean!`;

export async function signUp(root, { user, password }, context, info) {
	try {
		return await SignUpUser(user, password);
	} catch (err) {
		console.error('ERROR: [graphql/public/mutation] signUp:', err);
		throw new Error(err);
	} finally {
		console.info('[graphql/public/mutation] signUp');
	}
}

/*
{
	"query": "mutation ($user: UserInput!, $password: String!) { signUp(user: $user, password: $password) }",
	"variables": {
		"user": {
			"username": "your-user-name",
			"name": "name",
			"lastName": "last name",
			"motherLastName": "mother last name",
			"email": "your@email.address",
			"phone": "1234567890"
		},
		"password": "your-password"
	}
}
*/