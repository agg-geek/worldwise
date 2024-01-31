import styles from './css/AppLayout.module.css';
import Sidebar from '../components/Sidebar';
import Map from '../components/Map';

function AppLayout() {
	return (
		<div className={styles.app}>
			<Sidebar />
			<Map />
		</div>
	);
}

export default AppLayout;
