import Todo from '../../../models/todo';

/**
 * Asynchronus function.
 * Update a todo and save it into database.
 * @param todo data to update.
 * @returns {Todo} todo updated.
 */
export async function UpdateTodo(todo) {
	const { id } = todo;
	todo = await Todo.findByIdAndUpdate(id, todo);
	if (!todo) throw new Error(`Todo to update '${ id }' not found.`);
	return Todo.findById(id);
}