export const TodoType = `
	type Todo {
		id: ID
		title: String
		description: String
		status: TodoStatusEnum
		user: User
		createdAt: String
		updatedAt: String
	}
`;