import * as React from "react"
import Button from "../Button";
import Table from "../Table";
import {useEffect, useState} from "react";
import lesson from "../../assets/images/lessons-log.svg";
import cancel from "../../assets/images/cancel.svg";
import LessonModal from "./LessonModal";
import { DataType } from "../../../types";
import {categoryActions} from "../../_store/category.slice";
import {useDispatch, useSelector} from "react-redux";
import {lessonActions} from "../../_store/lessons.slice";
import {ToastContainer} from "react-toastify";
import TableComponent from "../TableComponent";

const LessonsForm = () => {
  const dispatch = useDispatch()
  //@ts-ignore
  const {user} = useSelector(state => state.auth)
  const {lessons} = useSelector(state => state.lessons)
  console.log("User from lessons", user )
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [category, setCategory] = useState("");
  const [loggedBy, setLoggedBy] = useState("");
  const [dateLogged, setDateLogged] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState([])
  const [option, setOption]   = useState(null)
  // const [lessons, setLessons]   = useState([])
  const [submitted] = useState(false)

  const addData = (newData: DataType) => {
    console.log(`${category} - ${dateLogged} - ${description} - ${loggedBy}`)
    setData((prevData) => [...prevData, newData]);
  };


  const fetchLessons = () => {
    //@ts-ignore
    dispatch(lessonActions.getLessonsByProjectId({project_id: user?.project_id}))
  }

  useEffect(() => {
    //@ts-ignore
    dispatch(categoryActions.getCategories()).then((categoriesRes)=> {
      const categoryOptions = categoriesRes?.payload?.data?.map((ctg) => {
        return {
          name: ctg.name,
          value: ctg.id
        }
      })
      setOptions(categoryOptions)
    })
    fetchLessons()
  },[submitted])

  const handleSave = () => {
    setSecondModalOpen(true); // Open the modal when button is clicked
    // console.log(`${category} - ${dateLogged} - ${description} - ${loggedBy}`)

  }

  const handleOptionSelected = (option: any) => {
    setOption(option)
  }

  const saveForm = () => {
    // addLesson()
    setSecondModalOpen(false)
  }

  const sampleData = [
    { name: 'John', age: 28 },
    { name: 'Jane', age: 24 }
  ];

  return (
    <div className="flex flex-col w-full h-screen relative ">
      <ToastContainer />
      <div className="flex flex-col w-full h-full my-10  space-y-10 ">
        <div className="flex w-full px-10 items-end justify-end">
          <Button
            variant="primary"
            size="lg"
            onClick={handleSave}
            className="rounded-lg w-[30%] bg-primary-500"
            type="button"
          >
            Add lessons
          </Button>
        </div>
        <div className="flex flex-col w-full px-10 h-[80%]">
          <TableComponent
            headings={[{alias: "No", name:"No"}, {alias: "Type", name: "type_name"}, {alias:"Description", name:"description"}, {alias: "Date Logged", name:"date_logged"}, {alias:"Logged By", name:"logged_by"}]}
            data={lessons?.data}
            //addData={addData}
            children={
              <div className=" space-y-2">
                {/*<img src={lesson} alt="lessons" width={200} />*/}
                {/*<h1 className="text-[18px]">No Lessons Log</h1>*/}
              </div>
            }
          />

          {/*<TableComponent data={sampleData} itemsPerPage={10} />*/}
        </div>
      </div>

      <LessonModal isOpen={secondModalOpen} onClose={() => setSecondModalOpen(false)} className=" absolute" cancel={cancel} width={14} category={category} setCategory={setCategory} loggedBy={loggedBy} setLoggedBy={setLoggedBy} description={description} setDescription={setDescription} dateLogged={dateLogged} setDateLogged={setDateLogged} addData={addData} dataLength={data.length} options={options} handleOptionSelected={handleOptionSelected} option={option} saveForm={saveForm}/>
    </div>
  );
};

export default LessonsForm;
