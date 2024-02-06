import styles from './css/AppLayout.module.css';
import Sidebar from '../components/Sidebar';
import Map from '../components/Map';
import User from '../components/User';

function AppLayout() {
	return (
		<div className={styles.app}>
			<Sidebar />
			<Map />
			<User />
		</div>
	);
}

export default AppLayout;
