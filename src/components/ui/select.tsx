import React from "react";
import { Field, Label, Select } from "@headlessui/react";

interface Option {
  value: string| number;
  label: string ;
}

interface DropdownSelectProps {
  name: string;
  label?: string;
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  name,
  label,
  value,
  placeholder,
  onChange,
  options,
}) => {
  return (
    <Field className="space-y-2">
      <Label className="block text-sm text-black font-[#292C2A]">{label}</Label>
      <Select
        name={name}
        className="w-full h-12 px-3 text-[#292C2A] font-light bg-[#F6F7FB] border-none rounded-md text-sm focus:outline-none focus:ring-[#1E73BE] focus:border-[#1E73BE] cursor-pointer"
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Field>
  );
};

export default DropdownSelect;
