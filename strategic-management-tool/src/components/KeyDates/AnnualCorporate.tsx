import React, { useState } from "react";
import DynamicFieldSet from "../DynamicFieldSet";
import Button from "../Button";
import InputField from "../InputField";

interface Performance {
  performance: string;
  startDate: string;
  endDate: string;
}
interface Regulation {
  regulation: string;
  startDate: string;
  endDate: string;
}

interface Others {
  others: string;
  startDate: string;
  endDate: string;
}
interface Strategic {
  strategic: string;
  startDate: string;
  endDate: string;
}
interface Budget {
  budget: string;
  startDate: string;
  endDate: string;
}
interface Shutdown {
  shutdown: string;
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
const defaultBenefit: Performance = {
  performance: "Provide Details",
  startDate: "",
  endDate: "",
};
const defaultOther: Regulation = {
  regulation: "Provide Details",
  startDate: "",
  endDate: "",
};

const defaultActivity: Others = {
  others: "Provide Details",
  startDate: "",
  endDate: "",
};
const defaultStrategic: Strategic = {
  strategic: "Provide Details",
  startDate: "",
  endDate: "",
};
const defaultBudget: Budget = {
  budget: "Provide Details",
  startDate: "",
  endDate: "",
};
const defaultShutdown: Shutdown = {
  shutdown: "Provide Details",
  startDate: "",
  endDate: "",
};
const AnnualCorporate: React.FC = () => {
  const [date, setDate] = useState("");
  const [text, setText] = useState("");
  const [performance, setPerformance] = useState<Performance[]>([
    defaultBenefit,
  ]);
  const [others, setOthers] = useState<Others[]>([defaultActivity]);
  const [regulation, setRegulation] = useState<Regulation[]>([defaultOther]);
  const [strategic, setStrategic] = useState<Strategic[]>([defaultStrategic]);
  const [budget, setBudget] = useState<Budget[]>([defaultBudget]);
  const [shutdown, setShutdown] = useState<Shutdown[]>([defaultShutdown]);

  const addOther = () => {
    setOthers([...others, defaultActivity]);
  };

  const addRegulation = () => {
    setRegulation([...regulation, defaultOther]);
  };
  const addPerformance = () => {
    setPerformance([...performance, defaultBenefit]);
  };
  const addStrategic = () => {
    setStrategic([...strategic, defaultStrategic]);
  };

  const addBudget = () => {
    setBudget([...budget, defaultBudget]);
  };
  const addShutdown = () => {
    setShutdown([...shutdown, defaultShutdown]);
  };
  return (
    <div className="flex-col w-full h-full space-y-10  overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 max-h-[260px]">
      <div className="border-b py-2 border-border border-opacity-20">
        <h1>Annual Strategic Planning</h1>
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
        <h1>Key Activity</h1>
        <Button
          size="md"
          variant="primary"
          onClick={addStrategic}
          type="submit"
          className="w-[25%] m-0 bg-primary-500 rounded-lg"
        >
          Add
        </Button>
      </div>
      <div className="flex flex-col h-full w-full space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200">
        <DynamicFieldSet
          data={strategic}
          setData={setStrategic}
          dataStructure={defaultStructure}
          idBase="strategic"
          labels={{
            strategic: "Strategic",
            startDate: "Start Date",
            endDate: "End Date",
          }}
          placeholders={{
            strategic: "Provide  Details",
            startDate: "End Date",
            endDate: "End Date",
          }}
          characterLimits={characterLimits}
          width={60}
        />
      </div>
      <div className="border-b py-2 border-border border-opacity-20">
        <h1>Annual Budgeting</h1>
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
        <h1>Key Activity</h1>
        <Button
          size="md"
          variant="primary"
          onClick={addBudget}
          type="submit"
          className="w-[25%] m-0 bg-primary-500 rounded-lg"
        >
          Add
        </Button>
      </div>
      <div className="flex flex-col h-full w-full space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200">
        <DynamicFieldSet
          data={budget}
          setData={setBudget}
          dataStructure={defaultStructure}
          idBase="budget"
          labels={{
            budget: "Budget",
            startDate: "Start Date",
            endDate: "End Date",
          }}
          placeholders={{
            budget: "Provide  Details",
            startDate: "",
            endDate: "",
          }}
          characterLimits={characterLimits}
          width={60}
        />
      </div>
      <div className="border-b py-2 border-border border-opacity-20">
        <h1>Shut Down</h1>
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
        <h1>Key Activity</h1>
        <Button
          size="md"
          variant="primary"
          onClick={addShutdown}
          type="submit"
          className="w-[25%] m-0 bg-primary-500 rounded-lg"
        >
          Add
        </Button>
      </div>
      <div className="flex flex-col h-full w-full space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200">
        <DynamicFieldSet
          data={shutdown}
          setData={setShutdown}
          dataStructure={defaultStructure}
          idBase="shutdown"
          labels={{
            shutdown: "Shutdown",
            startDate: "Start Date",
            endDate: "End Date",
          }}
          placeholders={{
            shutdown: "Provide  Details",
            startDate: "",
            endDate: "",
          }}
          characterLimits={characterLimits}
          width={60}
        />
      </div>
      <div className="border-b py-2 border-border border-opacity-20">
        <h1>Performance Review</h1>
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
        <h1>Key Activity</h1>
        <Button
          size="md"
          variant="primary"
          onClick={addPerformance}
          type="submit"
          className="w-[25%] m-0 bg-primary-500 rounded-lg"
        >
          Add
        </Button>
      </div>
      <div className="flex flex-col h-full w-full space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200">
        <DynamicFieldSet
          data={performance}
          setData={setPerformance}
          dataStructure={defaultStructure}
          idBase="performance"
          labels={{
            performance: "Performance",
            startDate: "Start Date",
            endDate: "End Date",
          }}
          placeholders={{
            performance: "Provide  Details",
            startDate: "",
            endDate: "",
          }}
          characterLimits={characterLimits}
          width={60}
        />
      </div>
      <div className="border-b py-2 border-border border-opacity-20">
        <h1>Regulatory Activities</h1>
      </div>
      <div className="flex h-full w-2/4 space-x-8">
        <InputField
          id="change"
          label="Topic"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type Topic"
          type="text"
          className="w-full m-0"
        />
      </div>
      <div className="flex w-full items-center justify-between border-b py-2 border-border border-opacity-20">
        <h1>Key Activity</h1>
        <Button
          size="md"
          variant="primary"
          onClick={addRegulation}
          type="submit"
          className="w-[25%] m-0 bg-primary-500 rounded-lg"
        >
          Add
        </Button>
      </div>
      <div className="flex flex-col h-full w-full space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200">
        <DynamicFieldSet
          data={regulation}
          setData={setRegulation}
          dataStructure={defaultStructure}
          idBase="regulation"
          labels={{
            regulation: "Activity",
            startDate: "Start Date",
            endDate: "End Date",
          }}
          placeholders={{
            regulation: "Provide  Details",
            startDate: "",
            endDate: "",
          }}
          characterLimits={characterLimits}
          width={60}
        />
      </div>
      <div className="border-b py-2 border-border border-opacity-20">
        <h1>Others</h1>
      </div>
      <div className="flex h-full w-2/4 space-x-8">
        <InputField
          id="change"
          label="Topic"
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Type Topic"
          className="w-full m-0"
        />
      </div>
      <div className="flex w-full items-center justify-between border-b py-2 border-border border-opacity-20">
        <h1>Key Activity</h1>
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
          idBase="others"
          labels={{
            others: "Others",
            startDate: "Start Date",
            endDate: "End Date",
          }}
          placeholders={{
            others: "Provide  Details",
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

export default AnnualCorporate;
