import { NavLink } from 'react-router-dom';

function PageNav() {
	return (
		<nav>
			<ul>
				<li>
					{/* 
                        we use NavLink instead of Link as NavLink behind the scenes
                        adds a class='active' to this element inside the DOM (check the DOM!)
                        this className can be used to styling the NavLink differently,
                        like we can style the link to current page we are on differently
                        and other links differently
                    */}
					<NavLink to="/">Home</NavLink>
				</li>
				<li>
					<NavLink to="/product">Product</NavLink>
				</li>
				<li>
					<NavLink to="/pricing">Pricing</NavLink>
				</li>
			</ul>
		</nav>
	);
}
export default PageNav;
