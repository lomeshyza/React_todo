import { useEffect, useState } from "react";
import styles from "./app.module.css";
import Loader from "../Loader/Loader";

export default function App() {
	const [tasks, setTasks] = useState([]);
	//const [filteredTasks, setFilteredTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [refreshTasks, setRefreshTasks] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [clickedElement, setClickedElement] = useState(null);
	const [value, setValue] = useState("");
	const [checked, setChecked] = useState(false);

	const onAddChange = (evt) => {
		setValue(evt.target.value);
	};

	//SORT
	function changeCheckbox() {
		const sorted = tasks.sort((a, b) => {
			if (!checked) {
				if (a.title.toLowerCase() < b.title.toLowerCase()) {
					return -1;
				}
				if (a.title.toLowerCase() > b.title.toLowerCase()) {
					return 1;
				}
				return 0;
			} else {
				setRefreshTasks(!refreshTasks);
			}
		});

		setTasks(sorted);

		setChecked(!checked);
	}

	//SEARCH
	const onSearch = () => {
		if (value !== "") {
			const newTasks = tasks.filter((item) => {
				return item.title.includes(value);
			});
			setTasks(newTasks);
		} else {
			setRefreshTasks(!refreshTasks);
		}
	};
	//ADD
	const requestAddTask = () => {
		if (value.length !== 0) {
			setIsCreating(true);

			fetch("http://localhost:3000/tasks", {
				method: "POST",
				headers: { "Content-Type": "application/json;charset=utf-8" },
				body: JSON.stringify({
					title: value,
				}),
			})
				.then((response) => response.json())
				.then((newTask) => {
					console.log("Task добавлен, ответ сервера:", newTask);
					setRefreshTasks(!refreshTasks);
				})
				.finally(() => {
					setIsCreating(false);
					setValue("");
				});
		}
	};
	//DELETE
	const onDelete = (evt) => {
		requestDeleteTask(evt.target.id);
	};

	const requestDeleteTask = (id) => {
		fetch(`http://localhost:3000/tasks/${id}`, {
			method: "DELETE",
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log("Task удалён, ответ сервера: ", response);
				setRefreshTasks(!refreshTasks);
				setChecked(false);
			});
	};
	//UPDATE
	const onUpdate = (evt) => {
		setIsUpdating(true);
		const foundValue = tasks.find((item) => {
			setClickedElement(item);
			return item.id == evt.target.id;
		});
		setValue(foundValue.title);
	};

	const onConfirmUpdate = (id) => {
		if (value.length === 0) {
			setIsUpdating(true);
		} else {
			setIsUpdating(false);
			requestUpdateTask(id);
		}
	};
	const requestUpdateTask = (id) => {
		if (value.length !== 0) {
			fetch(`http://localhost:3000/tasks/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json;charset=utf-8" },
				body: JSON.stringify({
					title: value,
				}),
			})
				.then((rawResponse) => rawResponse.json())
				.then((response) => {
					console.log("Task обновлён, ответ сервера:", response);
					setRefreshTasks(!refreshTasks);
					setChecked(false);
				})
				.finally(() => setValue(""));
		}
	};

	useEffect(() => {
		setIsLoading(true);
		fetch("http://localhost:3000/tasks")
			.then((loadedData) => loadedData.json())
			.then((loadedTasks) => {
				setTasks(loadedTasks);
			})
			.finally(() => setIsLoading(false));
	}, [refreshTasks]);

	return (
		<div className={styles.container}>
			<h1 className={styles.h1}>Список дел</h1>
			<input
				className={styles.input}
				value={value}
				onChange={onAddChange}
			></input>
			<button className={styles["input__btn"]} onClick={onSearch}>
				&#128269;
			</button>
			<div className={styles["btn-container"]}>
				<button
					className={styles.btn}
					disabled={isCreating}
					onClick={requestAddTask}
				>
					Добавить
				</button>
				<label htmlFor="sort">Сортировать</label>
				<input
					name="sort"
					type="checkbox"
					checked={checked}
					onChange={changeCheckbox}
				/>
			</div>
			{isLoading ? (
				<Loader />
			) : (
				<div className={styles.tasks}>
					{tasks.length === 0 ? (
						<p>Ничего не найдено</p>
					) : (
						tasks.map(({ id, title }) => (
							<div className={styles.task} key={id}>
								{title}
								<div>
									<button
										className={styles.task__btn}
										onClick={onDelete}
										id={id}
									>
										&#128465;
									</button>
									<button
										className={styles.task__btn}
										onClick={onUpdate}
										id={id}
										disabled={isUpdating}
									>
										&#128736;
									</button>
									{isUpdating && clickedElement.id === id && (
										<button
											disabled={!isUpdating}
											className={styles.task__btn}
											onClick={() => onConfirmUpdate(id)}
											id={id}
										>
											&#10004;
										</button>
									)}
								</div>
							</div>
						))
					)}
				</div>
			)}
		</div>
	);
}
