import styles from "./todo.module.css";
import { NavLink} from "react-router-dom"

export function Todo({ id, title, completed, onTitleChange,onCompletedChange,onSave, isEditing }) {

	return (
		<>
			<div className={styles.todo} >
			<input
				className={styles.checkbox}
				name="sort"
				type="checkbox"
				checked={completed}
				onChange={({target})=>{onCompletedChange(target.checked)}}
				/>

			<div className={styles['todo__title']} >
				{isEditing ? (
				<input className={styles.todo__input} value={title} type='text' onChange={({target})=>onTitleChange(target.value)}></input>
					) : (<NavLink className={styles.todo__link} to={`todo/${id}`}>
							<div className={styles.todo__title}>{title}</div>
				</NavLink>

				)}

			</div>
			 {isEditing ? (
				<button className={styles.todo__btn}
						onClick={() => onSave(id)}
						id={id}>
						&#10004;
				</button>

			) : ('')}
			</div>


		</>

	);
}
