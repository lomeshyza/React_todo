import { useEffect, useState } from "react";
import {
	Route,
	Routes,
	Navigate,
	useNavigate,
} from "react-router-dom";

import styles from "./app.module.css";
import { Loader, Todo, TodoDetailed, NotFound } from "../../components";
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
	const navigate = useNavigate();

	//SAVE
	const onTodoSave = (todoId) => {
		const { title } = findTodo(todos, todoId) || {};
		if (todoId === NEW_TODO_ID) {
			createTodo({ title, completed: false })
				.then((todo) => {
					console.log("Todo добавлен, ответ сервера:", todo);
					let updatedTodos = setTodo(todos, {
						id: NEW_TODO_ID,
						isEditing: false,
						completed: false,
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
		setIsCreating(true);
		setTodos(setTodo(todos, { id, isEditing: true }));
	};

	const onTodoTitleChange = (id, newTitle) => {
		setTodos(setTodo(todos, { id, title: newTitle }));
		setIsCreating(false);
	};

	const onTodoCompletedChange = (id, newCompleted) => {
		updateTodo({ id, completed: newCompleted }).then((response) => {
			console.log("Todo обновлён, ответ сервера:", response);
			setTodos(setTodo(todos, { id, completed: newCompleted }));
		});
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
		<Routes>
			<Route
				path="/"
				element={
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
									<>
										{todos.map(
											({
												id,
												title,
												completed,
												isEditing = false,
											}) => (
												<Todo
													id={id}
													key={id}
													title={title}
													completed={completed}
													onTitleChange={(newTitle) =>
														onTodoTitleChange(
															id,
															newTitle
														)
													}
													onCompletedChange={(
														newCompleted
													) => {
														onTodoCompletedChange(
															id,
															newCompleted
														);
													}}
													onSave={() =>
														onTodoSave(id)
													}
													onRemove={() =>
														onTodoRemove(id)
													}
													onEdit={() =>
														onTodoEdit(id)
													}
													isEditing={isEditing}
												/>
											)
										)}
									</>
								)}
							</div>
						)}
					</div>
				}
			/>
			<Route
				path="/todo/:id"
				element={
					<>
						<div className={styles.container}>
							<button onClick={() => navigate(-1)}>Назад</button>
							<TodoDetailed
								todos={todos}
								onTitleChange={onTodoTitleChange}
								onCompletedChange={onTodoCompletedChange}
								onSave={onTodoSave}
								onRemove={onTodoRemove}
								onEdit={onTodoEdit}
							/>
						</div>
					</>
				}
			/>
			<Route
				path="/404"
				element={<NotFound>Страница не найдена</NotFound>}
			/>
			<Route path="*" element={<Navigate to="/404" />} />
		</Routes>
	);
}
