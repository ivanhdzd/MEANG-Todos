import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './modules/app-routing.module';
import { NgrxStoreModule } from './modules/ngrx-store.module';
import { SharedModule } from '../modules/shared.module';

import { AuthService } from './services/auth/auth.service';
import { TodoService } from './services/todo/todo.service';

import { FormsChangesGuard } from './guards/can-deactivate/forms-changes/forms-changes.guard';

import { AppClientComponent } from './app-client.component';

import { ProfileComponent } from './pages/profile/profile.component';
import { CreateTodoComponent } from './pages/create-todo/create-todo.component';
import { TodosComponent } from './pages/todos/todos.component';
import { TodoComponent } from './pages/todo/todo.component';

import { TodoFormComponent } from './components/todos/todo-form/todo-form.component';
import { TodoViewComponent } from './components/todos/todo-view/todo-view.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		NgrxStoreModule,
		SharedModule
	],
	declarations: [
		AppClientComponent,
		ProfileComponent,
		CreateTodoComponent,
		TodosComponent,
		TodoComponent,
		TodoFormComponent,
		TodoViewComponent
	],
	providers: [AuthService, TodoService, FormsChangesGuard]
})
export class AppClientModule {}