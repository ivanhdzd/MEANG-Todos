import { TODO_STATUS } from '../enumerators/todo-status.enumerator';
import { User } from './user.model';

export interface Todo {
	id?: string;
	title?: string;
	description?: string;
	status?: TODO_STATUS;
	user?: User;
	createdAt?: string;
	updatedAt?: string;
	__typename?: string;
}