import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux-store/slices/auth.slice";
import { ROUTES } from "./constants/routes.constant";

const useAuthHelpers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveToken = (token: string) => {
    localStorage.setItem("accessToken", token);
  };

  const getToken = () => {
    return localStorage.getItem("accessToken");
  };

  const removeToken = () => {
    localStorage.removeItem("accessToken");
  };

  const handleLogout = () => {
    dispatch(logout());
    removeToken();
    location.replace(ROUTES.LOGIN);
  };

  return {
    saveToken,
    getToken,
    removeToken,
    handleLogout,
  };
};

export default useAuthHelpers;