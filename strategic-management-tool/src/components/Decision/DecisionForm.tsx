import Button from "../Button";
import Table from "../Table";
import {useEffect, useState} from "react";
import lesson from "../../assets/images/lessons-log.svg";
import cancel from "../../assets/images/cancel.svg";
import DecisionModal from "./DecisionModal";
import {DataType} from "../../../types";
import {useDispatch, useSelector} from "react-redux";
import {decisionActions} from "../../_store/decisons.slice";
import {userActions} from "../../_store/users.slice";
import TableComponent from "../TableComponent";

const DecisionForm = () => {
    const { user } = useSelector(state => state.auth)
    const { decisions } = useSelector(state => state.decision)
    const [secondModalOpen, setSecondModalOpen] = useState(false);
    const [data, setData] = useState<DataType[]>([]);
    const [options, setOptions] = useState([]);

    const [formData, setFormData] = useState({
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

    const { date1, topic, context, forum, approvedBy, comments, decision, department, date2, nextStep, actionedBy } = formData;
    const dispatch = useDispatch()

    const addData = (newData: DataType) => {
        dispatch(decisionActions.createDecision({
            decision_description: decision,
            date1,
            topic: topic,
            context: context,
            forum: forum,
            department: department,
            approvedBy: approvedBy,
            actionedBy: actionedBy,
            nextStep: nextStep,
            comments: comments
        })).then(fetchDecisions)
    };

    const fetchDecisions = () => {
        dispatch(decisionActions.getAll({project_id: user?.project_id})).then((resp) => {
            console.log("Decision data", resp.payload.data)
            setData(resp.payload.data)
        })
    }

    const fetchUsers = () => {
        dispatch(userActions.getAll()).then((resp) => {
            console.log("User data", resp.payload.data)
            // setData(resp.payload.data)
            const mappedUserOptions = resp.payload.data?.map((item) => {
                return {
                    value: item.id,
                    name: `${item.first_name} ${item.last_name}`
                }
            })
            setOptions(mappedUserOptions)
        })
    }

    // const options = [
    //     "Select",
    //     "Strategic Change",
    //     "BAU Change",
    //     "Annual Corporate Initiative",
    // ];

    const handleSave = () => {
        setSecondModalOpen(true); // Open the modal when button is clicked
    };

    useEffect(() =>{
        fetchUsers()
        fetchDecisions()
    }, []);

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
                    <TableComponent
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
                                {/*<img src={lesson} alt="lessons" width={200} />*/}
                                {/*<h1 className="text-[18px]">No Decision Made</h1>*/}
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
                approvedByOptions={options}
                departmentOptions={options}
                actionedByOptions={options}
                setFormData={setFormData}

                {...formData} // spread the form data object here
                addData={addData}
                dataLength={data.length}
            />
        </div>
    );
};

export default DecisionForm;
