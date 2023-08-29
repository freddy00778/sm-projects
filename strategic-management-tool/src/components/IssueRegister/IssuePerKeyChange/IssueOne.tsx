// @ts-nocheck
import Button from "../../Button";
import {useEffect, useState} from "react";
import { DataType } from "../../../../types";
import risk from "../../../assets/images/riskFlag.svg";
import IssueForm from "../IssueForm";
import {useSelector} from "react-redux";

const IssueOne = () => {
  const {issues, issueAction} = useSelector(state => state.issue)
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [dataEntries, setDataEntries] = useState<DataType[]>([]); // Array to store all entries

  console.log("Issues", issues)

  const onClose = () => {
    setSecondModalOpen(false);
  };

  const handleSave = (newData: DataType) => {
    setDataEntries([...dataEntries, newData]); // Append new data to the array
  };

  const openModal = () => {
    setSecondModalOpen(true);
  };

  console.log("Issue Action", issueAction)

  useEffect(() => {
    openModal()
  },[issueAction])

  return (
    <div className="relative  h-full">
      <div className="flex h-1/4 items-center justify-between p-6">
        <Button
          variant="primary"
          size="md"
          onClick={openModal}
          className="rounded-lg w-[25%] bg-primary-500"
          type="button"
        >
          Add Issue
        </Button>
        <div className="flex items-center space-x-4">
          <h1 className="text-[#000] font-semibold text-[18px]">
            Number of Issues
          </h1>
          <div className="flex items-center justify-center px-4 py-2 border border-border rounded-xl">
            {issues?.data?.length}
          </div>
        </div>
      </div>
      <div className="px-6 flex flex-col ">
        {dataEntries.length === 0 && !secondModalOpen ? (
          <div className="flex flex-col items-center justify-center">
            <img src={risk} alt="" />
            <h1>No Issues</h1>
          </div>
        ) : null}
        <IssueForm
          isOpen={secondModalOpen}
          onClose={onClose}
          addData={handleSave}
        />
      </div>
    </div>
  );
};

export default IssueOne;
