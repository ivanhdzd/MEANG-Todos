import { Actions, CREATE_TODO, UPDATE_TODO, DELETE_TODO, SET_TODOS, CLEAR_TODOS } from '../actions/todos.actions';
import { Todo } from '../../models/todo.model';
import { clone } from '../../functions/helpers';

/**
 * Todos reducer function.
 * @param state (Todo[]) old state value, it's read only.
 * @param action (Actions) to do in this reducer.
 * @returns Todo[]
 */
export function todos(state: Todo[] = null, action: Actions): Todo[] {
	switch (action.type) {
		case CREATE_TODO:
			return createTodo(clone(state), <Todo>action.payload);
		case UPDATE_TODO:
			return updateTodo(clone(state), <Todo>action.payload);
		case DELETE_TODO:
			return deleteTodo(clone(state), <string>action.payload);
		case SET_TODOS:
			return <Todo[]>action.payload;
		case CLEAR_TODOS:
			return null;
		default:
			return state;
	}
}

/**
 * Create a todo and push it in state array.
 * @param state (Todo[]) old state value.
 * @param todo (Todo) data to push to state value.
 * @returns Todo[]
 */
function createTodo(state: Todo[], todo: Todo): Todo[] {
	if (!state) return [todo];
	state.push(todo);
	return state;
}

/**
 * Update a todo in state array.
 * @param state (Todo[]) old state value.
 * @param todo (Todo) data to update.
 * @returns Todo[]
 */
function updateTodo(state: Todo[], todo: Todo): Todo[] {
	if (!state) return [todo];
	const index: number = state.findIndex((obj: Todo) => obj.id === todo.id);
	if (index === -1) return state;
	state[index] = todo;
	return state;
}

/**
 * Remove a todo from state array by it ID.
 * @param state (Todo[]) old state value.
 * @param id (string) todo to delete.
 */
function deleteTodo(state: Todo[], id: string): Todo[] {
	if (!state || state.length === 0) return null;
	const index: number = state.findIndex((obj: Todo) => obj.id === id);
	if (index === -1) return state;
	state.splice(index, 1);
	return state;
}