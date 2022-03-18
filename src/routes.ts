import withPageTitle from "components/seo/PageTitle";
import Staked from "pages/Staked";

export const routeNames = {
  transaction: "/transaction",
  unlock: "/unlock",
  ledger: "/ledger",
  walletconnect: "/walletconnect",
  staked: "/staked",
};

const routes: Array<any> = [
  {
    path: routeNames.staked,
    component: Staked,
    exact: true,
    authenticatedRoute: true,
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
