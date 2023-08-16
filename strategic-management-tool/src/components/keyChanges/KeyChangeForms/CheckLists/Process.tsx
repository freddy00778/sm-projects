import {useEffect, useState} from "react";
import InputField from "../../../InputField";
import InputDropdown from "../../../InputDropdown";
import {useDispatch, useSelector} from "react-redux";
import Button from "../../../Button";
import {keyImpactActions} from "../../../../_store/keyImpact.slice";
import {useParams} from "react-router-dom";
import Loader from "../../../Loader";
import AutocompleteInput from "../../../AutocompleteInput";

const Process = () => {
  const options = [
    {name: "Complexity", value: "complexity"},
    {name: "Integration", value: "integration"},
    {name: "Automation", value: "automation"},
    {name: "Workload", value: "workload"}
  ];
  const dispatch = useDispatch()
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [departmentOption, setDepartmentOption] = useState("");
  const handleOptionSelected = (option: any) => {
    setSelectedOption(option);
  };
  const [division, setDivision] = useState("");
  const params = useParams()
  const keyChangeId = params["*"]
  const {isLoading} = useSelector(state => state.keyImpact)
  const {departments} = useSelector(state => state.department)

  const saveProcess = () => {
    console.log("Selected option", selectedOption)
    console.log("Department option", departmentOption)
    dispatch(keyImpactActions.createKeyImpact({
      key_change_id: keyChangeId,
      process_type: selectedOption?.value,
      process_type_department_id: departmentOption
    }))
  }

  useEffect(() => {
    const departmentOptions = departments?.data?.map((dp) => {
      return {
        name: dp?.name,
        value: dp?.id
      }
    })
    setDepartmentOptions(departmentOptions)
  },[])

  const handleAutocompleteSelect = (option: { name: string; value: any }) => {
    setDivision(option.name); // Or handle as needed
    setDepartmentOption(option.value)
  };



  return (
    <form className="flex flex-col w-full px-10 py-10  space-y-10">
      {isLoading && <Loader/> }
      <div className="w-full flex items-center border-b border-b-border py-2">
        <h1 className="text-[20px]">Process</h1>
      </div>
      <div className="flex w-full items-center justify-between space-x-10">
        <InputDropdown
          id="dropdown"
          header="Process Type"
          label={`${selectedOption}`}
          options={options}
          onOptionSelected={handleOptionSelected}
          className=" w-full m-0"
        />
        {/*<InputField*/}
        {/*  id="text"*/}
        {/*  label="Division/Department/Unit"*/}
        {/*  value={division}*/}
        {/*  onChange={(e) => setDivision(e.target.value)}*/}
        {/*  type="text"*/}
        {/*  placeholder="Enter the department name"*/}
        {/*  required*/}
        {/*  className="w-full m-0"*/}
        {/*/>*/}

        <AutocompleteInput
            id="division-autocomplete"
            label="Division/Department/Unit"
            value={division}
            onChange={(value) => setDivision(value)}
            onSelect={handleAutocompleteSelect}
            options={departmentOptions}
            placeholder="Enter the department name"
        />
      </div>

      <div className="flex items-center w-full justify-end">
        <Button
            size="md"
            variant="primary"
            onClick={saveProcess}
            type="button"
            className="w-[50%] m-0 bg-primary-500 rounded-lg"
        >
          Save Process
        </Button>
      </div>

    </form>
  );
};

export default Process;
