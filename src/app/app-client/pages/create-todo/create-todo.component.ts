import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { OnBeforeUnloadService } from '../../../services/on-before-unload/on-before-unload.service';
import { TodoService } from '../../services/todo/todo.service';
import { Todo } from '../../../models/todo.model';

@Component({
	selector: 'app-create-todo',
	templateUrl: './create-todo.component.html',
	styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {
	constructor(
		title: Title,
		private router: Router,
		private onBeforeUnload: OnBeforeUnloadService,
		private todoService: TodoService
	) {
		title.setTitle('TODOS - Create new todo');
	}

	/**
	 * Set scroll to top.
	 * @return void
	 */
	public ngOnInit(): void {
		window.scroll(0, 0);
	}

	/**
	 * Create new todo an registry it in bsckend.
	 * @param todo (Todo) data to save.
	 * @returns Promise<void>
	 */
	public async Submit(todo: Todo): Promise<void> {
		try {
			todo = await this.todoService.CreateTodo(todo);
			this.onBeforeUnload.thereAreChanges = false;
			this.router.navigate(['/client/todo', todo.id]);
		} catch (err) {
			console.warn('[ERROR] CreateTodoComponent.Submit:', err);
		}
	}

	/**
	 * Cancel todo to create and go to todos route.
	 */
	public Cancel(): void {
		this.onBeforeUnload.thereAreChanges = false;
		this.router.navigateByUrl('/client/todos');
	}
}