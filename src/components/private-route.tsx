import { Navigate } from "react-router-dom";
import { ComponentType } from "react";
import { ROUTES } from "@/helpers/constants/routes.constant";

interface PrivateRouteProps {
  component: ComponentType<any>;
  isAuthenticated: boolean;
}

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}: PrivateRouteProps) => {
  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to={ROUTES.LOGIN} replace />
  );
};

export default PrivateRoute;
