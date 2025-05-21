import { cn } from "@/lib/utils";
import { Field, Input, Label } from "@headlessui/react";
import React, { ChangeEvent, useState } from "react";

interface NumberSelectorInputProps {
  label?: string;
  name: string;
  value: string;
  numbers: number[]; // Array of numbers to display in the dropdown
  placeholder?: string;
  readonly?: boolean;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const NumberSelectorInput: React.FC<NumberSelectorInputProps> = ({
  label,
  name,
  value,
  numbers,
  readonly,
  placeholder,
  onChange,
  className,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handle number selection from the dropdown
  const handleNumberSelect = (number: number) => {
    const syntheticEvent = {
      target: { value: number.toString(), name },
    } as ChangeEvent<HTMLInputElement>;
    onChange(syntheticEvent);
    setIsDropdownOpen(false);
  };

  return (
    <Field className="space-y-2 relative">
      <Label className="block text-sm text-black font-[#292C2A]">
        {label}
      </Label>
      <Input
        name={name}
        type="text"
        className={cn(
          "w-full h-12 px-3 rounded-md text-[#292C2A] font-light bg-[#F6F7FB] text-sm focus:outline-none focus:ring-[#1E73BE] focus:border-[#1E73BE] cursor-pointer",
          className
        )}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readonly}
        onClick={() => !readonly && setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown on click
      />

      {/* Dropdown for number selection */}
      {isDropdownOpen && !readonly && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg shadow-primary-100 p-4">
          <h2 className="font-bold">
            Suggested number of Instructors
          </h2>
          <p className="text-xs text-gray-600 my-4">
            You can select any number that matches the number of instructor
            available in your driving school
          </p>
          <div className="grid grid-cols-6 gap-4">
            {numbers.map((number) => (
              <button
                key={number}
                onClick={() => handleNumberSelect(number)}
                className="w-12 h-8 text-sm bg-primary-50  rounded-full border border-primary-100 text-primary-700 hover:bg-primary-500 hover:text-white focus:outline-none transition-colors"
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      )}
    </Field>
  );
};

export default NumberSelectorInput;