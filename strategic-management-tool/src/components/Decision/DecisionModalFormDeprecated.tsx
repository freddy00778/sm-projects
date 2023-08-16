import InputField from "../InputField";

import Button from "../Button";
import React from "react";
import { DataType } from "../../../types";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

interface DecisionModalFormProps {
  date1: string;
  setDate1: React.Dispatch<React.SetStateAction<string>>;
  topic: string;
  setTopic: React.Dispatch<React.SetStateAction<string>>;
  context: string;
  setContext: React.Dispatch<React.SetStateAction<string>>;
  forum: string;
  setForum: React.Dispatch<React.SetStateAction<string>>;
  approvedBy: string;
  setApprovedBy: React.Dispatch<React.SetStateAction<string>>;
  comments: string;
  setComments: React.Dispatch<React.SetStateAction<string>>;
  decision: string;
  setDecision: React.Dispatch<React.SetStateAction<string>>;
  department: string;
  setDepartment: React.Dispatch<React.SetStateAction<string>>;
  date2: string;
  setDate2: React.Dispatch<React.SetStateAction<string>>;
  nextStep: string;
  setNextStep: React.Dispatch<React.SetStateAction<string>>;
  actionedBy: string;
  setActionedBy: React.Dispatch<React.SetStateAction<string>>;
  addData: (newData: DataType) => void;
  dataLength: number;
  onClose: () => void;
}

const DecisionModalForm: React.FC<DecisionModalFormProps> = ({
  date1,
  setDate1,
  topic,
  setTopic,
  context,
  setContext,
  forum,
  setForum,
  approvedBy,
  setApprovedBy,
  comments,
  setComments,
  decision,
  setDecision,
  department,
  setDepartment,
  date2,
  setDate2,
  nextStep,
  setNextStep,
  actionedBy,
  setActionedBy,
  addData,
  dataLength,
  onClose,
}) => {
  const handleSave = () => {
    const formattedDate1 = `${new Date(date1).getDate()}-${
      new Date(date1).getMonth() + 1
    }-${new Date(date1).getFullYear()}`;

    const formattedDate2 = `${new Date(date2).getDate()}-${
      new Date(date2).getMonth() + 1
    }-${new Date(date2).getFullYear()}`;

    addData({
      No: dataLength + 1,
      Decision: decision,
      Date1: formattedDate1,
      Date2: formattedDate2,
      Department: department,
      Topic: topic,
      Context: context,
      Forum: forum,
      Comments: comments,
      "Next Step": nextStep,
      "Approved By": approvedBy,
      "Actioned By": actionedBy,
    });

    setDate1("");
    setTopic("");
    setContext("");
    setForum("");
    setApprovedBy("");
    setComments("");
    setDecision("");
    setDepartment("");
    setDate2("");
    setNextStep("");
    setActionedBy("");
    onClose();

  };
  return (
    <form className="w-full h-full">
      <div className="flex flex-col w-full h-full justify-between space-y-8  overflow-y-auto max-h-[1800px] scrollbar-thin scrollbar-thumb-zinc-200 ">
        <h1 className="text-primary-500 text-[18px]">Add A Decision</h1>
        <div className="space-y-4 w-full">
          <div className="flex w-full h-[80%] space-x-12 items-start justify-between">
            <div className="flex flex-col w-2/4 h-full space-y-20">
              <InputField
                id="date1"
                label="Date1"
                value={date1}
                onChange={(e) => setDate1(e.target.value)}
                type="datepicker"
                required
                className="w-full m-0"
              />
              <InputField
                id="topic"
                label="Topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                type="text"
                placeholder="Enter the topic name"
                required
                className="w-full m-0"
              />
              <InputField
                id="context"
                label="Context"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                type="text"
                placeholder="Provide the context"
                required
                className="w-full m-0"
              />
              <InputField
                id="forum"
                label="Forum"
                value={forum}
                onChange={(e) => setForum(e.target.value)}
                type="textarea"
                placeholder="Enter your forum details"
                required
                className="w-full m-0 h-[240px]  "
                characterLimit={120}
              />
              <InputField
                id="approvedBy"
                label="Approved By"
                value={approvedBy}
                onChange={(e) => setApprovedBy(e.target.value)}
                type="text"
                placeholder="Enter the name"
                required
                className="w-full m-0"
              />
              <InputField
                id="comments"
                label="Comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                type="textarea"
                placeholder="Enter the comments"
                required
                className="w-full m-0 h-[240px] mb-4 "
                characterLimit={120}
              />
            </div>
            <div className="flex flex-col w-2/4  space-y-20 mt-6">
              <InputField
                id="decision"
                label="Decision"
                value={decision}
                onChange={(e) => setDecision(e.target.value)}
                type="textarea"
                placeholder="Describe the decision"
                required
                className="w-full m-0 h-[320px] mb-4 "
                characterLimit={120}
              />
              <InputField
                id="department"
                label="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                type="text"
                placeholder="Enter the department name"
                required
                className="w-full m-0"
              />
              <InputField
                id="date2"
                label="Date2"
                value={date2}
                onChange={(e) => setDate2(e.target.value)}
                type="datepicker"
                required
                className="w-full m-0"
              />
              <InputField
                id="nextStep"
                label="Next Step"
                value={nextStep}
                onChange={(e) => setNextStep(e.target.value)}
                type="text"
                placeholder="Describe the next step"
                required
                className="w-full m-0"
                characterLimit={120}
              />
              <InputField
                id="email"
                label="Actioned By"
                value={actionedBy}
                onChange={(e) => setActionedBy(e.target.value)}
                type="text"
                placeholder="Enter the name"
                required
                className="w-full m-0"
              />
            </div>

          </div>

          <div className="flex w-full h-[20%] items-end justify-end ">
            <Button
              variant="primary"
              size="lg"
              onClick={handleSave}
              className="rounded-lg w-[30%] mt-6"
              type="button"
            >
              Add A Decision
            </Button>
          </div>

        </div>
      </div>
    </form>
  );
};

export default DecisionModalForm;
