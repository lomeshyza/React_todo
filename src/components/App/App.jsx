import { useEffect, useState } from "react";
import { Route, Routes,	Navigate } from "react-router-dom";
import { MainPage, DetailedPage, NotFound } from "../../components";
import { readTodos, createTodo, updateTodo } from "../../api";
import { addTodo, setTodo, findTodo, removeTodo } from "../../utils";
import { NEW_TODO_ID } from "../../constants";

export default function App() {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchedPhrase, setSearchedPhrase] = useState("");
	const [isSorted, setIsSorted] = useState(false);
	const [isRefresh, setIsRefresh] = useState(false);

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
		} else {
			updateTodo({ id: todoId, title }).then((response) => {
				console.log("Todo обновлён, ответ сервера:", response);
				setTodos(setTodo(todos, { id: todoId, isEditing: false }));
			});
		}
	};

	//EDIT
	const onTodoEdit = (id) => {
		setTodos(setTodo(todos, { id, isEditing: true }));
	};

	const onTodoTitleChange = (id, newTitle) => {
		setTodos(setTodo(todos, { id, title: newTitle }));
	};

	const onTodoCompletedChange = (id, newCompleted) => {
		updateTodo({ id, completed: newCompleted }).then((response) => {
			console.log("Todo обновлён, ответ сервера:", response);
			setTodos(setTodo(todos, { id, completed: newCompleted }));
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
			<Route path="/"
				element={
				<MainPage onTodoTitleChange={onTodoTitleChange}
						onTodoCompletedChange={onTodoCompletedChange}
						onTodoSave={onTodoSave}
						onTodoEdit={onTodoEdit}
						todos={todos}
						setTodos={setTodos}
						setSearchedPhrase={setSearchedPhrase}
						setIsRefresh={setIsRefresh}
						isRefresh={isRefresh}
						setIsSorted={setIsSorted}
						isLoading={isLoading}/>
				}
			/>
			<Route
				path="/todo/:id"
				element={
					<DetailedPage onTodoTitleChange={onTodoTitleChange}
						onTodoCompletedChange={onTodoCompletedChange}
						onTodoSave={onTodoSave}
						onTodoEdit={onTodoEdit}
						todos={todos}
						setTodos={setTodos} />
				}
			/>
			<Route path="/404" element={<NotFound>Страница не найдена</NotFound>}/>
			<Route path="*" element={<Navigate to="/404" />} />
		</Routes>
	);
}
