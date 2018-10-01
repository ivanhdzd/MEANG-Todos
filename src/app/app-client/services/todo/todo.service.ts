import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseApolloGraphQLService } from '../../../bases/base-apollo-graphql.service';
import { CreateTodo, UpdateTodo, DeleteTodo, SetTodos } from '../../../ngrx/actions/todos.actions';
import { AUTH_STATUS } from '../../../enumerators/auth-status.enumerator';
import { AuthService } from '../auth/auth.service';
import { AppState } from '../../../ngrx/app-state';
import { Todo } from '../../../models/todo.model';

@Injectable()
export class TodoService extends BaseApolloGraphQLService {
	/** Apollo instance name */
	protected apolloIntance: string = 'client';

	/** Todo created internal subscription */
	private _todoCreatedSub: Subscription = null;
	/** Todo updated internal subscription */
	private _todoUpdatedSub: Subscription = null;
	/** Todo deleted internal subscription */
	private _todoDeletedSub: Subscription = null;

	/** Todo created Observable */
	public readonly todoCreated$: Observable<Todo> = this.Subscription(`subscription { todoCreated
		{ id, title, status, description, createdAt, updatedAt } }`).pipe(map(({ data, errors }) => {
			if (errors) throw new Error(data.errors);
			return <Todo>data.todoCreated;
		}));

	/** Todo updated Observable */
	public readonly todoUpdated$: Observable<Todo> = this.Subscription(`subscription { todoUpdated
		{ id, title, status, description, createdAt, updatedAt } }`).pipe(map(({ data, errors }) => {
			if (errors) throw new Error(data.errors);
			return <Todo>data.todoUpdated;
		}));

	/** Todo deleted Observable */
	public readonly todoDeleted$: Observable<Todo> = this.Subscription(`subscription { todoDeleted
		{ id, title, status, description, createdAt, updatedAt } }`).pipe(map(({ data, errors }) => {
			if (errors) throw new Error(data.errors);
			return <Todo>data.todoDeleted;
		}));

	/** Todos array Observable from NgrxStore */
	public readonly todos$: Observable<Todo[]> = this.store.select('todos');

	constructor(protected apollo: Apollo, private store: Store<AppState>, auth: AuthService) {
		super(apollo);
		auth.status$.subscribe((status: AUTH_STATUS) => this._Init(status));
	}

//#region PUBLIC

	/**
	 * Create a todo and registry it in backend.
	 * @param todo (Todo) data to create new todo in backend.
	 * @returns Promise<Todo> GraphQL Todo object response.
	 */
	public async CreateTodo(todo: Todo): Promise<Todo> {
		const mutation: string = `mutation($todo: TodoInput!)
			{ createTodo(todo: $todo) { id, title, status, description, createdAt, updatedAt } }`;
		const variables: any = { todo };
		const { createTodo } = await this.Mutation(mutation, variables);
		const newTodo: Todo = <Todo>createTodo;
		return newTodo;
	}

	/**
	 * Read todos from backend.
	 * @returns Promise<Todo[]> Todos array.
	 */
	public async ReadTodos(): Promise<Todo[]> {
		const query: string = `query { readTodos { id, title, status } }`;
		const { readTodos } = await this.Query(query);
		const todos: Todo[] = <Todo[]>readTodos;
		this.store.dispatch(new SetTodos(todos));
		return todos;
	}

	/**
	 * Read todo data from backend.
	 * @param id (string) Todo to get it data.
	 * @returns Promise<Todo> Todo data.
	 */
	public async ReadTodo(id: string): Promise<Todo> {
		const query: string = `query($id: ID!) { readTodo(id: $id)
			{ title, status, description, createdAt, updatedAt } }`;
		const variables: any = { id };
		const { readTodo } = await this.Query(query, variables);
		const todo: Todo = { ...readTodo, id };
		this.store.dispatch(new UpdateTodo(todo));
		return todo;
	}

	/**
	 * Update a todo and registry it in backend.
	 * @param todo (Todo) data to update todo in backend.
	 * @returns Promise<Todo> GraphQL Todo object response.
	 */
	public async UpdateTodo(todo: Todo): Promise<Todo> {
		const mutation: string = `mutation($todo: TodoInput!) { updateTodo(todo: $todo)
			{ title, status, description, createdAt, updatedAt } }`;
		const variables: any = { todo };
		const { updateTodo } = await this.Mutation(mutation, variables);
		todo = { ...updateTodo, id: todo.id };
		return todo;
	}

	/**
	 * Delete a todo in backend.
	 * @param id (string) todo to delete in backend.
	 * @returns Promise<Todo> GraphQL Todo object response.
	 */
	public async DeleteTodo(id: string): Promise<Todo> {
		const mutation: string = `mutation($id: ID!) { deleteTodo(id: $id) { id, title, status, description } }`;
		const variables: any = { id };
		const { deleteTodo } = await this.Mutation(mutation, variables);
		const todo: Todo = <Todo>deleteTodo;
		return todo;
	}

//#endregion PUBLIC

//#region PRIVATE

	/**
	 * Initialize todos subscriptions according to current authentication status.
	 * @param status (AUTH_STATUS) authentication status.
	 * @returns void
	 */
	private _Init(status: AUTH_STATUS): void {
		switch (status) {
			case AUTH_STATUS.CLIENT:
				this._Subscribe2Todos();
				break;
			default:
				this._Unsubscribe2Todos();
		}
	}

	/**
	 * Subscribe to all todo subscriptions (created, updated, deleted).
	 * @returns void
	 */
	private _Subscribe2Todos(): void {
		this._todoCreatedSub = this.todoCreated$.subscribe(
			(todo: Todo) => this.store.dispatch(new CreateTodo(todo)),
			(err: Error) => console.warn('[ERROR] TodoService._Subscribe2Todos._todoCreatedSub:', err)
		);
		this._todoUpdatedSub = this.todoUpdated$.subscribe(
			(todo: Todo) => this.store.dispatch(new UpdateTodo(todo)),
			(err: Error) => console.warn('[ERROR] TodoService._Subscribe2Todos._todoUpdatedSub:', err)
		);
		this._todoDeletedSub = this.todoDeleted$.subscribe(
			(todo: Todo) => this.store.dispatch(new DeleteTodo(todo.id)),
			(err: Error) => console.warn('[ERROR] TodoService._Subscribe2Todos._todoDeletedSub:', err)
		);
	}

	/**
	 * Unsubscribe to all todo subscriptions (created, updated, deleted).
	 * @returns void
	 */
	private _Unsubscribe2Todos(): void {
		if (this._todoCreatedSub) this._todoCreatedSub.unsubscribe();
		if (this._todoUpdatedSub) this._todoUpdatedSub.unsubscribe();
		if (this._todoDeletedSub) this._todoDeletedSub.unsubscribe();
	}

//#endregion PRIVATE
}