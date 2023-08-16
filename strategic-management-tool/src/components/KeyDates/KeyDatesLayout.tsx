import { useState } from "react";
import {
  Root as Tabs,
  List as TabList,
  Content as TabContent,
} from "@radix-ui/react-tabs";
import StrategicProjects from "./StrategicProjects";
import BAUProjects from "./BAUProjects";
import AnnualCorporate from "./AnnualCorporate";
import TechnicalChange from "./TechnicalChange";
import InputDropdown from "../InputDropdown";

interface DropdownOption {
  label: string;
  value: string;
}

const options: DropdownOption[] = [
  { label: "Strategic Projects", value: "tab1" },
  { label: "BAU Projects", value: "tab2" },
  { label: "Annual Corporate Initiative", value: "tab3" },
  { label: "Technical Change Projects", value: "tab4" },
];

const KeyDatesLayout = () => {
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const handleOptionSelected = (option: string) => {
    const selected = options.find((o) => o.label === option);
    if (selected) setSelectedOption(selected.value);
  };

  const renderTabContent = (value: string) => {
    switch (value) {
      case "tab1":
        return <StrategicProjects />;
      case "tab2":
        return <BAUProjects />;
      case "tab3":
        return <AnnualCorporate />;
      case "tab4":
        return <TechnicalChange />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="text-2xl">What type of project is this?</h1>
      <Tabs value={selectedOption} onValueChange={setSelectedOption}>
        <TabList className="flex w-2/4 border-b border-border border-opacity-20">
          <InputDropdown
            id="dropdown"
            header="Project Type"
            label={options.find((o) => o.value === selectedOption)?.label || ""}
            options={options.map((o) => o.label)}
            onOptionSelected={handleOptionSelected}
            className="w-full m-0"
          />
        </TabList>
        <div className="flex-col w-full py-6">
          {options.map((option) => (
            <TabContent
              key={option.value}
              value={option.value}
              className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 "
            >
              {renderTabContent(option.value)}
            </TabContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default KeyDatesLayout;
