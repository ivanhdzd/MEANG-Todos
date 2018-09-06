import { DeleteTodo } from '../../../../functions/graphql/mutations/delete-todo';
import { TODO_DELETED } from '../../../../constants/subscriptions';
import pubsub from '../../../../singletons/pubsub';

export const deleteTodoDef = `deleteTodo(id: ID!): Todo!`;

export async function deleteTodo(root, { id }, context, info) {
	try {
		const todoDeleted = await DeleteTodo(id);
		pubsub.publish(TODO_DELETED, { todoDeleted });
		return todoDeleted;
	} catch (err) {
		console.error('ERROR: [graphql/client/mutation] deleteTodo:', err);
		throw new Error(err);
	} finally {
		console.info('[graphql/client/mutation] deleteTodo');
	}
}

/*
{
	"query": "mutation($id: ID!) { deleteTodo(id: $id) { id, title, status, description, createdAt, updatedAt } }",
	"variables": {
		"id": "TodoID"
	}
}
*/