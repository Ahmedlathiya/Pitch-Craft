import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"; // Switch for v5
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreatePitch from "./pages/CreatePitch";
import GeneratedPitch from "./pages/GeneratedPitch";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Switch> {/* Use Switch in v5 instead of Routes */}
        <Route path="/login" component={Login} /> {/* Use 'component' prop in v5 */}
        <Route
          exact
          path="/"
          render={() => (
              <Dashboard />
          )}
        />
        <Route
          path="/create"
          render={() => (
              <CreatePitch />
          )}
        />
        <Route
          path="/generated"
          render={() => (
              <GeneratedPitch />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}
