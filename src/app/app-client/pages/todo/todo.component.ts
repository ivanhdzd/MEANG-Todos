import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { observable2promise } from '../../../functions/helpers';
import { OnBeforeUnloadService } from '../../../services/on-before-unload/on-before-unload.service';
import { ModalWindowService } from '../../../services/modal-window/modal-window.service';
import { TodoService } from '../../services/todo/todo.service';
import { Todo } from '../../../models/todo.model';

@Component({
	selector: 'app-todo',
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {
	private _updatedSub: Subscription;
	private _deletedSub: Subscription;

	public todo: Todo = null;

	public spinnerMessage: string = 'Loading...';
	public proceeding: boolean = false;
	public editing: boolean = false;

	constructor(
		title: Title,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private onBeforeUnload: OnBeforeUnloadService,
		private modalWindow: ModalWindowService,
		private todoService: TodoService
	) {
		title.setTitle('TODOS - Todo selected');
	}

	/**
	 * Load todo data from backend, by it ID get from route.
	 * @returns Promise<void>
	 */
	public async ngOnInit(): Promise<void> {
		window.scroll(0, 0);
		try {
			/** Get todo id from route params */
			const { id } = await observable2promise(this.activatedRoute.params);
			/** Subscribe to todoUpdated and todoDeleted subscriptions */
			this._Subscribe2TodoUpdatedAndTodoCreated(id);
			/** Load todo data */
			await this._LoadTodo(id);
		} catch (err) {
			console.warn('[ERROR] TodoComponent.ngOnInit:', err);
		}
	}

	/**
	 * Unsubscribe to deleted todo subscription.
	 * @returns void
	 */
	public ngOnDestroy(): void {
		if (this._updatedSub) this._updatedSub.unsubscribe();
		if (this._deletedSub) this._deletedSub.unsubscribe();
	}

	/**
	 * Update todo data in backend.
	 * @param todo (Todo) data to update.
	 * @returns Promise<void>
	 */
	public async Save(todo: Todo): Promise<void> {
		this.spinnerMessage = 'Saving...';
		this.proceeding = true;
		try {
			this.todo = await this.todoService.UpdateTodo(todo);
			this.onBeforeUnload.thereAreChanges = false;
			this.editing = false;
		} catch (err) {
			console.warn('[ERROR] TodoComponent.Save:', err);
		} finally {
			this.proceeding = false;
		}
	}

	/**
	 * Open a modal window to confirm to user want to delete current todo.
	 * @returns void
	 */
	public Delete(): void {
		this.modalWindow.OpenConfirm({
			title: `Todo '${ this.todo.title }' to delete.`,
			message: `Sure do you want to delete todo '${ this.todo.title }'?`,
			callbackOnAccept: () => this._ConfirmedElimination()
		});
	}

	/**
	 * Delete current todo and go to todos route.
	 * @returns Promise<void>
	 */
	private async _ConfirmedElimination(): Promise<void> {
		this.spinnerMessage = 'Deleting...';
		this.proceeding = true;
		try {
			await this.todoService.DeleteTodo(this.todo.id);
			this.router.navigateByUrl('/client/todos');
		} catch (err) {
			console.warn('[ERROR] TodoComponent._ConfirmedElimination:', err);
		} finally {
			this.proceeding = false;
		}
	}

	/**
	 * Load todo data from local store or backend.
	 * @param id (string) todo get from route params.
	 * @returns Promise<void>
	 */
	private async _LoadTodo(id: string): Promise<void> {
		/** Load all todos stored in local memory */
		const todos: Todo[] = await observable2promise(this.todoService.todos);
		/** If todos are null, load current todo data from backend */
		if (!todos) {
			this.todo = await this.todoService.ReadTodo(id);
			return;
		}
		/** Get current todo from todos array from local store */
		const todo: Todo = todos.find((obj: Todo) => obj.id === id);
		/** If todo isn't found, load current todo data from backend */
		if (!todo) {
			this.todo = await this.todoService.ReadTodo(id);
			return;
		}
		/** If todo found from todos array from store is incomplete, load current todo data from backend */
		if (!todo.title || !todo.status || !todo.description) {
			this.todo = await this.todoService.ReadTodo(id);
		} else this.todo = todo;
	}

	/**
	 * Subscribe to todoUpdated and todoDeleted subscriptions.
	 * @param id (string) todo get from route params.
	 * @returns void
	 */
	public _Subscribe2TodoUpdatedAndTodoCreated(id: string): void {
		/** Subscribe to todoUpdated backend subscription */
		this._updatedSub = this.todoService.Subscribe2TodoUpdated((todo: Todo) => {
			if (todo.id !== id) return;
			/** If todo updated is current todo, update current todo */
			if (this.editing) this.modalWindow.OpenMessage({
				title: `Todo '${ todo.id }' updated.`,
				message: `Todo '${ todo.title }' is already updated, your todo unsaved changes was discarded.`
			});
			/** Update current todo and discard unsaved changes */
			this.todo = todo;
			this.editing = false;
			this.onBeforeUnload.thereAreChanges = false;
		});
		/** Subscribe to todoDeleted backend subscription */
		this._deletedSub = this.todoService.Subscribe2TodoDeleted((todo: Todo) => {
			if (todo.id !== id) return;
			/** If todo deleted is current todo, go to /client/todos route */
			this.onBeforeUnload.thereAreChanges = false;
			this.router.navigateByUrl('/client/todos');
		});
	}
}