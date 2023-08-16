import { PriorityData } from "../../data/PriorityData";
import KeyChangeList from "./KeyChangeList";
import { Outlet } from "react-router-dom";
import {useEffect, useState} from "react";
import {keyChangeActions} from "../../_store/keychanges.slice";
import keyChange from "../../assets/images/key-change.svg";
import {useDispatch} from "react-redux";

const PriorityPage = () => {
    const dispatch = useDispatch()
    const [priorityChanges, setPriorityChanges] = useState([])

    useEffect(() => {
        dispatch(keyChangeActions.getKeyChanges()).then((kc) => {
            const keyChanges = kc?.payload?.data?.map((kcg,index)=> {
                const page = `/project/dashboard/keychange/priority/${kcg?.id}`
                return   {
                    id: kcg?.id,
                    title: kcg?.title,
                    image: keyChange,
                    route: `${page}`,
                }
            })
            setPriorityChanges(keyChanges)
        })

    }, [])

    return (
    <div className="w-full h-full flex flex-col ">
      <div className="flex w-full py-6 px-6 border-b border-b-border border-opacity-20 items-center ">
        <h1 className="w-1/4 px-6">Key Changes</h1>
        <h1 className="w-3/4 text-primary-500">Key Change Prioritisation</h1>
      </div>
      <div className="flex w-full h-[84%] ">
        <div className="w-1/4 border-r border-r-border border-opacity-20">
          <KeyChangeList data={priorityChanges} />
        </div>
        <div className="w-3/4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PriorityPage;
