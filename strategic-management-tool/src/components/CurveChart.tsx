import React, { useEffect, useRef } from "react";
import Plotly from "plotly.js-dist";

const CurveChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const xValues = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
      ];
      const yValues = [19, 17, 14, 11, 8, 8, 11, 17, 20];
      const colors = [
        "#A30401",
        "#FF855E",
        "#FFD25E",
        "#FFE7AA",
        "#FFC700",
        "#DBFF00",
        "#9EFDEC",
        "#66EDFF",
        "#66FFFF",
      ];
      const customTexts = [
        "Shock",
        "Denial",
        "Anger",
        "Panic",
        "Overwhelm",
        "Accept",
        "Experiment",
        "Success",
        "Integration",
        "Custom Text 10",
        "Custom Text 11",
      ];

      const trace = {
        x: xValues,
        y: yValues,
        mode: "lines+markers",
        marker: {
          size: 14,
          color: colors,
        },
        line: {
          color: "#16BFD6",
        },
        text: customTexts, // custom hover text
        hoverinfo: "text", // display only the custom text
      };

      Plotly.newPlot(chartRef.current, [trace], {
        yaxis: {
          zeroline: false,
          showticklabels: false, // hide y-axis labels
        },
        xaxis: {
          zeroline: false,
          showticklabels: false, // hide x-axis labels
        },
      });
    }
  }, []);

  return <div ref={chartRef} />;
};

export default CurveChart;
