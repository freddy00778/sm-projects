import {Outlet, useParams} from "react-router-dom";
import KeyChangeList from "../keyChanges/KeyChangeList";
import { IssueKeyChangeListData } from "../../data/IssueKeyChangeListData";
import React, {useEffect, useState} from "react";
import {budgetItemActions} from "../../_store/budgetItems.slice";
import {useDispatch, useSelector} from "react-redux";
import keyChange from "../../assets/images/key-change.svg";
import {keyChangeActions} from "../../_store/keychanges.slice";

const IssueRegisterLayout = () => {

      const params = useParams()
      const keyChangeId = params["*"]
      const {user} = useSelector(state => state.auth)
      const dispatch = useDispatch()
      const [keyChangeItems, setKeyChangeItems] = useState([])

  useEffect(() => {
    dispatch(keyChangeActions.getKeyChangesByProjectId({id: user?.project_id})).then((res) => {
      const mappedKeyChanges = res?.payload?.data?.map((keyChangeItem) => {
        return    {
             id: keyChangeItem?.id,
             title: keyChangeItem?.title,
             image: keyChange,
             route: `/project/dashboard/issueregister/${keyChangeItem.id}`,
        }
      })
      setKeyChangeItems(mappedKeyChanges)
    })
  },[])



  return (
    <div className=" w-full h-full space-y-6">
      <div className="">
        <h1>Change Management Issue Summary</h1>
      </div>
      <div className="border border-border border-opacity-20  rounded-2xl w-full h-[90%]">
        <div className=" h-[16%] px-8 space-x-32 py-6 border-b border-b-border border-opacity-20">
          <span>Key Changes</span>
          <span className=" text-primary-500">
            List of Issues per key change
          </span>
        </div>
        <div className="flex h-[84%] w-full">
          <div className="w-1/4 border-r border-border border-opacity-20">
            <KeyChangeList data={keyChangeItems} text="Key" />
          </div>
          <div className="w-3/4">
              {!keyChangeId &&
              <div className="flex items-center justify-center h-80">
                  <div className="p-8 border border-gray-300 shadow-lg rounded-lg bg-white max-w-md">
                      <p className="text-center text-xl text-gray-700 font-semibold mb-4">Oops!</p>
                      <p className="text-center text-gray-600">
                          Please select a key change.
                      </p>
                  </div>
              </div>
              }
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueRegisterLayout;
