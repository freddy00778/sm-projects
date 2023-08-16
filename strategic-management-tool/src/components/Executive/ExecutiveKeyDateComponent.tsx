import DynamicFieldSet from "../DynamicFieldSet";
import InputField from "../InputField";
import Button from "../Button";
import { useState } from "react";

interface Others {
  others: string;
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

const defaultActivity: Others = {
  others: "Provide Details",
  startDate: "",
  endDate: "",
};
const ExecutiveKeyDateComponent = () => {
  const [text, setText] = useState("");
  const [others, setOthers] = useState<Others[]>([defaultActivity]);
  const addOther = () => {
    setOthers([...others, defaultActivity]);
  };

  return (
    <div className="flex-col w-full h-full space-y-10  overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 max-h-[660px]">
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

export default ExecutiveKeyDateComponent;
