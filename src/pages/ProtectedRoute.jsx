import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// if the user directly visits /app/cities, then our application breaks
// as the login process was not completed
// hence, to protect the routes, we can check in each page/component
// if the user isAuthenticated, otherwise we can navigate, but this is too much
function ProtectedRoute({ children }) {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(
		function () {
			if (!isAuthenticated) navigate('/');
		},
		[isAuthenticated, navigate]
	);

	// doing this does not work, as after the component is first rendered
	// the useEffect hook will run after that and navigate to '/' if not authenticated
	// return children;

	// hence, for the first component rendering before useEffect runs, do this!
	// we return null, so nothing will be rendered
	// but once the useEffect runs after this first render, we successfully navigate to '/'
	return isAuthenticated ? children : null;
}

export default ProtectedRoute;
