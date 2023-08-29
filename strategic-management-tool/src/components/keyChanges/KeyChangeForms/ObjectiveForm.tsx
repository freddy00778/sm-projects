// @ts-nocheck

import InputField from "../../InputField";
import {useEffect, useState} from "react";
import Button from "../../Button";
import DisplayValuesComponent from "../../DisplayValuesComponent";
import DynamicFieldSet from "../../DynamicFieldSet";
import {useDispatch, useSelector} from "react-redux";
import {objectiveActions} from "../../../_store/objectives.slice";
import {useParams} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import React from "react";
import {objectiveBenefitActions} from "../../../_store/objectiveBenefits.slice";
import Loader from "../../Loader";
interface ObjectiveFormProps {
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
interface Benefit {
  benefit: string;
  measure: string;
  content?: string
  details?: string
  id?: string
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
  details: "text",
};

const characterLimits: Record<string, number> = {
  content: 240,
};
const defaultBenefit: Benefit = {
  benefit: "How the change adds value",
  measure: "Provide the necessary information",
  content: "",
  details: "",
  id: ""
};


const ObjectiveForm: React.FC<ObjectiveFormProps> = ({ onChange }) => {
  const { objective, isLoading } = useSelector((state) => state.objectives);
  const { objectiveBenefits } = useSelector((state) => state.objectiveBenefit);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const params = useParams();
  const keyChangeId = params["*"];

  const [desiredOutCome, setDesiredOutCome] = useState<string>(objective?.objective?.desired_out_come || "");
  const [necessaryInformation, setNecessaryInformation] = useState<string>(objective?.objective?.implementation_risk || "");
  const [benefits, setBenefits] = useState<Benefit[]>([defaultBenefit]);
  const [benefitIds, setBenefitIds] = useState<string[]>([]);
  const [displayValues, setDisplayValues] = useState<string[]>([]);
  const [displayValues1, setDisplayValues1] = useState<string[]>([]);

  useEffect(() => {

      setBenefits([])
      setBenefitIds([])

  }, []);


  useEffect(() => {
    dispatch(objectiveActions.getObjectiveByKeyChangeId({ id: keyChangeId }));
    dispatch(objectiveBenefitActions.getObjectiveBenefitsByKeyId({id: keyChangeId}));
  }, [keyChangeId, dispatch]);

  useEffect(() => {
    if (objectiveBenefits?.data) {
      const benefitData = objectiveBenefits.data.map((obj) => ({
        benefit: obj.change_benefit,
        measure: obj.measured_benefit,
        content: obj.change_benefit,
        details: obj.measured_benefit,
        id: obj.id,
      }));

      setBenefits(benefitData);
      setBenefitIds(objectiveBenefits.data.map((obj) => obj.id));
    }
  }, [objectiveBenefits,keyChangeId]);

  const handleSave = () => {
    dispatch(objectiveActions.createObjective({
      desired_out_come: desiredOutCome,
      implementation_risk: necessaryInformation,
      project_id: user?.project_id,
      key_change_id: keyChangeId,
      benefits,
      benefitIds,
    }))
        .then(() => {
          toast.success("Successfully updated objective!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        });
  };

  useEffect(() => {
    // alert(objective?.objective?.desired_out_come)
    setDesiredOutCome(objective?.objective?.desired_out_come || "");
    setNecessaryInformation(objective?.objective?.implementation_risk || "");
  }, [objective]);

  const addBenefit = () => {
    setBenefits((prevBenefits) => [...prevBenefits, { ...defaultBenefit }]);
  };

  return (
      <>
        {isLoading &&   <Loader/>}

        <ToastContainer />
    <form className="flex flex-col w-full h-full overflow-y-auto max-h-[800px] scrollbar-thin scrollbar-thumb-zinc-200">
      <div className="flex flex-col w-full px-10 py-10  space-y-16  ">
        <div className="w-full flex items-center border-b border-b-border py-0">
          <h1 className="text-[20px]">Objectives of the key change</h1>
        </div>
        <div className="flex flex-col w-full  ">
          <textarea
              placeholder={"What do you want to see?"}
              defaultValue={desiredOutCome}
              value={desiredOutCome}
              onChange={(e) => setDesiredOutCome(e.target.value) }
              className={`
              border
              border-stroke
              border-border
              rounded-xl
              w-[500px]
              py-5 px-4
              h-16
              text-border
              font-normal
              text-sm
              leading-tight
              placeholder-placeholder
              focus:outline-none
              focus:shadow-outline
              focus:ring-primary-200
              focus:border-primary-200
              focus:border-2
              w-full h-[200px] 
              "border-red-600" : ""
                `}
          />

          <div className="py-16">
            <DisplayValuesComponent
              displayValues={displayValues1}
              handleDeleteValue={() => {}}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full px-10 py-4  space-y-16  ">
        <div className="w-full flex items-center border-b border-b-border py-0">
          <h1 className="text-[20px]">Risk of not implementing the change</h1>
        </div>
        <div className="flex flex-col w-full  ">
          <textarea
              placeholder={"Provide the necessary information"}
              value={necessaryInformation}
              onChange={(e)=> setNecessaryInformation(e.target.value)}
              defaultValue={necessaryInformation}
              className={`
              border
              border-stroke
              border-border
              rounded-xl
              w-[500px]
              py-5 px-4
              h-16
              text-border
              font-normal
              text-sm
              leading-tight
              placeholder-placeholder
              focus:outline-none
              focus:shadow-outline
              focus:ring-primary-200
              focus:border-primary-200
              focus:border-2
              w-full h-[200px] 
              "border-red-600" : ""
                `}/>
          <div>
            <DisplayValuesComponent
              displayValues={displayValues}
              handleDeleteValue={() => {}}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full px-10 py-4  space-y-16  ">
        <div className="flex w-full items-center justify-between border-b py-2 border-border border-opacity-20">
          <h1>Benefit</h1>
          <Button
            size="md"
            variant="primary"
            onClick={addBenefit}
            type="button"
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
            idBase="benefits"
            labels={{
              content: "Benefits of the change",
              details: "How will the benefit be measured?",
            }}
            placeholders={{
              content: "How the change adds value",
              details: "Provide the necessary information",
            }}
            characterLimits={characterLimits}
            width={40}
          />
        </div>
      </div>

      <div className="flex w-full h-full space-x-20 px-10 py-10 pb-10 items-end justify-end">
        <Button
          variant="primary"
          size="lg"
          onClick={() => handleSave()}
          className="rounded-lg w-[40%] bg-primary-500"
          type="button"
        >
          Save & Continue
        </Button>
      </div>
    </form>
      </>
  );
};

export default ObjectiveForm;
