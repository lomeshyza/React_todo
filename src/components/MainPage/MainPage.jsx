import styles from "./main-page.module.css";
import { Loader, Todo } from "../../components";
import { Controls } from "../Controls/Controls";

export  function MainPage({
	todos,
	setTodos,
	onTodoTitleChange,
	onTodoCompletedChange,
	onTodoSave,
	onTodoEdit,
	setSearchedPhrase,
	setIsRefresh,
	isRefresh,
	setIsSorted,
	isLoading
}) {

	return (
		<div className={styles.container}>
			<h1 className={styles.h1}>Список дел</h1>
			<Controls
				setSearchedPhrase={setSearchedPhrase}
				onSearch={() => setIsRefresh(!isRefresh)}
				onSorting={setIsSorted}
				todos={todos}
				setTodos={setTodos}
			/>
			{isLoading ? (
				<Loader />
			) : (
				<div className={styles.todos}>
					{todos.length === 0 ? (
						<p>Ничего не найдено</p>
					) : (                                                                                                                              	<>
							{todos.map(({id,title,completed,isEditing = false,}) => (
									<Todo
										id={id}
										key={id}
										title={title}
										completed={completed}
										onTitleChange={(newTitle) =>onTodoTitleChange(id, newTitle)}
										onCompletedChange={(newCompleted) => {
										onTodoCompletedChange(id, newCompleted);
										}}
										onSave={() => onTodoSave(id)}
										onEdit={() => onTodoEdit(id)}
										isEditing={isEditing}
									/>
								)
							)}
						</>
					)}
				</div>
			)}
		</div>
	);
}
