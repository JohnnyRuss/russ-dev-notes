import { Routes as ReactRouter, Route } from "react-router-dom";
import { Router } from "@/config/Routes";

const Routes: React.FC = () => {
  return (
    <ReactRouter>
      {Router.map((route) => (
        <Route key={route.title} path={route.path} element={route.element}>
          {route.children.length > 0 ? (
            Router.map((childRoute) => (
              <Route
                key={childRoute.title}
                path={childRoute.path}
                element={childRoute.element}
              />
            ))
          ) : (
            <></>
          )}
        </Route>
      ))}
    </ReactRouter>
  );
};

export default Routes;
