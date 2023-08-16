import Header from "../../components/Header";
import avatar from "../../assets/images/avatar.jpg";
import transition from "../../assets/images/transition.svg";

const TransitionCurve = () => {
  return (
    <div className="flex flex-col w-full h-screen space-y-12 ">
      <Header backgroundImage={avatar} className="h/14">
        <h1 className="text-primary-500 text-[28px] font-normal">
          Transition Curve
        </h1>
      </Header>
      <div className="h-3/4 flex items-center justify-center bg-cover bg-center overflow-y-auto max-h-[10000px]  scrollbar-thin scrollbar-thumb-zinc-200">
        <img src={transition} alt="" className="w-full h-full " />
      </div>
    </div>
  );
};

export default TransitionCurve;
