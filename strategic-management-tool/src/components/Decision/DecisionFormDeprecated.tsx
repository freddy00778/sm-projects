import Button from "../Button";
import Table from "../Table";
import {useEffect, useState} from "react";
import lesson from "../../assets/images/lessons-log.svg";
import cancel from "../../assets/images/cancel.svg";
import DecisionModal from "./DecisionModal";
import {DataType} from "../../../types";
import {useDispatch, useSelector} from "react-redux";
import {decisionActions} from "../../_store/decisons.slice";
// interface DataType {
//   [key: string]: string | number;
// }

const DecisionForm = () => {
    const {decisions} = useSelector(state => state.decision)
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [data, setData] = useState<DataType[]>([]);

  const [date1, setDate1] = useState("");
  const [topic, setTopic] = useState("");
  const [context, setContext] = useState("");
  const [forum, setForum] = useState("");
  const [approvedBy, setApprovedBy] = useState("");
  const [comments, setComments] = useState("");
  const [decision, setDecision] = useState("");
  const [department, setDepartment] = useState("");
  const [date2, setDate2] = useState("");
  const [nextStep, setNextStep] = useState("");
  const [actionedBy, setActionedBy] = useState("");
  const  dispatch = useDispatch()

    const convertDate = (inputDate: string) => {
        let [day, month, year] = inputDate.split("-");
        let dateObj = new Date(Number(year), Number(month) - 1, Number(day));
        let formattedDate = dateObj.toISOString().replace("Z", "+00");
        return formattedDate.replace(".000", "");
    }

  const addData = (newData: DataType) => {
    // setData((prevData) => [...prevData, newData]);
    // console.log("new Data", newData)

      dispatch(decisionActions.createDecision({
          decision_description: decision,
          // date1: convertDate(date1),
          // date2: convertDate(date2),
          topic: topic,
          context: context,
          forum: forum,
          department: department,
          approvedBy: approvedBy,
          actionedBy: actionedBy,
          nextStep: nextStep,
          comments: comments
      })).then(() => {
          dispatch(decisionActions.getAll({project_id: ""})).then((resp) => {
              console.log("Decision data", resp.payload.data)
              setData(resp.payload.data)
          })
      })
  };

  const handleSave = () => {
        setSecondModalOpen(true); // Open the modal when button is clicked
  };

  useEffect(() => {
      dispatch(decisionActions.getAll({project_id: ""})).then((resp) => {
          console.log("Decision data", resp.payload.data)
          setData(resp.payload.data)
          // setData(decisions?.data)
      })
  },[])

  return (
    <div className="flex flex-col w-full h-screen relative ">
      <div className="flex flex-col w-full h-full my-10  space-y-10 ">
        <div className="flex w-full px-10 items-end justify-end">
          <Button
            variant="primary"
            size="lg"
            onClick={handleSave}
            className="rounded-lg w-[30%] bg-primary-500"
            type="button"
          >
            Add A Decision
          </Button>
        </div>
        <div className="flex flex-col w-full px-10 h-[80%]">
          <Table
            headings={[
                {name: "No", alias: "No"},
                {name: "date1", alias: "Date1"},
                {name: "topic", alias: "Topic"},
                {name: "context", alias: "Context"},
                {name: "department", alias: "Dept"},
                {name: "decision_description", alias: "Decision"},
                {name: "forum", alias: "Forum"},
                {name: "date2", alias: "Date2"},
                { name: "nextStep", alias: "Next Step"},
                {name: "ApprovedBy", alias: "Approved By"},
                {name: "ActionedBy", alias: "Actioned By"},
                {name: "Comments", alias: "Comments"},
            ]}
            data={data}
            //addData={addData}
            children={
              <div className=" space-y-2">
                <img src={lesson} alt="lessons" width={200} />
                <h1 className="text-[18px]">No Decision Made</h1>
              </div>
            }
          />
        </div>
      </div>
      <DecisionModal
        isOpen={secondModalOpen}
        onClose={() => setSecondModalOpen(false)}
        className="absolute"
        cancel={cancel}
        width={14}
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
        dataLength={data.length}
      />
    </div>
  );
};

export default DecisionForm;
