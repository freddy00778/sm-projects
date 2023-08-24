import {useEffect, useState} from "react";
import InputField from "../../../InputField";
import InputDropdown from "../../../InputDropdown";
import Button from "../../../Button";
import {useDispatch, useSelector} from "react-redux";
import {keyImpactActions} from "../../../../_store/keyImpact.slice";
import AutocompleteInput from "../../../AutocompleteInput";
import {useParams} from "react-router-dom";

const Assets = () => {
    const dispatch = useDispatch()
    const {departments} = useSelector(state => state.department)
    const options = [{name: "Fixed", value:"fixed"}, {name: "Moveable", value: "moveable"}, {name: "Infrastructure", value: "infrastructure"}];
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [departmentOption, setDepartmentOption] = useState("");
    const params = useParams()
    const keyChangeId = params["*"]
    const handleOptionSelected = (option: any) => {
        setSelectedOption(option);
    };
    const [division, setDivision] = useState("");

    const handleAutocompleteSelect = (option: { name: string; value: any }) => {
        setDivision(option?.name); // Or handle as needed
        setDepartmentOption(option?.value)
    };

    const saveAssets = () => {
        console.log("Selected option", selectedOption)
        console.log("Department option", departmentOption)
        dispatch(keyImpactActions.createKeyImpact({
            key_change_id: keyChangeId,
            asset_type: selectedOption?.value,
            asset_type_department_id: departmentOption
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

    return (
        <form className="flex flex-col w-full px-10 py-10  space-y-10">
            <div className="w-full flex items-center border-b border-b-border py-2">
                <h1 className="text-[20px]">Assets</h1>
            </div>
            <div className="flex w-full items-center justify-between space-x-10">
                <InputDropdown
                    id="dropdown"
                    header="Asset Type"
                    label={`${selectedOption}`}
                    options={options}
                    onOptionSelected={handleOptionSelected}
                    className=" w-full m-0"
                />

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
                    onClick={saveAssets}
                    type="button"
                    className="w-[50%] m-0 bg-primary-500 rounded-lg"
                >
                    Save Asset
                </Button>
            </div>

        </form>
    );
};

export default Assets;