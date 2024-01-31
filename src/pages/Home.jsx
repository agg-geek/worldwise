import PageNav from '../components/PageNav';

function Home() {
	return (
		<div>
			<h1>Home</h1>
			{/* these anchor links work, but they end up reloading the page */}
			{/* thus, the app does not remain a SPA with these anchors for routing */}
			{/* <a href="/product">Product</a> */}
			{/* <a href="/pricing">Pricing</a> */}

			{/* use Link from react-router-dom for routing a SPA */}
			{/* note that this Link will be converted to <a> in the DOM (check the DOM!) */}
			{/* <Link to="/product">Product</Link> */}

			{/* PageNav uses NavLink instead of Link */}
			<PageNav />
		</div>
	);
}
export default Home;
