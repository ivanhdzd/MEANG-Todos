import { Todo } from '../models/todo.model';
import { User } from '../models/user.model';

export interface AppState {
	readonly currentUser: User;
	readonly todos: Todo[];
}