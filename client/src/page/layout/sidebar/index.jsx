import React from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { routeConfigs } from "./../../../config/route";

import "./style/index";

function normalizeRoute(conf) {
  const res = [];
  function normalize(route, path, _res) {
    const _route = {
      path: `${path}${route.path === "/" ? "" : "/"}${route.path}`,
      name: route.name,
      title: route.name
    };

    if (route.children && Array.isArray(route.children)) {
      _route.children = [];

      for (const child of route.children) {
        normalize(child, _route.path, _route.children);
      }
    }

    _res.push(_route);
  }

  for (const c of conf) {
    normalize(c, "", res);
  }

  return res;
}

function Sidebar(props) {
  const [routes, setRoutes] = React.useState(normalizeRoute(routeConfigs));

  function onRouteClick(r) {
    // props.history.push(r.path);
  }

  return (
    <section id="layout-sidebar">
      <div className="logo"> KOMOREBI </div>
      <ul className="nav">
        {routes.map(r => (
          <li
            className="nav-item"
            key={r.name}
            onClick={onRouteClick.bind(this, r)}
          >
            <NavLink activeClassName="active-nav" exact to={r.path}>
              {r.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default withRouter(Sidebar);
