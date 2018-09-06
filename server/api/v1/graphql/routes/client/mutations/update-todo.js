import { UpdateTodo } from '../../../../functions/graphql/mutations/update-todo';
import { TODO_UPDATED } from '../../../../constants/subscriptions';
import pubsub from '../../../../singletons/pubsub';

export const updateTodoDef = `updateTodo(todo: TodoInput!): Todo!`;

export async function updateTodo(root, { todo }, context, info) {
	try {
		const todoUpdated = await UpdateTodo(todo);
		pubsub.publish(TODO_UPDATED, { todoUpdated });
		return todoUpdated;
	} catch (err) {
		console.error('ERROR: [graphql/client/mutation] updateTodo:', err);
		throw new Error(err);
	} finally {
		console.info('[graphql/client/mutation] updateTodo');
	}
}

/*
{
	"query": "mutation($todo: TodoInput!) { updateTodo(todo: $todo) { id, title, status, description, createdAt, updatedAt } }",
	"variables": {
		"todo": {
			"id": "TodoID",
			"title": "A title",
			"status": "WAITING",
			"description": "A description"
		}
	}
}
*/