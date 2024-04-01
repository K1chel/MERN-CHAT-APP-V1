import { useContext } from "react";
import { Route, Routes } from "react-router";

import { PrivateLayout } from "@/components/layout/PrivateLayout";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Loader } from "@/components/loader";
import { AuthContext } from "@/context/AuthContext";

import { privateRoutes, publicRoutes } from "@/constants/routes";
const App = () => {
  const { token, isLoading } = useContext(AuthContext);

  return (
    <>
      {isLoading && <Loader />}
      <Routes>
        <Route element={<PublicLayout token={token} />}>
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Route>
        <Route element={<PrivateLayout token={token} />}>
          {privateRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default App;
