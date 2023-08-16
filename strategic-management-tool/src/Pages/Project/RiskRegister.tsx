import Header from "../../components/Header";
import avatar from "../../assets/images/avatar.jpg";
import RiskRegisterLayout from "../../components/RiskRegister/RiskRegisterLayout";
import Loader from "../../components/Loader";
import {useSelector} from "react-redux";

const RiskRegister = () => {
    const {isLoading} = useSelector(state => state.risk)
    const keyChanges = useSelector(state => state.keychanges)
  return (
    <div className="flex flex-col w-full h-screen space-y-6">
      <Header backgroundImage={avatar} className="h/14">
        <h1 className="text-primary-500 text-[28px] font-normal">
          Risk Register
        </h1>
      </Header>
      <div className="px-7 h-3/4">
          {
              isLoading || keyChanges.isLoading &&
              <Loader/>
          }
        <RiskRegisterLayout />
      </div>
    </div>
  );
};

export default RiskRegister;
