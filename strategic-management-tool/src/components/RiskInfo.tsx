import { RiskData } from "../data/RiskData";

const RiskInfo = () => {
  return (
    <div className="flex flex-col w-full h-full py-20 space-y-6">
      <div className="flex items-center border-b border-b-zinc-100  h-12">
        Risks, Issues & Decisions
      </div>
      <div className="flex w-full h-full py-6 flex-wrap gap-10 items-start justify-between px-8">
        {RiskData.map(({ id, topTitle, title, riskContent, total }) => (
          <div key={id}>
            <h1 className="text-[20px] font-medium">{topTitle}</h1>
            <div className="flex flex-col  justify-start bg-white  w-72 rounded-xl shadow-md mt-10 py-4 ">
              <div className="border-b py-3 border-b-zinc-100  bg-opacity-50  flex w-full items-center justify-between px-4 font-medium  text-[14px] rounded-tl-xl rounded-tr-xl">
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
        ))}
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default RiskInfo;
