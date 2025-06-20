import {  useNavigate } from "react-router-dom";

import styles from "./detailed-page.module.css";
import {  TodoDetailed } from "..";
import { deleteTodo } from "../../api";
import { removeTodo } from "../../utils";

export function DetailedPage({todos,setTodos,onTodoTitleChange,onTodoCompletedChange,onTodoSave,onTodoEdit}) {
		const navigate = useNavigate();

	//DELETE
	const onTodoRemove = (id) => {
		deleteTodo(id).then((response) => {
			console.log("todo удалён, ответ сервера: ", response);
			setTodos(removeTodo(todos, id));
		});
	};

	return (
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
	);
}
