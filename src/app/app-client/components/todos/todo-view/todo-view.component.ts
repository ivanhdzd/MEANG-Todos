import { Component, Input } from '@angular/core';

import { Todo } from '../../../../models/todo.model';

@Component({
	selector: 'app-todo-view',
	templateUrl: './todo-view.component.html',
	styleUrls: ['./todo-view.component.scss']
})
export class TodoViewComponent {
	@Input() public todo: Todo = null;
}