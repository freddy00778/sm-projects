import { FC } from "react";
import CustomModal from "../CustomModal";
import DecisionModalForm from "./DecisionModalForm";

import { DataType } from "../../../types";
import React from "react";

interface LessonModalProps {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    cancel?: string;
    width?: number;
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
}

const DecisionModal: FC<LessonModalProps> = ({
                                                 isOpen,
                                                 onClose,
                                                 className,
                                                 cancel,
                                                 width,
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
                                             }) => {
    return (
        <CustomModal
            isOpen={isOpen}
            size="lg"
            onClose={onClose}
            className={` ${className}`}
            cancel={cancel}
            width={width}
        >
            <DecisionModalForm
                date1={date1}
                setDate1={setDate1}
                topic={topic}
                setTopic={setTopic}
                context={context}
                setContext={setContext}
                forum={forum}
                setForum={setForum}
                approvedBy={approvedBy}
                setApprovedBy={setApprovedBy}
                comments={comments}
                setComments={setComments}
                decision={decision}
                setDecision={setDecision}
                department={department}
                setDepartment={setDepartment}
                date2={date2}
                setDate2={setDate2}
                nextStep={nextStep}
                setNextStep={setNextStep}
                actionedBy={actionedBy}
                setActionedBy={setActionedBy}
                addData={addData}
                dataLength={dataLength}
                onClose={onClose}
            />
        </CustomModal>
    );
};

export default DecisionModal;