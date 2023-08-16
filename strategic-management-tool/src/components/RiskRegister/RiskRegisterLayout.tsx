import { Outlet } from "react-router-dom";
import KeyChangeList from "../keyChanges/KeyChangeList";
import { KeyChangeListData } from "../../data/KeyChangeListData";
import {useEffect, useState} from "react";
import {keyChangeActions} from "../../_store/keychanges.slice";
import keyChange from "../../assets/images/key-change.svg";
import {useDispatch} from "react-redux";
import React from "react";
const RiskRegisterLayout = () => {
    const [keyChangeItems, setKeyChangeItems] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(keyChangeActions.getKeyChanges()).then((res) => {
            const mappedKeyChanges = res?.payload?.data?.map((keyChangeItem) => {
                return    {
                    id: keyChangeItem?.id,
                    title: keyChangeItem?.title,
                    image: keyChange,
                    route: `/project/dashboard/riskregister/${keyChangeItem.id}`,
                }
            })
            setKeyChangeItems(mappedKeyChanges)
        })
    },[])

  return (
    <div className=" w-full h-full space-y-6">
      <div className="">
        <h1>Change Management Risk Register Summary</h1>
      </div>
      <div className="border border-border border-opacity-20  rounded-2xl w-full h-[90%]">
        <div className=" h-[16%] px-8 space-x-32 py-6 border-b border-b-border border-opacity-20">
          <span>Key Changes</span>
          <span className=" text-primary-500">List of Risk per key change</span>
        </div>
        <div className="flex h-[84%] w-full">
          <div className="w-1/4 border-r border-border border-opacity-20">
            <KeyChangeList data={keyChangeItems} />
          </div>
          <div className="w-3/4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskRegisterLayout;
