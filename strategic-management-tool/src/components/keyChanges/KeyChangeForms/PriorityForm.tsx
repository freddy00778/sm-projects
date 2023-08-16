import InputDropdown from "../../InputDropdown";
import {useEffect, useState} from "react";
import Button from "../../Button";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../Loader";
import {keyChangePrioritisationActions} from "../../../_store/keychangePrioritisation.slice";
import {useParams} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
const PriorityForm = () => {
  const dispatch = useDispatch()
  const {isLoading,keyChangePrioritisations} = useSelector(state => state.keychangePrioritisation)
  const options = [ {name: "Major", value: "major"}, {name: "Significant", value: "significant"}];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const params = useParams()
  const keyChangeId = params["*"]
  const handleOptionSelected = (option: string) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    console.log("Key change id", keyChangeId)
    if (keyChangeId){
      dispatch(keyChangePrioritisationActions.getKeyChangePrioritisationByKeyId({id: keyChangeId}))
    }
  },[keyChangeId])

  useEffect(() => {
    setSelectedOption(keyChangePrioritisations?.data?.[0]?.prioritisation_level)
  },[keyChangeId])

  console.log("Key change prioritisations", keyChangePrioritisations)
  const handleSave = () => {
    dispatch(keyChangePrioritisationActions.createKeyChangePrioritisation({
      key_change_id: keyChangeId,
      prioritisation_level: selectedOption?.value
    })).then((res) => {
      if (res.type?.includes("fulfilled")){
        handleSuccessToast()
      }
    })
  }

  const handleSuccessToast = () => {
    toast.success("Successfully updated!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  return (
      <>
        <ToastContainer />
        {isLoading && <Loader/>}
    <form
      action="submit"
      className="flex flex-col w-full h-full px-10  overflow-y-auto max-h-[300px] scrollbar-thin scrollbar-thumb-zinc-200"
    >
      <div className="w-2/4">
        <InputDropdown
          id="dropdown"
          header="Key Change Prioritisation"
          defaultOption={selectedOption}
          label={`${selectedOption}`}
          options={options}
          onOptionSelected={handleOptionSelected}
          className=" w-full m-0"
        />
      </div>
      <div className="flex w-full h-full space-x-20 items-end justify-end">
        <Button
          variant="primary"
          size="lg"
          onClick={handleSave}
          className="rounded-lg w-[40%] bg-primary-500"
          type="button"
        >
          Save
        </Button>
      </div>
    </form>
      </>
  );
};

export default PriorityForm;
