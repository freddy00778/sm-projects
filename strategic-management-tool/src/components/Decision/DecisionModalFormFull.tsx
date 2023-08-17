import InputField from "../InputField";
import Button from "../Button";
import React, {useEffect} from "react";
import {DataType} from "../../../types";
import InputDropdown from "../InputDropdown";

interface FormDataType {
    date1: string;
    topic: string;
    context: string;
    forum: string;
    approvedBy: string;
    comments: string;
    decision: string;
    department: string;
    date2: string;
    nextStep: string;
    actionedBy: string;
}

interface DecisionModalFormProps {
    formData: FormDataType;
    setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
    addData: (newData: DataType) => void;
    dataLength: number;
    onClose: () => void;
}

const DecisionModalForm: React.FC<DecisionModalFormProps> = ({
                                                                 formData,
                                                                 setFormData,
                                                                 addData,
                                                                 dataLength,
                                                                 onClose,
                                                                 approvedByOptions,
                                                                 departmentOptions,
                                                                 actionedByOptions
                                                             }) => {
    const handleSave = () => {
        addData({
            ...formData
        })
        // const formattedDate1 = `${new Date(formData.date1).getDate()}-${
        //     new Date(formData.date1).getMonth() + 1
        // }-${new Date(formData.date1).getFullYear()}`;
        //
        // const formattedDate2 = `${new Date(formData.date2).getDate()}-${
        //     new Date(formData.date2).getMonth() + 1
        // }-${new Date(formData.date2).getFullYear()}`;

        setFormData({
            date1: "",
            topic: "",
            context: "",
            forum: "",
            approvedBy: "",
            comments: "",
            decision: "",
            department: "",
            date2: "",
            nextStep: "",
            actionedBy: "",
        });
        onClose();
    };

    const handleChange = (property: keyof FormDataType, value: string) => {
        setFormData((prevState) => ({...prevState, [property]: value}));
    };

    return (
        <form className="w-full h-full">
            <div
                className="flex flex-col w-full h-full justify-between space-y-8  overflow-y-auto max-h-[1800px] scrollbar-thin scrollbar-thumb-zinc-200 ">
                <h1 className="text-primary-500 text-[18px]">Add A Decision</h1>
                <div className="space-y-4 w-full">
                    <div className="flex w-full h-[80%] space-x-12 items-start justify-between">
                        <div className="flex flex-col w-2/4 h-full space-y-20">
                            <InputField
                                id="date1"
                                label="Date1"
                                value={formData?.date1}
                                onChange={(e) => handleChange("date1", e.target.value)}
                                type="datepicker"
                                required
                                className="w-full m-0"
                            />

                            <InputField
                                id="topic"
                                label="Topic"
                                value={formData?.topic}
                                onChange={(e) => handleChange("topic", e.target.value)}
                                type="text"
                                placeholder="Enter the topic name"
                                required
                                className="w-full m-0"
                            />
                            <InputField
                                id="email"
                                label="Context"
                                value={formData?.context}
                                onChange={(e) => handleChange("context", e.target.value)}
                                type="text"
                                placeholder="Provide the context"
                                required
                                className="w-full m-0"
                            />
                            <InputField
                                id="email"
                                label="Forum"
                                value={formData?.forum}
                                onChange={(e) => handleChange("forum", e.target.value)}
                                type="textarea"
                                placeholder="Enter your forum details"
                                required
                                className="w-full m-0 h-[240px]  "
                                characterLimit={120}
                            />

                            <InputDropdown
                                id="dropdown"
                                header="Approved by"
                                label="Approved by"
                                options={approvedByOptions}
                                className=" w-full m-0"
                            />

                            {/*<InputField*/}
                            {/*    id="email"*/}
                            {/*    label="Approved By"*/}
                            {/*    value={formData?.approvedBy}*/}
                            {/*    onChange={(e) => handleChange("approvedBy", e.target.value)}*/}
                            {/*    type="text"*/}
                            {/*    placeholder="Enter the name"*/}
                            {/*    required*/}
                            {/*    className="w-full m-0"*/}
                            {/*/>*/}
                            <InputField
                                id="email"
                                label="Comments"
                                value={formData?.comments}
                                onChange={(e) => handleChange("comments", e.target.value)}
                                type="textarea"
                                placeholder="Enter the comments"
                                required
                                className="w-full m-0 h-[240px] mb-4 "
                                characterLimit={120}
                            />

                            <InputField
                                id="email"
                                label="Decision"
                                value={formData?.decision}
                                onChange={(e) => handleChange("decision", e.target.value)}
                                type="textarea"
                                placeholder="Describe the decision"
                                required
                                className="w-full m-0 h-[320px] mb-4 "
                                characterLimit={120}
                            />

                            <InputDropdown
                                id="dropdown"
                                header="Department"
                                label="Department"
                                options={departmentOptions}
                                className=" w-full m-0"
                            />

                            <InputField
                                id="date2"
                                label="Date2"
                                value={formData?.date2}
                                onChange={(e) => handleChange("date2", e.target.value)}
                                type="datepicker"
                                required
                                className="w-full m-0"
                            />
                            <InputField
                                id="email"
                                label="Next Step"
                                value={formData?.nextStep}
                                onChange={(e) => handleChange("nextStep", e.target.value)}
                                type="text"
                                placeholder="Describe the next step"
                                required
                                className="w-full m-0"
                                characterLimit={120}
                            />
                            {/*<InputField*/}
                            {/*    id="email"*/}
                            {/*    label="Actioned By"*/}
                            {/*    value={formData?.actionedBy}*/}
                            {/*    onChange={(e) => handleChange("actionedBy", e.target.value)}*/}
                            {/*    type="text"*/}
                            {/*    placeholder="Enter the name"*/}
                            {/*    required*/}
                            {/*    className="w-full m-0"*/}
                            {/*/>*/}

                            <InputDropdown
                                id="dropdown"
                                header="Actioned by"
                                label="Actioned by"
                                options={actionedByOptions}
                                className=" w-full m-0"
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

const DecisionModalForm: React.FC<LessonModalFormProps> = ({
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

            // ... any additional data fields you want to add
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
            <div
                className="flex flex-col w-full h-full justify-between space-y-8  overflow-y-auto max-h-[1800px] scrollbar-thin scrollbar-thumb-zinc-200 ">
                <h1 className="text-primary-500 text-[18px]">Add A Decision</h1>
                <div className="space-y-4 w-full">
                    <div className="flex w-full h-[80%] space-x-12 items-start justify-between">
                        <div className="flex flex-col w-2/4 h-full space-y-20">
                            <InputField
                                id="email"
                                label="Decision Date"
                                value={date1}
                                onChange={(e) => setDate1(e.target.value)}
                                type="datepicker"
                                required
                                className="w-full m-0"
                            />
                            <InputField
                                id="email"
                                label="Topic"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                type="text"
                                placeholder="Enter the topic name"
                                required
                                className="w-full m-0"
                            />
                            <InputField
                                id="email"
                                label="Context"
                                value={context}
                                onChange={(e) => setContext(e.target.value)}
                                type="text"
                                placeholder="Provide the context"
                                required
                                className="w-full m-0"
                            />
                            <InputField
                                id="email"
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
                                id="email"
                                label="Approved By"
                                value={approvedBy}
                                onChange={(e) => setApprovedBy(e.target.value)}
                                type="text"
                                placeholder="Enter the name"
                                required
                                className="w-full m-0"
                            />
                            <InputField
                                id="email"
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
                                id="email"
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
                                id="email"
                                label="Department"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                type="text"
                                placeholder="Enter the department name"
                                required
                                className="w-full m-0"
                            />
                            <InputField
                                id="email"
                                label="Date2"
                                value={date2}
                                onChange={(e) => setDate2(e.target.value)}
                                type="datepicker"
                                required
                                className="w-full m-0"
                            />
                            <InputField
                                id="email"
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
                            className="rounded-lg w-[30%] mt-6 bg-primary-500"
                            type="button"
                        >
                            Add A Decision
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );

}
};

export default DecisionModalForm;
