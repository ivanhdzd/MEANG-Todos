import { ReadTodo } from '../../../../functions/graphql/queries/read-todo';

export const readTodoDef = `readTodo(id: ID!): Todo!`;

export const readTodo = async (root, { id }, context, info) => {
	try {
		return await ReadTodo(id);
	} catch (err) {
		console.error('ERROR: [graphql/client/query] readTodo:', err);
		throw new Error(err);
	} finally {
		console.info('[graphql/client/query] readTodo');
	}
}

/*
{
	"query": "query($id: ID!) { readTodo(id: $id) { id, title, status, description, createdAt, updatedAt } }",
	"variables": {
		"variables": {
		"id": "TodoID"
	}
}
*/