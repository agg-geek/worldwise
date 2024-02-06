import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import PageNav from '../components/PageNav';
import styles from './css/Login.module.css';
import Button from '../components/Button';

export default function Login() {
	const navigate = useNavigate();

	const [email, setEmail] = useState('jack@example.com');
	const [password, setPassword] = useState('qwerty');

	const { login, isAuthenticated } = useAuth();

	function handleSubmit(evt) {
		evt.preventDefault();

		if (!email || !password) return;

		login(email, password);
	}

	useEffect(
		function () {
			if (isAuthenticated) navigate('/app', { replace: true });
		},
		[isAuthenticated, navigate]
	);

	return (
		<main className={styles.login}>
			<PageNav />

			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.row}>
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						id="email"
						onChange={e => setEmail(e.target.value)}
						value={email}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						onChange={e => setPassword(e.target.value)}
						value={password}
					/>
				</div>

				<div>
					<Button type="primary">Login</Button>
				</div>
			</form>
		</main>
	);
}
