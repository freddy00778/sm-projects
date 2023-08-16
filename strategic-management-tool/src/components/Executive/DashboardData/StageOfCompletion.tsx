import { StageCompletionData } from "../../../data/StageCompletionData";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

const StageOfCompletion = () => {
  return (
    <div className="flex w-full flex-wrap">
      {StageCompletionData.map(({ id, topTitle, activity }) => (
        <div key={id} className="w-full space-y-6">
          <h1 className="text-xl">{topTitle}</h1>
          <div className="flex flex-wrap gap-10">
            {activity.map(({ id, title, data }) => (
              <div
                key={id}
                className="px-6 py-6 rounded-xl shadow-md border border-border border-opacity-30  "
              >
                <h2>{title}</h2>
                <div className="py-5">
                  <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={30} // Increase the padding for more space around the chart
                    padding={{ top: 20, bottom: 100, left: 60, right: 60 }} // Add additional padding to accommodate labels
                  >
                    <VictoryAxis
                      tickValues={data.labels}
                      style={{
                        ticks: { stroke: "grey", size: 10 }, // Styling the tick marks
                        tickLabels: {
                          fontSize: 12,
                          padding: 10,
                          angle: 30, // Tilting the labels
                          verticalAnchor: "middle",
                          textAnchor: "start", // Aligning the labels
                        }, // Styling the tick labels
                      }}
                    />
                    <VictoryAxis
                      dependentAxis
                      tickFormat={(tick) => `${tick}`}
                      style={{
                        ticks: { stroke: "grey", size: 15 }, // Styling the tick marks
                        tickLabels: { fontSize: 15, padding: 10 }, // Styling the tick labels
                      }}
                    />
                    <VictoryBar
                      barWidth={35} // Increase the bar width
                      data={data.datasets[0].data.map((value, index) => ({
                        x: data.labels[index],
                        y: value,
                        fill: data.datasets[0].backgroundColor[index],
                      }))}
                      style={{
                        data: {
                          fill: ({ datum }) => datum.fill,
                        },
                      }}
                    />
                  </VictoryChart>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StageOfCompletion;
