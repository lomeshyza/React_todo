import { useState } from "react";
import styles from "./search.module.css";

export const Search = ({ onSearch, setSearchedPhrase }) => {
	const [value, setValue] = useState("");
	const onSubmit = (evt) => {
		evt.preventDefault();
	};

	const onChange = (evt) => {
		setValue(evt.target.value);
		setSearchedPhrase(evt.target.value);
	};
	return (
		<form onSubmit={onSubmit} className={styles.search}>
			<input className={styles.input} value={value} onChange={onChange} />
			<button
				type="submit"
				className={styles["input__btn"]}
				onClick={onSearch}
			>
				&#128269;
			</button>
		</form>
	);
};
