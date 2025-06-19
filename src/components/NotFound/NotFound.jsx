import styles from "./notfound.module.css";

export function NotFound({children}) {
	return (
		<div className={styles.container}>
			<p className={styles.icon}>	&#128125;</p>
			<p className={styles.notfound}>{children}</p>
		</div>
	);
}
