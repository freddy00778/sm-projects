import { ImpactCategoryData } from "../data/ImpactCategoryData";
import { ChangeDepartmentData } from "../data/ChangeDepartmentData";

const KeyChangeInfo = () => {
  return (
    <div className="flex flex-col w-full h-full py-10 space-y-6">
      <div className="flex items-center border-b border-b-zinc-100  h-12">
        Key Changes
      </div>
      <div className="flex w-full h-full py-6 flex-wrap items-start justify-between px-8">
        {ImpactCategoryData.map(
          ({ id, topTitle, title, riskContent, total }) => (
            <div key={id} className="w-full">
              <h1 className="text-[20px] font-medium">{topTitle}</h1>
              <div className="flex flex-col  justify-start bg-white  w-full rounded-xl shadow-md mt-10 py-4 ">
                <div className="bg-[#F5FFF8] border-b py-3 border-b-zinc-100  bg-opacity-50  flex w-full items-center justify-between px-10 font-medium  text-[14px] rounded-tl-xl rounded-tr-xl">
                  <div>{title}</div>
                  <div className=" text-lg ">{total}</div>
                </div>
                {riskContent?.map(({ id, value, number, color, textColor }) => (
                  <div
                    key={id}
                    className={`flex items-center border-b border-b-zinc-100 justify-between w-full px-10 py-4`}
                  >
                    <div className={`  px-3 py-2 rounded-lg font-medium`}>
                      {value}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div
                        className=" w-12 h-6 rounded-lg"
                        style={{ backgroundColor: color, color: textColor }}
                      ></div>
                      <div>{number}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
      <div className="flex w-full h-full py-6 flex-wrap items-start justify-between px-8">
        {ChangeDepartmentData.map(
          ({
            id,
            department,
            affectedDepartment,
            affectedColor,
            changeDriver,
            changeContent,
            driverColor,
          }) => (
            <div key={id} className="w-full">
              <div className="flex flex-col  justify-start bg-white  w-full rounded-xl shadow-md mt-10 py-4 ">
                <div className="bg-[#FEF5FF] border-b py-4 border-b-zinc-100  bg-opacity-50  flex w-full items-center justify-between px-10 font-medium  text-[14px] rounded-tl-xl rounded-tr-xl">
                  <div className="text-md">{department}</div>
                  <div className=" text-md ">{affectedDepartment}</div>
                  <div className=" text-md ">{changeDriver}</div>
                </div>
                {changeContent?.map(({ id, department, affected, driver }) => (
                  <div
                    key={id}
                    className={`flex items-center border-b border-b-zinc-100 justify-between w-full px-10 py-4`}
                  >
                    <div
                      className={`  px-3 py-2 rounded-lg font-medium w-full`}
                    >
                      {department}
                    </div>
                    <div className="flex items-center space-x-4  w-full">
                      <div
                        className=" w-12 h-6 rounded-lg"
                        style={{ backgroundColor: affectedColor }}
                      ></div>
                      <div>{affected}</div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div
                        className=" w-12 h-6 rounded-lg"
                        style={{ backgroundColor: driverColor }}
                      ></div>
                      <div>{driver}</div>
                    </div>
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

export default KeyChangeInfo;
