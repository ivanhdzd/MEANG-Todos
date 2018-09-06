import { CreateTodo } from '../../../../functions/graphql/mutations/create-todo';
import { TODO_CREATED } from '../../../../constants/subscriptions';
import pubsub from '../../../../singletons/pubsub';

export const createTodoDef = `createTodo(todo: TodoInput!): Todo!`;

export async function createTodo(root, { todo }, context, info) {
	try {
		const todoCreated = await CreateTodo(todo);
		pubsub.publish(TODO_CREATED, { todoCreated });
		return todoCreated;
	} catch (err) {
		console.error('ERROR: [graphql/client/mutation] createTodo:', err);
		throw new Error(err);
	} finally {
		console.info('[graphql/client/mutation] createTodo');
	}
}

/*
{
	"query": "mutation($todo: TodoInput!) { createTodo(todo: $todo) { id, title, status, description, createdAt, updatedAt } }",
	"variables": {
		"todo": {
			"title": "A title",
			"status": "WAITING",
			"description": "A description"
		}
	}
}
*/