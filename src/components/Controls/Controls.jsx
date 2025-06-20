import styles from "./controls.module.css";
import { Search, Sorting } from "./components";
import { addTodo} from "../../utils";

export function Controls({
	onSearch,
	onSorting,
	setSearchedPhrase,
	setTodos,
	todos
})
{
		//ADD
		const onTodoAdd = () => {
			setTodos(addTodo(todos));
		};

	return (
		<div className={styles["btn-container"]}>
			<Search onSearch={onSearch} setSearchedPhrase={setSearchedPhrase} />
			<button
				className={styles["add-btn"]}
				disabled={'isEditing' in (todos[0] || {})}
				onClick={onTodoAdd}
			>
				Добавить
			</button>
			<Sorting onSorting={onSorting} />
		</div>
	);
}
