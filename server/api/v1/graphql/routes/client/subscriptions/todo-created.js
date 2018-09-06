import { TODO_CREATED } from '../../../../constants/subscriptions';
import pubsub from '../../../../singletons/pubsub';

export const todoCreatedDef = `todoCreated: Todo`;

export const todoCreated = {
	resolve: (root, params, context, info) => {
		console.info('[graphql/client/subscription] todoCreated');
		return root ? root.todoCreated : null;
	},
	subscribe: () => pubsub.asyncIterator(TODO_CREATED)
};

/*
{
	"query": "subscription { todoCreated { id, title, status, description, createdAt, updatedAt } }"
}
*/