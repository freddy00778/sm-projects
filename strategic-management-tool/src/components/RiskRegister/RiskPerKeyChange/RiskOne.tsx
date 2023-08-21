import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from "../../Button";
import { DataType } from "../../../../types";
import risk from "../../../assets/images/riskFlag.svg";
import AddRiskForm from "../AddRiskForm";
import { riskActions } from "../../../_store/risks.slice";

const RiskOne = () => {
  const dispatch = useDispatch();

  const {
    risk,
    risks,
    setRisk,
    riskEditOpened,
    riskViewOpened,
    riskDeleteOpened,
    riskAction
  } = useSelector(state => state.risk);

  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [dataEntries, setDataEntries] = useState<DataType[]>([]);

  const onClose = () => setSecondModalOpen(false);

  const handleSave = (newData: DataType) => setDataEntries(prev => [...prev, newData]);

  const openModal = () => setSecondModalOpen(true);

  useEffect(() => {
    if (riskAction?.payload?.type){
      console.log("Risk id", riskAction.payload)
      setSecondModalOpen(true);
    }

  }, [riskAction]);

  return (
      <div className="relative h-full">
        <div className="flex h-1/4 items-center justify-between p-6">
          <Button
              variant="primary"
              size="md"
              onClick={openModal}
              className="rounded-lg w-[25%] bg-primary-500"
              type="button"
          >
            Add Risk
          </Button>
          <div className="flex items-center space-x-4">
            <h1 className="text-[#000] font-semibold text-[18px]">Number of Risks</h1>
            <div className="flex items-center justify-center px-4 py-2 border border-border rounded-xl">
              {risks?.data.length}
            </div>
          </div>
        </div>
        <div className="px-6 flex flex-col ">
          {dataEntries.length === 0 && !secondModalOpen && (
              <div className="flex flex-col items-center justify-center">
                <img src={risk} alt="No Risk" />
                <h1>No Risk</h1>
              </div>
          )}
          <AddRiskForm
              isOpen={secondModalOpen}
              onClose={onClose}
              addData={handleSave}
          />
        </div>
      </div>
  );
};

export default RiskOne;
