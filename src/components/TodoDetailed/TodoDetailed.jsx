import { NotFound } from "../NotFound/NotFound";
import styles from "./todo-detailed.module.css";
import { useParams } from "react-router-dom";

export function TodoDetailed({
	todos,
	onTitleChange,
	onCompletedChange,
	onSave,
	onRemove,
	onEdit,
}) {
	const params = useParams();

	const getTodo = (id) => {
		const todoId = todos.find((i) => {
			return i.id == id;
		});
		return todoId;
	};
	const todo = getTodo(params.id);

	if (!todo) {
		return <NotFound>Дело не найдено</NotFound>;
	}
	const { id, title, completed, isEditing = false } = todo;

	return (
		<>
			<div className={styles.todo}>
				<input
					className={styles.checkbox}
					name="sort"
					type="checkbox"
					checked={completed}
					onChange={({ target }) => {
						onCompletedChange(id, target.checked);
					}}
				/>
				<div className={styles["todo__title"]}>
					{isEditing ? (
						<input
							className={styles.todo__input}
							value={title}
							type="text"
							onChange={({ target }) =>
								onTitleChange(id, target.value)
							}
						></input>
					) : (
						<div>{title}</div>
					)}
				</div>
				{isEditing ? (
					<button
						className={styles.todo__btn}
						onClick={() => onSave(id)}
						id={id}
					>
						&#10004;
					</button>
				) : (
					<>
						<button
							className={styles.todo__btn}
							onClick={() => onRemove(id)}
							id={id}
						>
							🗑
						</button>
						<button
							className={styles.todo__btn}
							onClick={() => onEdit(id)}
							id={id}
							disabled={isEditing}
						>
							🛠
						</button>
					</>
				)}
			</div>
		</>
	);
}
