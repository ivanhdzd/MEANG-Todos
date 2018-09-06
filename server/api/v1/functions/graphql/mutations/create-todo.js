import Todo from '../../../models/todo';

/**
 * Asynchronus function.
 * Create new todo and save it into database.
 * @param todo data to create new todo.
 * @returns {Todo} todo created.
 */
export async function CreateTodo(todo) {
	todo = new Todo(todo);
	if (!todo) throw new Error(`Can't create new todo.`);
	todo = await todo.save();
	if (!todo) throw new Error(`Can't save new todo.`);
	return todo;
}