import styles from "./loader.module.css";

export default function Loader() {
	return (
		<div className={styles.preloader}>
        	<div className={styles["preloader__container"]}>
				<span className={styles["preloader__round"]}></span>
			</div>
		</div>
	)
}
