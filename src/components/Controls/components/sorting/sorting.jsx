import { useState } from "react";
import styles from "./sorting.module.css";

export const Sorting = ({ onSorting }) => {

	const [isEnabled, setIsEnabled] = useState(false);

	const onChange = ({target}) => {
		setIsEnabled(target.checked)
		onSorting(target.checked)
	};

	return (
		<input
			className={styles.checkbox}
			name="sort"
			type="checkbox"
			checked={isEnabled}
			onChange={onChange}
		/>
	)
}
