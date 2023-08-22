import React, {useEffect, useState} from "react";
import drop from "../assets/images/dropdown.svg";

interface Option {
    name: string;
    value: string;
}

interface DropdownProps {
    label: any;
    options: Option[];
    onOptionsSelected: (options: Option[]) => void;
    id: string;
    header?: string;
    className?: string;
    fontSize?: number;
    color?: string;
    fontWeight?: number;
    defaultOptions?: Option[]
}

const MultiSelectDropdown: React.FC<DropdownProps> = ({
                                                          label,
                                                          options,
                                                          onOptionsSelected,
                                                          id,
                                                          header,
                                                          className,
                                                          fontSize,
                                                          color,
                                                          fontWeight,
                                                          defaultOptions = []
                                                      }) => {
    const [isOpen, setIsOpen] = useState(false);
    // const [selectedOptions, setSelectedOptions] = useState<Option[]>(defaultOptions);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>(defaultOptions || []);

    useEffect(() => {
        console.log("label", label)
        setSelectedOptions(defaultOptions || []);
    }, [defaultOptions]);


    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    const handleOptionToggle = (option: Option) => {
        let updatedOptions: Option[];

        const isOptionSelected = selectedOptions.some(selected => selected.value === option.value);

        if (isOptionSelected) {
            updatedOptions = selectedOptions.filter(selected => selected.value !== option.value);
        } else {
            updatedOptions = [...selectedOptions, option];
        }

        setSelectedOptions(updatedOptions);
        onOptionsSelected(updatedOptions); // Send updated selected options to parent
    }

    const handleSave = () => {
        onOptionsSelected(selectedOptions);
        setIsOpen(false);
    }

    return (
        <div className={`relative inline-block w-full text-left my-6 ${className}`}>
            <div className="w-full flex flex-col">
                <label
                    htmlFor={id}
                    className="block text-black font-book mb-4 text-sm"
                    style={{
                        fontSize: `${fontSize}px`,
                        color: `${color}`,
                        fontWeight: `${fontWeight}`,
                    }}
                >
                    {header}
                </label>
                <button
                    type="button"
                    className={`flex justify-between w-full items-center rounded-xl border border-border border-stroke shadow-sm px-4 py-5 bg-white text-sm font-book text-placeholder  hover:bg-gray-50 focus:outline-none ${className}`}
                    onClick={handleToggle}
                >
                    {selectedOptions?.map(option => option.name).join(", ")}
                    <img src={drop} alt="Toggle Dropdown" />
                </button>
            </div>

            {isOpen && (
                <div className="origin-top-right absolute z-10 right-0 mt-2 w-full py-4 px-4 rounded-xl shadow-lg bg-white ring-1 ring-primary-200 ring-opacity-40 overflow-y-auto max-h-[280px] scrollbar-thin scrollbar-thumb-zinc-200">
                    <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        {options?.map((option, index) => (
                            <div key={index} className="flex items-center">
                                <input
                                    id={option.value}
                                    type="checkbox"
                                    checked={selectedOptions?.some(selected => selected.value === option.value)}
                                    onChange={() => handleOptionToggle(option)}
                                />
                                <label
                                    htmlFor={option.value}
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    <strong>{option.name}</strong>
                                </label>
                                <br/>
                            </div>

                        ))}
                        <button
                            type="button"
                            className="mt-2 w-full bg-[#a70000] text-white rounded-md px-4 py-2"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;
