import Header from "../../components/Header";
import avatar from "../../assets/images/avatar.jpg";
import ChangeApproachForm from "../../components/ChangeApproachForm";
import {ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";
import Loader from "../../components/Loader";

const ChangeApproach = () => {
    const {isLoading} = useSelector( state => state.changeApproach)
  return (
    <div className="flex flex-col w-full h-screen  ">
      <Header backgroundImage={avatar} className="h-1/4">
        <h1 className="text-primary-500 text-[28px] font-normal">
          Change Approach
        </h1>
      </Header>

        <ToastContainer />
        {isLoading &&
        <Loader />
        }
      <ChangeApproachForm />
    </div>
  );
};

export default ChangeApproach;
