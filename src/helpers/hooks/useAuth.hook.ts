import { initializeUser } from "@/redux-store/slices/auth.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = !!localStorage.getItem("accessToken");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      dispatch(initializeUser(userData));
    }
  }, [dispatch]);

  return { isAuthenticated };
};