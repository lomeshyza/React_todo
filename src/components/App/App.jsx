import { useEffect,useState } from "react";
import styles from "./app.module.css";
import Loader from "../Loader/Loader";

export default function App() {
	const [tasks, setTasks] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
	  setIsLoading(true)
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((loadedData) => loadedData.json())
      .then((loadedTasks) => {
        setTasks(loadedTasks);
	  })
		.finally(()=>setIsLoading(false));
  }, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.h1}>Список дел</h1>
			<input className={styles.input}/>
			<button
					className={styles.btn}
					type="submit">
					Сортировать
				</button>
			{isLoading ?
				<Loader/>
				:
				<div className={styles.tasks}>
					{tasks.map(({ id,title }) => (
					<div className={styles.task} key={id}>{title}</div>
					))}
				</div>
			}
		</div>
	)
}
