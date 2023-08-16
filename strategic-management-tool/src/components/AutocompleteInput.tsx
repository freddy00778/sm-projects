// AutocompleteInput.tsx
import React, { useState } from 'react';

interface AutocompleteInputProps {
    options: { name: string; value: any }[];
    value: string;
    onChange: (value: string) => void;
    onSelect: (option: { name: string; value: number }) => void;
    placeholder?: string;
    label?: string;
    id?: string;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({ options, value, onChange, onSelect, placeholder, label, id }) => {
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        onChange(inputValue);
        const newFilteredOptions = options.filter(option =>
            option.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredOptions(newFilteredOptions);
        setIsDropdownVisible(true);
    };

    const handleOptionSelect = (option: { name: string; value: any }) => {
        onSelect(option);
        setIsDropdownVisible(false);
    }

    return (
        <div className="relative autocomplete-input">
            {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>}
            <input
                id={id}
                type="text"
                value={value}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="
                border
                border-stroke
                border-border
                rounded-lg
                w-[500px]
                py-5 px-4
                h-16
                text-border
                font-normal
          text-sm
          leading-tight
          placeholder-placeholder
          focus:outline-none
          focus:shadow-outline
          focus:ring-primary-200
          focus:border-primary-200
          focus:border-2 w-full m-0"
                // className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            />
            {isDropdownVisible && filteredOptions.length > 0 && (
                <ul className="absolute z-10 mt-2 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto">
                    {filteredOptions.map((option, idx) => (
                        <li
                            key={idx}
                            onClick={() => handleOptionSelect(option)}
                            className="cursor-pointer select-none relative px-4 py-2 hover:bg-gray-200"
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutocompleteInput;
