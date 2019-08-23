import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { routeConfigs } from "./../config/route";
import loadComponent from "@component/loadComponent/index.jsx";

/**
 *
 * @param {*} conf route configs
 * @param {*} path parent path
 * @param {*} routes result
 *
 *
 * Interface Route {
 *   path;
 *   component;
 *   exact;
 *   strict;
 *   auth?;
 * }
 */
function formatRoute(conf, path = "", routes = []) {
  if (Array.isArray(conf)) {
    for (const c of conf) {
      formatRoute(c, path, routes);
    }

    return;
  }

  const res = {
    path: `${path}${conf.path === "/" ? "" : "/"}${conf.path}`,
    component: loadComponent({ component: conf.component }),
    exact: true
  };

  routes.push(res);

  if (conf.children && Array.isArray(child.children)) {
    for (const child of conf.children) {
      formatRoute(child, res.path, routes);
    }
  }
}

function Routes(props) {
  const [routes, setRoutes] = React.useState([]);

  formatRoute(routeConfigs, "", routes);

  return (
    <Switch>
      ;
      {routes.map(r => (
        <Route
          key={r.path}
          path={r.path}
          exact={r.exact}
          component={r.component}
        />
      ))}
      <Redirect to="/404" />
    </Switch>
  );
}

export default Routes;
