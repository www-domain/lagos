import React from "react";
import { Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface DropdownSelectProps {
  name: string;
  label?: string;
  value: string | string[];
  placeholder?: string;
  onChange: (value: string | string[]) => void;
  options: Option[];
  textColor?: string;
  isMultiSelect?: boolean;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  name,
  label,
  value,
  placeholder,
  onChange,
  options,
  textColor = "#1E73BE",
  isMultiSelect = false,
}) => {
  // Handle selected options display
  const selectedOptions = isMultiSelect
    ? options?.filter((option) => (value as string[])?.includes(option?.value))
    : options?.find((option) => option.value === value) || null;

  // Handle chip removal for multi-select
  const handleRemoveOption = (optionValue: string) => {
    if (isMultiSelect) {
      const newValues = (value as string[]).filter((val) => val !== optionValue);
      onChange(newValues);
    }
  };

  return (
    <Field className="space-y-2">
      {label && (
        <Label className="block text-sm" style={{ color: textColor }}>
          {label}
        </Label>
      )}
      <Listbox
        value={value}
        onChange={onChange}
        name={name}
        multiple={isMultiSelect} // Enable multi-select mode
      >
        <div className="relative">
          <ListboxButton className="bg-white w-full h-12 px-3 border rounded-lg text-sm focus:outline-none focus:ring-[#1E73BE] focus:border-[#1E73BE] cursor-pointer flex items-center justify-between">
            <span className="truncate">
              {isMultiSelect
                ? (value as string[])?.length > 0
                  ? `${(value as string[])?.length} option(s) selected`
                  : placeholder || "Select options"
                : selectedOptions
                  ? (selectedOptions as Option).label
                  : placeholder || "Select an option"}
            </span>
            <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </ListboxButton>
          <ListboxOptions className="absolute z-10 mt-1 w-full bg-white border rounded-xl shadow-lg max-h-60 overflow-auto focus:outline-none">
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                value={option.value}
                className={({ active }) =>
                  cn(
                    "relative cursor-pointer select-none py-2 px-3 text-sm",
                    active ? "bg-[#1E73BE] text-white" : "bg-white"
                  )
                }
              >
                {({ selected }) => (
                  <div className="flex items-center">
                    {isMultiSelect && (
                      <span className="mr-2">
                        {selected ? (
                          <CheckIcon className="h-5 w-5 text-white bg-primary-600 rounded-sm border border-primary-300" aria-hidden="true" />
                        ) : (
                          <span className="h-5 w-5 border border-gray-300 rounded-sm inline-block" />
                        )}
                      </span>
                    )}
                    <span
                      className={cn(
                        selected ? "font-medium" : "font-normal",
                        "block truncate"
                      )}
                    >
                      {option.label}
                    </span>
                  </div>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
      {isMultiSelect && (value as string[])?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedOptions instanceof Array &&
            selectedOptions?.map((option) => (
              <div
                key={option.value}
                className="flex items-center bg-[#FFF5D0] text-black text-sm px-2 py-1 rounded-sm"
              >
                <span>{option.label}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveOption(option.value)}
                  className="ml-1 focus:outline-none"
                >
                  <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ))}
        </div>
      )}
    </Field>
  );
};

export default DropdownSelect;