import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { TodoService } from '../../services/todo/todo.service';
import { Todo } from '../../../models/todo.model';

@Component({
	selector: 'app-todos',
	templateUrl: './todos.component.html',
	styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {
	/** Todos subscription */
	private _todosSub: Subscription = null;
	/** Todos array data */
	public todos: Todo[] = null;

	constructor(title: Title, private todoService: TodoService) {
		title.setTitle('TODOS - Todos list');
	}

	/**
	 * Subscribe to todos observable.
	 * @returns void
	 */
	public ngOnInit(): void {
		window.scroll(0, 0);
		try {
			this._todosSub = this.todoService.todos$.subscribe((todos: Todo[]) => this.todos = todos);
		} catch (err) {
			console.warn('[ERROR] TodosComponent.ngOnInit:', err);
		}
	}

	/**
	 * Insubscribe to todos observable.
	 * @returns void
	 */
	public ngOnDestroy(): void {
		if (this._todosSub) this._todosSub.unsubscribe();
	}
}