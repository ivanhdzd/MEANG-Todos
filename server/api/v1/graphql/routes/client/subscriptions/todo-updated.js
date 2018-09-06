import { TODO_UPDATED } from '../../../../constants/subscriptions';
import pubsub from '../../../../singletons/pubsub';

export const todoUpdatedDef = `todoUpdated: Todo`;

export const todoUpdated = {
	resolve: (root, params, context, info) => {
		console.info('[graphql/client/subscription] todoUpdated');
		return root ? root.todoUpdated : null;
	},
	subscribe: () => pubsub.asyncIterator(TODO_UPDATED)
};

/*
{
	"query": "subscription { todoUpdated { id, title, status, description, createdAt, updatedAt } }"
}
*/