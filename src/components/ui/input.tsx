import { cn } from "@/lib/utils";
import { Field, Input, Label } from "@headlessui/react";
import { Check } from "lucide-react";
import React, { ChangeEvent } from "react";
interface InputFieldProps {
  label?: string;
  name: string;
  value: string;
  type: string;
  maxLength?: number;
  placeholder?: string;
  readonly?: boolean;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  showCheck?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  type,
  maxLength,
  readonly,
  placeholder,
  onChange,
  className,
  showCheck = false,
}) => {

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      const newValue = e.target.value;
      if (newValue === "-" && value === "") {
        return;
      }
      if (newValue.includes("-") && newValue !== "-" && !/^-?\d*$/.test(newValue)) {
        return;
      }
      if (newValue.startsWith("-") && value !== "") {
        return;
      }
      if (/^-?\d*$/.test(newValue)) {
        onChange(e);
      }
    } else {
      onChange(e);
    }
  };

  return (
    <Field className="space-y-2">
      <Label className="block text-sm text-black font-[#292C2A]">{label}</Label>
      <div className="relative w-full">
        <Input
          name={name}
          type={type}
          className={cn(
            "w-full h-12 px-3 rounded-md text-[#292C2A] font-light bg-[#F6F7FB] text-sm focus:outline-none focus:ring-[#1E73BE] focus:border-[#1E73BE]",
            className
          )}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          maxLength={maxLength}
          readOnly={readonly}
        />
        {showCheck && (
          <Check
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
            size={20}
          />
        )}
      </div>
    </Field>
  );
};

export default InputField;