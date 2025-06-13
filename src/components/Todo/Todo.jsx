import styles from "./todo.module.css";

export function Todo({ id, title, onTitleChange, onSave, onRemove,	onEdit, isEditing }) {

	return (
		<div className={styles.todo} >

			<div className={styles.todoTitle} >
				{isEditing ? (
				<input className={styles['todoTitle__input']} value={title} type='text' onChange={({target})=>onTitleChange(target.value)}></input>
				):(<div onClick={onEdit}>{title}</div>)}

			</div>


				{isEditing ? (
					<button className={styles.todo__btn}
						onClick={() => onSave(id)}
						id={id}>
						&#10004;
					</button>

				) : (
					<button className={styles.todo__btn}
						onClick={onRemove}
						id={id}>
						&#128465;
					</button>
					)}

		</div>
	);
}
