import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

import Home from './pages/Home';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import CityList from './components/CityList';
import City from './components/City';
import CountryList from './components/CountryList';
import Form from './components/Form';
import PageNotFound from './pages/PageNotFound';

import { CityProvider } from './contexts/CityContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
	return (
		<AuthProvider>
			<CityProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/product" element={<Product />} />
						<Route path="/pricing" element={<Pricing />} />
						<Route path="/login" element={<Login />} />
						<Route
							path="/app"
							element={
								<ProtectedRoute>
									<AppLayout />
								</ProtectedRoute>
							}
						>
							<Route index element={<Navigate to="cities" replace />} />
							<Route path="cities" element={<CityList />} />
							<Route path="cities/:cityId" element={<City />} />
							<Route path="countries" element={<CountryList />} />
							<Route path="form" element={<Form />} />
						</Route>
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
			</CityProvider>
		</AuthProvider>
	);
}
export default App;
