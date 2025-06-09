import { Routes, Route, Navigate } from "react-router";
import {Register} from "../pages/auth/register";
import Login from "../pages/auth/login";
import Home from "../pages/home";
import { useAuthContext } from "../hooks/useAuthContext";

export default function AppRoutes() {
  const { isAuthenticated } = useAuthContext() ?? false;

  return (
    <Routes>
      {/* route "/" */}
      <Route path="/" element={<Home />} />

      {/* route "/register" */}
      <Route
        path="/register"
        element={
          isAuthenticated ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <Register />
          )
        }
      />

      {/* route "/login" */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <Login />
          )
        }
      />
    </Routes>
  );
}
