import { Action } from '@ngrx/store';

import { Todo } from '../../models/todo.model';

export const CREATE_TODO: string = '[TODO] Create';
export const UPDATE_TODO: string = '[TODO] Update';
export const DELETE_TODO: string = '[TODO] Remove';

export const SET_TODOS: string = '[TODOS] Set';
export const CLEAR_TODOS: string = '[TODOS] Clear';

/**
 * Ngrx store action to create new todo.
 * It needs a Todo in a constructor parameter.
 */
export class CreateTodo implements Action {
	readonly type: string = CREATE_TODO;
	constructor(public payload: Todo) {}
}

/**
 * Ngrx store action to update a todo.
 * It needs a Todo in a constructor parameter.
 */
export class UpdateTodo implements Action {
	readonly type: string = UPDATE_TODO;
	constructor(public payload: Todo) {}
}

/**
 * Ngrx store action to delete a todo.
 * It needs a todo ID (string) in a constructor parameter.
 */
export class DeleteTodo implements Action {
	readonly type: string = DELETE_TODO;
	constructor(public payload: string) {}
}

/**
 * Ngrx store action to set a todos array.
 * It needs a Todo array in a constructor parameter.
 */
export class SetTodos implements Action {
	readonly type: string = SET_TODOS;
	constructor(public payload: Todo[]) {}
}

/**
 * Ngrx store action to clear todos array state.
 * It needs a null value in a constructor parameter.
 */
export class ClearTodos implements Action {
	readonly type: string = CLEAR_TODOS;
	constructor(public payload: void) {}
}

export type Actions = CreateTodo | UpdateTodo | DeleteTodo | SetTodos | ClearTodos;