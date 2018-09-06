import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { BaseApolloGraphQLService } from '../../../bases/base-apollo-graphql.service';
import { CreateTodo, UpdateTodo, DeleteTodo, SetTodos } from '../../../ngrx/actions/todos.actions';
import { AppState } from '../../../ngrx/app-state';
import { Todo } from '../../../models/todo.model';

@Injectable()
export class TodoService extends BaseApolloGraphQLService {
	protected apolloIntance: string = 'client';

	/** Todos array Observable from NgrxStore */
	public todos: Observable<Todo[]> = this.store.select('todos');

	constructor(protected apollo: Apollo, private store: Store<AppState>) {
		super(apollo);
	}

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
	 * @returns Promise<Todo[]>
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
	 * @returns Promise<Todo>
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

	/**
	 * Get notification when a todo was created.
	 * @param cbOnSuccess (Function) optional, it has todo created as unique parameter.
	 * @param cbOnError (Function) optional, executed if there are an error in the subscription.
	 * @returns Subscription
	 */
	public Subscribe2TodoCreated(cbOnSuccess: Function = null, cbOnError: Function = null): Subscription {
		const subscription: string = `subscription { todoCreated
			{ id, title, status, description, createdAt, updatedAt } }`;
		return this.Subscription(subscription).subscribe(({ data }) => {
			const todo: Todo = <Todo>data.todoCreated;
			this.store.dispatch(new CreateTodo(todo));
			if (cbOnSuccess) cbOnSuccess(todo);
		}, (err: Error) => {
			console.warn('[ERROR] TodoService.Subscribe2TodoCreated:', err);
			if (cbOnError) cbOnError(err);
		});
	}

	/**
	 * Get notification when a todo was updated.
	 * @param cbOnSuccess (Function) optional, it has todo updated as unique parameter.
	 * @param cbOnError (Function) optional, executed if there are an error in the subscription.
	 * @returns Subscription
	 */
	public Subscribe2TodoUpdated(cbOnSuccess: Function = null, cbOnError: Function = null): Subscription {
		const subscription: string = `subscription { todoUpdated
			{ id, title, status, description, createdAt, updatedAt } }`;
		return this.Subscription(subscription).subscribe(({ data }) => {
			const todo: Todo = <Todo>data.todoUpdated;
			this.store.dispatch(new UpdateTodo(todo));
			if (cbOnSuccess) cbOnSuccess(todo);
		}, (err: Error) => {
			console.warn('[ERROR] TodoService.Subscribe2TodoUpdated:', err);
			if (cbOnError) cbOnError(err);
		});
	}

	/**
	 * Get notification when a todo was deleted.
	 * @param cbOnSuccess (Function) optional, it has todo deleted as unique parameter.
	 * @param cbOnError (Function) optional, executed if there are an error in the subscription.
	 * @returns Subscription
	 */
	public Subscribe2TodoDeleted(cbOnSuccess: Function = null, cbOnError: Function = null): Subscription {
		const subscription: string = `subscription { todoDeleted
			{ id, title, status, description, createdAt, updatedAt } }`;
		return this.Subscription(subscription).subscribe(({ data }) => {
			const todo: Todo = <Todo>data.todoDeleted;
			this.store.dispatch(new DeleteTodo(todo.id));
			if (cbOnSuccess) cbOnSuccess(todo);
		}, (err: Error) => {
			console.warn('[ERROR] TodoService.Subscribe2TodoDeleted:', err);
			if (cbOnError) cbOnError(err);
		});
	}
}