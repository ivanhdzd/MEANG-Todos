import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsChangesGuard } from '../guards/can-deactivate/forms-changes/forms-changes.guard';

import { AppClientComponent } from '../app-client.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { TodosComponent } from '../pages/todos/todos.component';
import { TodoComponent } from '../pages/todo/todo.component';
import { CreateTodoComponent } from '../pages/create-todo/create-todo.component';

const routes: Routes = [
	{ path: '', component: AppClientComponent, children: [
		{ path: 'profile', component: ProfileComponent, canDeactivate: [FormsChangesGuard] },
		{ path: 'todos', component: TodosComponent },
		{ path: 'todo/:id', component: TodoComponent, canDeactivate: [FormsChangesGuard] },
		{ path: 'create-todo', component: CreateTodoComponent, canDeactivate: [FormsChangesGuard] }
	] },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}