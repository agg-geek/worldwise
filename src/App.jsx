import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import Home from './pages/Home';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import PageNotFound from './pages/PageNotFound';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/product" element={<Product />} />
				<Route path="/pricing" element={<Pricing />} />
				<Route path="/login" element={<Login />} />
				<Route path="/app" element={<AppLayout />}>
					<Route index element={<p>Cities</p>} />
					<Route path="cities" element={<p>Cities</p>} />
					<Route path="countries" element={<p>Countries</p>} />
					<Route path="form" element={<p>Form</p>} />
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
export default App;
