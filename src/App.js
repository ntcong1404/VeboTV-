import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import { DefaultLayout } from "./layouts/index";
import { Fragment } from "react";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <div className="App">
        <AuthContextProvider>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = DefaultLayout;

              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </AuthContextProvider>
      </div>
    </Router>
  );
}

export default App;
