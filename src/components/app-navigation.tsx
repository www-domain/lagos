import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { APP_NAVIGATION } from "@/helpers/constants.helper";

type BaseProps = {
  variant: "back" | "forward" | "reload";
};

type ToProps = BaseProps & {
  to?: any;
  action?: never;
};

type ActionProps = BaseProps & {
  action?: () => void;
  to?: never;
};

type Props = ToProps | ActionProps;

const AppNavigation = ({ to, variant, action }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      {variant === APP_NAVIGATION.back || variant === APP_NAVIGATION.forward ? (
        <Button
          className="text-xs"
          variant="secondary"
          size="sm"
          onClick={() => {
            action ? action?.() : navigate(to ? to : "..");
          }}
        >
          {variant === APP_NAVIGATION.back && <ArrowLeft />}
          {variant === APP_NAVIGATION.forward && <ArrowRight />}
        </Button>
      ) : (
        <Button
          className="text-xs"
          variant="secondary"
          size="sm"
          onClick={() => (action ? action?.() : navigate(0))}
        >
          <RotateCcw />
        </Button>
      )}
    </>
  );
};

export default AppNavigation;
