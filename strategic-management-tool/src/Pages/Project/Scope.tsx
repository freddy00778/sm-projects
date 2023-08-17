import Header from "../../components/Header";
import avatar from "../../assets/images/avatar.jpg";
import ScopeForm from "../../components/ScopeForm";
import {useSelector} from "react-redux";
import Loader from "../../components/Loader";
import React from "react";

const Scope = () => {
    //@ts-ignore
    const {isLoading} = useSelector(state => state.scopes)


  return (
    <div className="flex flex-col w-full h-screen  ">
      <Header backgroundImage={avatar} className="h-1/4">
        <h1 className="text-primary-500 text-[28px] font-normal">Scope</h1>
      </Header>

        {
            isLoading && <Loader />
        }
      <ScopeForm />
    </div>
  );
};

export default Scope;
