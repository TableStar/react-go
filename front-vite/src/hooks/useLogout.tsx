import { useNavigate } from "react-router";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  return () => {
    logout();
    navigate("/login");
  };
};
