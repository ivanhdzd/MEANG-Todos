import { TODO_DELETED } from '../../../../constants/subscriptions';
import pubsub from '../../../../singletons/pubsub';

export const todoDeletedDef = `todoDeleted: Todo`;

export const todoDeleted = {
	resolve: (root, params, context, info) => {
		console.info('[graphql/client/subscription] todoDeleted');
		return root ? root.todoDeleted : null;
	},
	subscribe: () => pubsub.asyncIterator(TODO_DELETED)
};

/*
{
	"query": "subscription { todoDeleted { id, title, status, description, createdAt, updatedAt } }"
}
*/