import Button from "../../Button";
import {useEffect, useState} from "react";

import kc from "../../../assets/images/keyChange.svg";
import AddKeyChangeForm from "./AddKeyChangeForm";
import { DataType } from "../../../../types";
import {useDispatch, useSelector} from "react-redux";
import {keyChangeActions} from "../../../_store/keychanges.slice";
import {data} from "autoprefixer";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import Loader from "../../Loader";

const KeyChangesPage = () => {
  const {user} = useSelector( state => state.auth)
  const {keyChanges, isLoading} = useSelector( state => state.keychanges)
  const changes = useSelector( state => state.keychanges)
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [dataEntries, setDataEntries] = useState<DataType[]>([]); // Array to store all entries
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onClose = () => {
    setSecondModalOpen(false);
  };

  useEffect(() => {
    dispatch(keyChangeActions.getKeyChanges())

  },[])

  const handleSuccessToast = () => {
    toast.success("Successfully added a key change...reloading page", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // Auto-close the toast after 3 seconds
    });
  }

  const handleErrorToast = () => {
    toast.error("All fields are required!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // Auto-close the toast after 3 seconds
    });
  }

  const handleSave = (newData: DataType) => {
    if (!newData.title || !newData.value || !newData.asIs || !newData.toBe ){
      handleErrorToast()
      return
    }
      dispatch(keyChangeActions.createKeyChange({
        title: newData.title,
        value: newData.change,
        as_is: newData.asIs,
        to_be: newData.toBe
      })).then((res) => {
        if (res?.payload){
          handleSuccessToast()

          setTimeout(() => {
            navigate(0)
          },3000)
        }
      })

    setDataEntries([...dataEntries, newData]); // Append new data to the array

  };

  const openModal = () => {
    setSecondModalOpen(true);
  };

  return (
      <>

        {isLoading &&
            <Loader />
        }

    <div className="px-7 flex flex-col w-full h-full space-y-4 relative">
      <div className="flex h-1/4 items-center justify-between">
        <Button
          variant="primary"
          size="lg"
          onClick={openModal}
          className="rounded-lg w-[30%] bg-primary-500"
          type="button"
        >
          Add Key Change
        </Button>
        <div className="flex items-center space-x-4">
          <h1 className="text-[#000] font-semibold text-[18px]">
            Number of Key Changes
          </h1>
          <div className="flex items-center justify-center px-4 py-2 border border-border rounded-xl">
            {keyChanges?.data?.length}
          </div>
        </div>
      </div>
      <div className="flex flex-col ">
        {keyChanges?.data.length === 0 && !secondModalOpen ? (
          // If there are no entries and the modal is not open, display "No Key Change"
          <div className="flex flex-col items-center justify-center space-y-2 ">
            <img src={kc} alt="" />
            <h1 className="text-[20px]">No Key Change</h1>
          </div>
        ) : null}
        <AddKeyChangeForm
          isOpen={secondModalOpen}
          onClose={onClose}
          addData={handleSave}
          list={dataEntries}
        />
      </div>
    </div>
      </>
  );
};

export default KeyChangesPage;
