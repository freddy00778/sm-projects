import InputField from "../../InputField";

import Button from "../../Button";
import { DataType } from "../../../../types";

interface AddKeyChangeFormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  change: string;
  setChange: React.Dispatch<React.SetStateAction<string>>;
  asIs: string;
  setAsIs: React.Dispatch<React.SetStateAction<string>>;
  toBe: string;
  setToBe: React.Dispatch<React.SetStateAction<string>>;
  addData: (newData: DataType) => void;
  onClose: () => void;
}
const AddKeyChangeModalForm: React.FC<AddKeyChangeFormProps> = ({
  title,
  setTitle,
  change,
  setChange,
  asIs,
  setAsIs,
  toBe,
  setToBe,
  onClose,
  addData,
}) => {
  const handleSave = () => {
    addData({
      title: title,
      change: change,
      asIs: asIs,
      toBe: toBe,
    });
    onClose();
  };
  return (
    <div className="flex flex-col space-y-16 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200">
      <div className="flex space-x-10">
        <InputField
          id="change"
          label="Key Change Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter the title of the change"
          required
          className="w-full m-0"
        />
        <InputField
          id="change"
          label="Key Change"
          value={change}
          onChange={(e) => setChange(e.target.value)}
          type="text"
          placeholder="What will change?"
          required
          className="w-full m-0"
        />
      </div>
      <div className="flex flex-col w-full  space-y-10  ">
        <div className="w-full flex items-center border-b border-b-border ">
          <h1 className="text-[22px] text-black">
            As-Is (Example questions to determine As-Is)
          </h1>
        </div>
        <div className="flex flex-wrap gap-6">
          <span>How is it currently being done?</span>
          <span>What does it currently look like?</span>
          <span>Who is currently doing it?</span>
          <span>What system are we currently using?</span>
          <span>How long does it currently take to do?</span>
        </div>

        <div className="flex flex-col w-full ">
          <InputField
            id="user-name"
            //   label="We will be relying on .... to assist us with the implementing the change successfully"
            value={asIs}
            onChange={(e) => setAsIs(e.target.value)}
            type="textarea"
            className="w-full h-[200px] "
            placeholder="Type in your response"
            characterLimit={120}
          />
        </div>
      </div>
      <div className="flex flex-col w-full space-y-10 pt-6  ">
        <div className="w-full flex items-center border-b border-b-border py-2 ">
          <h1 className="text-[22px] text-black">
            To-Be (Example questions to determine To-Be)
          </h1>
        </div>
        <div className="flex flex-wrap gap-6">
          <span>How will it be done in the future?</span>
          <span>How it will look like in the future?</span>
          <span>Who will do it in the future?</span>
          <span>What system/equipment will we use in the future?</span>
          <span>How long will it take in the future?</span>
        </div>
        <div className="flex flex-col w-full ">
          <InputField
            id="user-name"
            //   label="We will be relying on .... to assist us with the implementing the change successfully"
            value={toBe}
            onChange={(e) => setToBe(e.target.value)}
            type="textarea"
            className="w-full h-[200px] "
            placeholder="Type in your response"
            characterLimit={120}
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
  );
};

export default AddKeyChangeModalForm;
