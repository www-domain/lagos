import { cn } from "@/lib/utils";
import { Check, Loader } from "lucide-react";
import { ReactNode, forwardRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  label?: ReactNode;
  errorMessage?: string | false;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement> & unknown;
  className?: string;
  leadingSearchIconColor?: string;
  variant?: "text" | "password" | "search" | "file" | "date";
  options?: { label: string; value: string | number }[];
  isLoadingOptions?: boolean;
  onSelect?: (value: string | number | any) => void;
  withApiButton?: boolean;
  apiButtonLabel?: string;
  apiButtonLoading?: boolean;
  onApiButtonClick?: (e?: any) => void;
  isApiSuccess?: boolean;
  disabled?: boolean;
  onSearch?: (query: string) => Promise<void>;
} & React.ComponentProps<'input'>;


const ValidateInput = forwardRef<HTMLInputElement, Props>(({
  label,
  errorMessage,
  className,
  leadingSearchIconColor,
  variant = "text",
  value,
  options = [],
  isLoadingOptions = false,
  onSelect,
  withApiButton = false,
  apiButtonLabel = "Verify",
  onApiButtonClick,
  apiButtonLoading = false,
  isApiSuccess = false,
  onSearch,
  disabled = false,
  ...rest
}, ref) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (rest.onChange) {
      rest.onChange(e);
    }
  };

  const handleApiButtonClick = async (e: any) => {
    if (!onApiButtonClick) return;

    setIsLoading(true);
    try {
      await onApiButtonClick(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="leading-3">
      {label && (
        <label className="flex items-center text-gray-900 font-medium text-sm gap-x-2 mb-1">
          {label}
        </label>
      )}
      <div className="relative flex">
        <input
          ref={ref}
          {...rest}
          disabled={disabled}
          className={cn(
            "outline-none focus:ring-0 ring-primary-700 border rounded py-3 px-2 text-gray-800 text-sm text-wrap w-full disabled:cursor-not-allowed placeholder:text-gray-400 placeholder:normal-case",
            withApiButton && "rounded-r-none border-r-0",
            errorMessage ? "bg-red-100" : "bg-white",
            disabled ? "bg-stone-100" : "",
            className
          )}
          value={inputValue}
          onChange={handleChange}
        />
        {withApiButton && (
          <Button
            onClick={handleApiButtonClick}
            disabled={isLoading || isApiSuccess || String(inputValue).trim() === ""}
            className={cn(
              "rounded-l-none min-w-[100px] py-6 text-xs",
              isApiSuccess ? "bg-primary-500 hover:bg-primary-600" : "bg-primary-600 text-white hover:bg-primary-500"
            )}
          >
            {isApiSuccess ? (
              <Check className="h-7 w-7" />
            ) : isLoading || apiButtonLoading ? (
              <Loader className="animate-spin" size={30} />
            ) : (
              apiButtonLabel
            )}
          </Button>
        )}
      </div>
      {errorMessage && <small className="text-red-600 text-sm">{errorMessage}</small>}
    </div>
  )
});

export default ValidateInput