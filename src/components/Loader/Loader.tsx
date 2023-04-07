import styles from "./Loader.module.css";

function Loader() {
	return (
		<div id={styles.container}>
			<div className={styles.ball + " " + styles.ball1}></div>
			<div className={styles.ball + " " + styles.ball2}></div>
			<div className={styles.ball + " " + styles.ball3}></div>
			<div className={styles.ball + " " + styles.ball4}></div>
		</div>
	);
}

export default Loader;
