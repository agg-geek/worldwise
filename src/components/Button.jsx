import styles from './css/Button.module.css';

// type is just a className string which is used to specify the type of Button
function Button({ children, onClick, type }) {
	return (
		<button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
			{children}
		</button>
	);
}
export default Button;
