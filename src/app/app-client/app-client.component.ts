import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { ModalWindowService } from '../services/modal-window/modal-window.service';
import { AuthService } from './services/auth/auth.service';
import { TodoService } from './services/todo/todo.service';
import { Todo } from '../models/todo.model';

@Component({
	selector: 'app-app-client',
	templateUrl: './app-client.component.html',
	styleUrls: ['./app-client.component.scss'],
})
export class AppClientComponent implements OnInit, OnDestroy {
	/** Router subscription */
	private _routerSub: Subscription;

	/** Todo created subscription */
	private _createdSub: Subscription;
	/** Todo updated subscription */
	private _updatedSub: Subscription;
	/** Todo deleted subscription */
	private _deletedSub: Subscription;

	constructor(
		private router: Router,
		private modalWindow: ModalWindowService,
		private todoService: TodoService,
		private auth: AuthService
	) {}

	/**
	 * Subscribe to authentication status.
	 * Get navbar togle button to manipulate it.
	 * @returns void
	 */
	public ngOnInit(): void {
		try {
			/** Start url validator observable */
			this._UrlObservable();
			/** Read user data */
			this.auth.ReadUser();
			/** Read todos from backend by a subscription */
			this.todoService.ReadTodos();
			/** Subscribe to todoCreated backend subscription */
			this.todoService.todoCreated$.subscribe((todo: Todo) => console.info(todo));
			this._createdSub = this.todoService.todoCreated$.subscribe((todo: Todo) => this.modalWindow.OpenMessage({
				title: `New todo '${ todo.id }' created.`,
				message: `New todo '${ todo.title }' is already created,
				<a href="/client/todo/${ todo.id }" target="_blank">you can go to todo details here.</a>`
			}));
			/** Subscribe to todoUpdated backend subscription */
			this._updatedSub = this.todoService.todoUpdated$.subscribe((todo: Todo) => this.modalWindow.OpenMessage({
				title: `Todo '${ todo.id }' updated.`,
				message: `Todo '${ todo.title }' is already updated,
				<a href="/client/todo/${ todo.id }" target="_blank">you can go to todo details here.</a>`
			}));
			/** Subscribe to todoDeleted backend subscription */
			this._deletedSub = this.todoService.todoDeleted$.subscribe((todo: Todo) => this.modalWindow.OpenMessage({
				title: `Todo '${ todo.id }' deleted.`,
				message: `Todo '${ todo.title }' was deleted from database.`
			}));
		} catch (err) {
			console.warn('[ERROR] AppClientComponent.ngOnInit:', err);
		}
	}

	/**
	 * Unsubscribe to all subscriptions.
	 * @returns void
	 */
	public ngOnDestroy(): void {
		if (this._routerSub) this._routerSub.unsubscribe();
		if (this._createdSub) this._createdSub.unsubscribe();
		if (this._updatedSub) this._updatedSub.unsubscribe();
		if (this._deletedSub) this._deletedSub.unsubscribe();
	}

	/**
	 * Check if user go to '/client' route, to redirect to todos
	 * @returns void
	 */
	private _UrlObservable(): void {
		const invalidRoute: string = '/client';
		if (this.router.url === invalidRoute) this.router.navigateByUrl('/client/todos');
		this._routerSub = this.router.events.subscribe(event => {
			if (!(event instanceof NavigationEnd)) return;
			if (event.url === invalidRoute) this.router.navigateByUrl('/client/todos');
		});
	}
}