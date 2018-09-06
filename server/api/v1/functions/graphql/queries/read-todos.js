import Todo from '../../../models/todo';

/**
 * Asynchronus function.
 * Get all todos from database.
 * @returns {Todo[]} a todos array.
 */
export async function ReadTodos() {
	return Todo.find();
}