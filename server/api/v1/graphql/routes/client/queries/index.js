import { readTodoDef, readTodo } from './read-todo';
import { readTodosDef, readTodos } from './read-todos';
import { readUserDef, readUser } from './read-user';

const defs = [
	readTodoDef,
	readTodosDef,
	readUserDef
];

export const QueryDef = defs.length > 0 ? `
	type Query {
		${ defs.join('\n\t\t') }
	}
` : '';

export const Query = defs.length > 0 ? {
	readTodo,
	readTodos,
	readUser
} : null;