// @ts-nocheck


import KeyChangeList from "./KeyChangeList";
import * as Tabs from "@radix-ui/react-tabs";
import StakeholderForm from "./KeyChangeForms/StakeholderForm";
import ChangeDriverForm from "./KeyChangeForms/ChangeDriverForm";
import React, {useEffect, useState} from "react";
import {keyChangeActions} from "../../_store/keychanges.slice";
import keyChange from "../../assets/images/key-change.svg";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../Loader";
import {departmentActions} from "../../_store/department.slice";

const StakeholdersPage: React.FC = () => {
    const {user} = useSelector(state => state.auth)
    const [activeTab, setActiveTab] = useState<string>("tab1");
    const dispatch = useDispatch()
    const [stakeholderKeychanges,setStakeholderKeychanges ] = useState([])
    //@ts-ignore
    const {isLoading} = useSelector(state => state.stakeholder)

    const tabIsActive = (tabValue: string): boolean => activeTab === tabValue;

    useEffect(() => {
        //@ts-ignore
        dispatch(keyChangeActions.getKeyChangesByProjectId({id: user?.project_id})).then((kc) => {
            const keyChanges = kc?.payload?.data?.map((kcg)=> {
                const page = `/project/dashboard/keychange/stakeholders/${kcg?.id}`
                return   {
                    id: kcg?.id,
                    title: kcg?.title,
                    image: keyChange,
                    route: `${page}`,
                }
            })
            setStakeholderKeychanges(keyChanges)
        })
        //@ts-ignore
        dispatch(departmentActions.getDepartments())
    }, [])


    return (
        <div className="w-full h-full flex flex-col ">
            {isLoading && <Loader/>}
            <div className="flex w-full h-[84%] ">
                <div className="w-1/4 border-r border-r-border border-opacity-20">
                    <div className="border-b border-border border-opacity-20">
                        <h1 className="w-full px-12 py-4">Key Changes</h1>
                    </div>
                    <KeyChangeList data={stakeholderKeychanges} />
                </div>
                <div className="w-3/4">
                    <Tabs.Root
                        className="flex-col items-center w-full"
                        onValueChange={(value) => setActiveTab(value as string)}
                        defaultValue="tab1"
                    >
                        <Tabs.List className="flex items-center w-full py-2 px-8 border-b border-border border-opacity-20">
                            <Tabs.Trigger value="tab1" className="pr-28">
                                <h1
                                    className={
                                        tabIsActive("tab1")
                                            ? "text-primary-500 bg-primary-50 px-6 py-2 rounded-md"
                                            : "text-primary-500"
                                    }
                                >
                                    Change Drivers
                                </h1>
                            </Tabs.Trigger>

                            <Tabs.Trigger value="tab2">
                                <h1
                                    className={
                                        tabIsActive("tab2")
                                            ? "text-primary-500 bg-primary-50 px-6 py-2 rounded-md"
                                            : "text-primary-500"
                                    }
                                >
                                    Affected Stakeholders
                                </h1>
                            </Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content value="tab1">
                            <ChangeDriverForm />
                        </Tabs.Content>
                        <Tabs.Content value="tab2">
                            <StakeholderForm />
                        </Tabs.Content>
                    </Tabs.Root>
                </div>
            </div>
        </div>
    );
};

export default StakeholdersPage;