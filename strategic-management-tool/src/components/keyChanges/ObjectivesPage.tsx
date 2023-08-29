// @ts-nocheck

import KeyChangeList from "./KeyChangeList";
import {Outlet, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {keyChangeActions} from "../../_store/keychanges.slice";
import keyChange from "../../assets/images/key-change.svg";
import React from "react";
import Loader from "../Loader";
const ObjectivesPage = () => {
    const params = useParams()
    const keyChangeId = params["*"]
    const {user} = useSelector(state => state.auth)
    //@ts-ignore
    const {isLoading} = useSelector( state => state.objectives)
    //@ts-ignore
    const keyChanges = useSelector( state => state.keychanges)
    const dispatch = useDispatch()
    const [objectiveKeyChanges, setObjectiveKeyChanges] = useState([])

    useEffect(() => {
        //@ts-ignore
        dispatch(keyChangeActions.getKeyChangesByProjectId({id: user?.project_id})).then((kc) => {
            const objectiveKeyChanges = kc?.payload?.data?.map((kcg)=> {
                const page = `/project/dashboard/keychange/objectives/${kcg?.id}`
                return   {
                    id: kcg?.id,
                    title: kcg?.title,
                    image: keyChange,
                    route: `${page}`,
                }
            })
            setObjectiveKeyChanges(objectiveKeyChanges)
        })

    }, [])

  return (

    <div className="w-full h-full flex flex-col ">
        {
            isLoading || keyChanges.isLoading && <Loader />

        }
      <div className="flex w-full py-6 px-6 border-b border-b-border border-opacity-20 items-center ">
        <h1 className="w-1/4 px-6">Key Changes</h1>
        <h1 className="w-3/4 text-primary-500">Objectives</h1>
      </div>
      <div className="flex w-full h-[84%] ">
        <div className="w-1/4 border-r border-r-border border-opacity-20">
          {/*<KeyChangeList data={ObjectiveKCLData} />*/}
          <KeyChangeList data={objectiveKeyChanges} />
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
  );
};

export default ObjectivesPage;
