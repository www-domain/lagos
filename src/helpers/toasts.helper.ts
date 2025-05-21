import { toast } from "sonner";

type AlertType = "info" | "success" | "warning" | "error";

const Alert = (message: string, type: AlertType, duration = 5000) => {
  const types: any = {
    success: () => toast.success(message),
    warning: () => toast.warning(message),
    info: () => toast.info(message),
    error: () => toast.error(message),
  };

  return types[type]();
};

export default Alert;
