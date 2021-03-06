import withPageTitle from "components/seo/PageTitle";
import Home from "pages/Home";
import Referrals from "pages/Referrals";
import Staked from "pages/Staked";

export const routeNames = {
	transaction: "/transaction",
	unlock: "/unlock",
	ledger: "/ledger",
	walletconnect: "/walletconnect",
	referrals: "/referrals",
	staking: "/",
	staked: "/staked",
};

const routes: Array<any> = [
	{
		path: routeNames.staked,
		component: Staked,
		exact: true,
		authenticatedRoute: true,
	},
	{
		path: routeNames.referrals,
		component: Referrals,
		exact: true,
		authenticatedRoute: true,
	},
	{
		path: routeNames.staking,
		component: Home,
		exact: true,
	},
];

const mappedRoutes = routes.map((route) => {
	const title = route.title ? `${route.title} • Landboard` : "Landboard";

	const requiresAuth = Boolean(route.authenticatedRoute);
	const wrappedComponent = withPageTitle(title, route.component);

	return {
		path: route.path,
		component: wrappedComponent,
		authenticatedRoute: requiresAuth,
	};
});

export default mappedRoutes;
