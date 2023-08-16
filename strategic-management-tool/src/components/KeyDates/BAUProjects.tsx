import InputField from "../InputField";
import Button from "../Button";
import React, { useState } from "react";

import DynamicFieldSet from "../DynamicFieldSet";

interface Benefit {
  benefit: string;
  startDate: string;
  endDate: string;
}
interface Other {
  other: string;
  startDate: string;
  endDate: string;
}

interface Activity {
  activity: string;
  startDate: string;
  endDate: string;
}

const defaultStructure: Record<
  string,
  | "number"
  | "text"
  | "password"
  | "email"
  | "textarea"
  | "search"
  | "datepicker"
> = {
  content: "text",
  startDate: "datepicker",
  endDate: "datepicker",
};
const characterLimits: Record<string, number> = {
  content: 120,
};
const defaultBenefit: Benefit = {
  benefit: "Provide Details",
  startDate: "",
  endDate: "",
};
const defaultOther: Other = {
  other: "Provide Details",
  startDate: "",
  endDate: "",
};

const defaultActivity: Activity = {
  activity: "Provide Details",
  startDate: "",
  endDate: "",
};

const BAUProjects: React.FC = () => {
  const [date, setDate] = useState("");
  const [text, setText] = useState("");
  const [benefits, setBenefits] = useState<Benefit[]>([defaultBenefit]);
  const [others, setOthers] = useState<Other[]>([defaultOther]);
  const [activities, setActivities] = useState<Activity[]>([defaultActivity]);

  const addOther = () => {
    setOthers([...others, defaultOther]);
  };

  const addActivity = () => {
    setActivities([...activities, defaultActivity]);
  };
  const addBenefit = () => {
    setBenefits([...benefits, defaultBenefit]);
  };
  return (
    <div className="flex-col w-full h-full space-y-10  overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 max-h-[260px]">
      <div className="flex h-full w-full space-x-8">
        <InputField
          id="change"
          label="Initiative Start Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="datepicker"
          className="w-full m-0"
        />
        <InputField
          id="change"
          label="Technical Initiative End Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="datepicker"
          className="w-full m-0"
        />
      </div>
      <InputField
        id="change"
        label="Change Initiative End Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        type="datepicker"
        className="w-2/4 m-0"
      />
      <h1 className="text-2xl">Project Milestone</h1>
      <div className="flex h-full w-full space-x-8">
        <InputField
          id="change"
          label="Strategic Project Approval"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Provide Details"
          type="text"
          className="w-full m-0"
        />
        <InputField
          id="change"
          label="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="datepicker"
          className="w-full m-0"
        />
      </div>
      <div className="flex h-full w-full space-x-8">
        <InputField
          id="change"
          label="Project & CM Plan Approved"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Provide Details"
          type="text"
          className="w-full m-0"
        />
        <InputField
          id="change"
          label="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="datepicker"
          className="w-full m-0"
        />
      </div>
      <div className="flex h-full w-full space-x-8">
        <InputField
          id="change"
          label="Project Launch"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Provide Details"
          type="text"
          className="w-full m-0"
        />
        <InputField
          id="change"
          label="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="datepicker"
          className="w-full m-0"
        />
      </div>
      <div className="flex h-full w-full space-x-8">
        <InputField
          id="change"
          label="Go-Live Date"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Provide Details"
          type="text"
          className="w-full m-0"
        />
        <InputField
          id="change"
          label="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="datepicker"
          className="w-full m-0"
        />
      </div>
      <div className="flex h-full w-full space-x-8">
        <InputField
          id="change"
          label="Hand-over Date"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Provide Details"
          type="text"
          className="w-full m-0"
        />
        <InputField
          id="change"
          label="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="datepicker"
          className="w-full m-0"
        />
      </div>
      <div className="border-b py-2 border-border border-opacity-20">
        <h1>Benefit Realization Phase</h1>
      </div>
      <div className="flex h-full w-full space-x-8">
        <InputField
          id="change"
          label="Start Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="datepicker"
          className="w-full m-0"
        />
        <InputField
          id="change"
          label="End Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="datepicker"
          className="w-full m-0"
        />
      </div>
      <div className="flex w-full items-center justify-between border-b py-2 border-border border-opacity-20">
        <h1>Benefit</h1>
        <Button
          size="md"
          variant="primary"
          onClick={addBenefit}
          type="submit"
          className="w-[25%] m-0 bg-primary-500 rounded-lg"
        >
          Add Benefit
        </Button>
      </div>
      <div className="flex flex-col h-full w-full space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200">
        <DynamicFieldSet
          data={benefits}
          setData={setBenefits}
          dataStructure={defaultStructure}
          idBase="benefit"
          labels={{
            benefit: "Benefit",
            startDate: "Start Date",
            endDate: "End Date",
          }}
          placeholders={{
            benefit: "Provide  Details",
            startDate: "End Date",
            endDate: "End Date",
          }}
          characterLimits={characterLimits}
          width={60}
        />
      </div>
      <div className="flex w-full items-center justify-between border-b py-2 border-border border-opacity-20">
        <h1>Others</h1>
        <Button
          size="md"
          variant="primary"
          onClick={addOther}
          type="submit"
          className="w-[25%] m-0 bg-primary-500 rounded-lg"
        >
          Add
        </Button>
      </div>
      <div className="flex flex-col h-full w-full space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200">
        <DynamicFieldSet
          data={others}
          setData={setOthers}
          dataStructure={defaultStructure}
          idBase="benefit"
          labels={{
            other: "Others",
            startDate: "Start Date",
            endDate: "End Date",
          }}
          placeholders={{
            other: "Provide  Details",
            startDate: "",
            endDate: "",
          }}
          characterLimits={characterLimits}
          width={60}
        />
      </div>
      <h1 className="text-2xl">Key Project Activities</h1>
      <div className="flex w-full items-center justify-between border-b py-2 border-border border-opacity-20">
        <h1>Key Activity</h1>
        <Button
          size="md"
          variant="primary"
          onClick={addActivity}
          type="submit"
          className="w-[25%] m-0 bg-primary-500 rounded-lg"
        >
          Add
        </Button>
      </div>
      <div className="flex flex-col h-full w-full space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200">
        <DynamicFieldSet
          data={activities}
          setData={setActivities}
          dataStructure={defaultStructure}
          idBase="benefit"
          labels={{
            activity: "Activity",
            startDate: "Start Date",
            endDate: "End Date",
          }}
          placeholders={{
            activity: "Provide  Details",
            startDate: "",
            endDate: "",
          }}
          characterLimits={characterLimits}
          width={60}
        />
      </div>
    </div>
  );
};

export default BAUProjects;
