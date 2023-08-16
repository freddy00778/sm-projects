import CurveChart from "./CurveChart";
import { BehaviorChangeData } from "../data/BehaviorChangeData";
const BehaviorChangeInfo = () => {
  return (
    <div className="flex flex-col w-full h-full py-10 space-y-6">
      <div className="flex items-center border-b border-b-zinc-100 py-6">
        Behavior Change
      </div>
      <div>
        <CurveChart />
      </div>
      <div className="flex w-full h-full  flex-wrap gap-10 items-start justify-between px-8">
        {BehaviorChangeData.map(
          ({ id, topTitle, title, riskContent, total, titleColor }) => (
            <div key={id} className="w-[30%]">
              <h1 className="text-[20px] font-medium">{topTitle}</h1>
              <div className="flex flex-col  justify-start bg-white   rounded-xl shadow-md mt-10  ">
                <div
                  className="border-b  border-b-zinc-100  bg-opacity-50 py-4  flex w-full items-center justify-between px-6 font-medium  text-[14px] rounded-tl-xl rounded-tr-xl"
                  style={{ backgroundColor: titleColor }}
                >
                  <div>{title}</div>
                  <div>{total}</div>
                </div>
                {riskContent?.map(({ id, value, number, color, textColor }) => (
                  <div
                    key={id}
                    className={`flex items-center border-b border-b-zinc-100 justify-between w-full px-4 py-4`}
                  >
                    <div
                      className={`  px-3 py-2 rounded-lg font-medium`}
                      style={{ backgroundColor: color, color: textColor }}
                    >
                      {value}
                    </div>
                    <div>{number}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BehaviorChangeInfo;
