import { createTodoDef, createTodo } from './create-todo';
import { deleteTodoDef, deleteTodo } from './delete-todo';
import { updateTodoDef, updateTodo } from './update-todo';

const defs = [
	createTodoDef,
	deleteTodoDef,
	updateTodoDef
];

export const MutationDef = defs.length > 0 ? `
	type Mutation {
		${ defs.join('\n\t\t') }
	}
` : '';

export const Mutation = defs.length > 0 ? {
	createTodo,
	deleteTodo,
	updateTodo
} : null;