import styles from "./controls.module.css";
import { Search, Sorting } from "./components";

export function Controls({
	onTodoAdd,
	isCreating,
	onSearch,
	onSorting,
	setSearchedPhrase,
}) {
	return (
		<div className={styles["btn-container"]}>
			<Search onSearch={onSearch} setSearchedPhrase={setSearchedPhrase} />
			<button
				className={styles["add-btn"]}
				disabled={isCreating}
				onClick={onTodoAdd}
			>
				Добавить
			</button>
			<Sorting onSorting={onSorting} />
		</div>
	);
}
