import { todoCreatedDef, todoCreated } from './todo-created';
import { todoDeletedDef, todoDeleted } from './todo-deleted';
import { todoUpdatedDef, todoUpdated } from './todo-updated';

const defs = [
	todoCreatedDef,
	todoDeletedDef,
	todoUpdatedDef
];

export const SubscriptionDef = defs.length > 0 ? `
	type Subscription {
		${ defs.join('\n\t\t') }
	}
` : '';

export const Subscription = defs.length > 0 ? {
	todoCreated,
	todoDeleted,
	todoUpdated
} : null;