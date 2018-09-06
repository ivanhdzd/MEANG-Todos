export const readUserDef = `readUser: User`;

export async function readUser(root, params, { user }, info) {
	try {
		return user;
	} catch (err) {
		console.error('ERROR: [client/query] readUser:', err);
		throw new Error(err);
	} finally {
		console.info('[client/query] readUser');
	}
};

/*
{
	"query": "query { readUser { id, username, name, lastName, motherLastName, email, phone } }"
}
*/