import Todo from '../../../models/todo';

/**
 * Asynchronus function.
 * Delete todo from database.
 * @param id todo delete.
 * @returns {Todo} todo deleted.
 */
export async function DeleteTodo(id) {
	const todo = await Todo.findByIdAndRemove(id);
	if (!todo) throw new Error(`Can't delete todo '${ id }'.`);
	return todo;
}