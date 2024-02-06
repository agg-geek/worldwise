import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
	user: null,
	isAuthenticated: false,
};

function reducer(state, action) {
	switch (action.type) {
		case 'login':
			return { ...state, user: action.payload, isAuthenticated: true };
		case 'logout':
			return { ...state, user: null, isAuthenticated: false };
		default:
			throw new Error('Unknown action');
	}
}

// we don't do real authentication
// we implement fake login by considering the only possible user as USER below
const USER = {
	name: 'Jack',
	email: 'jack@example.com',
	password: 'qwerty',
	avatar: 'https://i.pravatar.cc/100?u=zz',
};

function AuthProvider({ children }) {
	const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

	// login, logout fns will be API requests, here they're just fake
	function login(email, password) {
		if (email === USER.email && password === USER.password)
			dispatch({ type: 'login', payload: USER });
	}

	function logout() {
		dispatch({ type: 'logout' });
	}

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	const context = useContext(AuthContext);
	if (!context) throw new Error('AuthContext was used outside AuthProvider');
	return context;
}

export { AuthProvider, useAuth };
