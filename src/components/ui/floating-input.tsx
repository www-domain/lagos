import { Field, Input, Label } from "@headlessui/react";
import React, { ChangeEvent } from "react";

interface FloatingInputFieldProps {
  label?: string;
  name: string;
  value: string;
  type: string;
  maxLength?: number;
  placeholder?: string;
  readonly?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FloatingInputField: React.FC<FloatingInputFieldProps> = ({
  label,
  name,
  value,
  type,
  maxLength,
  readonly,
  placeholder,
  onChange,
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
          type={type}
          id={name}
          className="block w-full px-4 pt-6 pb-2 text-sm text-gray-900 bg-transparent rounded-sm border border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-[#1E73BE] focus:border-[#1E73BE]"
          value={value}
          onChange={onChange}
          placeholder={placeholder || ""}
          maxLength={maxLength}
          readOnly={readonly}
        />
      </div>
    </Field>
  );
};

export default FloatingInputField;
