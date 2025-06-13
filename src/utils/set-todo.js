export const setTodo = (todos, newTodoData) =>
	todos.map((todo) =>
		todo.id === newTodoData.id ? {
			...todo,
			...newTodoData
		} :
			todo
)
