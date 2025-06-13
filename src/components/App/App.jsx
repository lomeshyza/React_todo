import { useEffect, useState } from "react";
import styles from "./app.module.css";
import { Loader, Todo } from "../../components";
import { Controls } from "../Controls/Controls";
import { readTodos, createTodo, updateTodo, deleteTodo } from "../../api";
import { addTodo, setTodo, findTodo, removeTodo } from "../../utils";
import { NEW_TODO_ID } from "../../constants";

export default function App() {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchedPhrase, setSearchedPhrase] = useState("");
	const [isSorted, setIsSorted] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [isRefresh, setIsRefresh] = useState(false);

	//SAVE
	const onTodoSave = (todoId) => {
		const { title } = findTodo(todos, todoId) || {};
		if (todoId === NEW_TODO_ID) {
			createTodo({ title })
				.then((todo) => {
					console.log("Todo добавлен, ответ сервера:", todo);
					let updatedTodos = setTodo(todos, {
						id: NEW_TODO_ID,
						isEditing: false,
					});
					updatedTodos = removeTodo(updatedTodos, NEW_TODO_ID);
					updatedTodos = addTodo(updatedTodos, todo);

					setTodos(updatedTodos);
				})
				.finally(() => {
					setIsCreating(false);
					setSearchedPhrase("");
				});
		} else {
			updateTodo({ id: todoId, title }).then((response) => {
				console.log("Todo обновлён, ответ сервера:", response);
				setTodos(setTodo(todos, { id: todoId, isEditing: false }));
			});
		}
	};
	//ADD
	const onTodoAdd = () => {
		setIsCreating(true);
		setTodos(addTodo(todos));
	};
	//EDIT
	const onTodoEdit = (id) => {
		setTodos(setTodo(todos, { id, isEditing: true }));
	};

	const ontodoTitleChange = (id, newTitle) => {
		setTodos(setTodo(todos, { id, title: newTitle }));
	};
	//DELETE
	const onTodoRemove = (id) => {
		deleteTodo(id).then((response) => {
			console.log("todo удалён, ответ сервера: ", response);
			setTodos(removeTodo(todos, id));
		});
	};

	useEffect(() => {
		setIsLoading(true);
		readTodos(isSorted)
			.then((loadedTodo) => {
				const newTodos = loadedTodo.filter((item) => {
					return item.title.includes(searchedPhrase);
				});
				setTodos(newTodos);
			})
			.finally(() => setIsLoading(false));
	}, [isRefresh, isSorted]);

	return (
		<div className={styles.container}>
			<h1 className={styles.h1}>Список дел</h1>
			<Controls
				onTodoAdd={onTodoAdd}
				isCreating={isCreating}
				setSearchedPhrase={setSearchedPhrase}
				onSearch={() => setIsRefresh(!isRefresh)}
				onSorting={setIsSorted}
			/>
			{isLoading ? (
				<Loader />
			) : (
				<div className={styles.todos}>
					{todos.length === 0 ? (
						<p>Ничего не найдено</p>
					) : (
						todos.map(({ id, title, isEditing = false }) => (
							<Todo
								id={id}
								key={id}
								title={title}
								onTitleChange={(newTitle) =>
									ontodoTitleChange(id, newTitle)
								}
								onSave={() => onTodoSave(id)}
								onRemove={() => onTodoRemove(id)}
								onEdit={() => onTodoEdit(id)}
								isEditing={isEditing}
							/>
						))
					)}
				</div>
			)}
		</div>
	);
}
