import { VictoryPie, VictoryLegend } from "victory";
import { ChangeActivityData } from "../../data/ChangeActivityData";
import StageOfCompletion from "./DashboardData/StageOfCompletion";
import GearChange from "./DashboardData/GearChange";
import BehaviorChangeInfo from "../BehaviorChangeInfo";
const ExecutiveDashboard = () => {
  return (
    <div className="flex flex-col w-full space-y-12 overflow-y-auto max-h-[900px] scrollbar-thin scrollbar-track-slate-200">
      <div className="flex w-full">
        <div className="flex flex-wrap gap-20">
          {ChangeActivityData.map(({ id, topTitle, activity }) => (
            <div key={id} className="flex flex-col space-y-6">
              <h1 className=" text-xl">{topTitle}</h1>
              <div className="flex  w-full ">
                <div className="flex w-full   ">
                  <div className="flex w-full space-x-6 ">
                    {activity.map(({ id, title, data, type, typeValue }) => {
                      const chartData = data.datasets[0].data.map(
                        (item, index) => ({
                          x: data.labels[index],
                          y: item,
                        })
                      );

                      const legendData = data.labels.map((label, index) => ({
                        name: label,
                        symbol: {
                          fill: data.datasets[0].backgroundColor[index],
                        },
                      }));

                      return (
                        <div
                          key={id}
                          className="flex flex-col w-full px-6 py-6 rounded-xl shadow-md border border-border border-opacity-30"
                        >
                          <div className="border-b border-b-border px-2 py-2 flex items-center">
                            <h1>{title}</h1>
                          </div>
                          <div className="flex flex-col items-end mt-2">
                            <p className=" text-xs">{type}</p>
                            <span className="text-sm">{typeValue}</span>
                          </div>
                          <div className="flex w-full items-center">
                            <div className="flex w-full items-center">
                              <VictoryPie
                                data={chartData}
                                colorScale={data.datasets[0].backgroundColor}
                                labels={() => ""} // hide labels
                              />
                            </div>
                            <div className=" w-full">
                              <VictoryLegend
                                data={legendData}
                                orientation="vertical"
                                gutter={6}
                                style={{ labels: { fontSize: 36 } }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <StageOfCompletion />
      </div>
      <div>
        <StageOfCompletion />
      </div>
      <div>
        <GearChange />
      </div>
      <div>
        <BehaviorChangeInfo />
      </div>
    </div>
  );
};

export default ExecutiveDashboard;
