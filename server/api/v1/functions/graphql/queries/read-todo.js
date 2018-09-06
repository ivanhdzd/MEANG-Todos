import Todo from '../../../models/todo';

/**
 * Asynchronus function.
 * Get todo data from database.
 * @param id todo to get it data.
 * @returns {Todo} data.
 */
export async function ReadTodo(id) {
	const todo = await Todo.findById(id);
	if (!todo) throw new Error(`Todo '${ id }' not found.`);
	return todo;
}