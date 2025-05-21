import { Field, Input, Label } from "@headlessui/react";
import React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface PasswordFieldProps {
  label: string;
  name: string;
  value: string;
  showPassword: boolean;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  togglePasswordVisibility: () => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  name,
  value,
  showPassword,
  onChange,
  placeholder,
  togglePasswordVisibility,
}) => {
  return (
    <Field>
      <div className="relative">
        <Label
          htmlFor={name}
          className="absolute text-sm font-semibold bottom-11 left-6 z-10 bg-white dark:bg-gray-900 px-2"
        >
          {label}
        </Label>

        <Input
          name={name}
          type={showPassword ? "text" : "password"}
          className="block w-full px-4 pt-6 pb-2 text-sm text-gray-900 bg-transparent rounded-sm border border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-[#1E73BE] focus:border-[#1E73BE]"
          value={value}
          placeholder={placeholder || ""}
          onChange={onChange}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <EyeOffIcon className="text-gray-400" />
          ) : (
            <EyeIcon className="text-gray-400" />
          )}
        </button>
      </div>
    </Field>
  );
};

export default PasswordField;
