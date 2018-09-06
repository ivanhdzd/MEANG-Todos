import { ReadTodos } from '../../../../functions/graphql/queries/read-todos';

export const readTodosDef = `readTodos: [Todo!]!`;

export const readTodos = async (root, params, context, info) => {
	try {
		return await ReadTodos();
	} catch (err) {
		console.error('ERROR: [graphql/client/query] readTodos:', err);
		throw new Error(err);
	} finally {
		console.info('[graphql/client/query] readTodos');
	}
}

/*
{
	"query": "query { readTodos { id, title, status, description, createdAt, updatedAt } }"
}
*/