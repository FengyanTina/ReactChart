import React from "react";
import Plot from "react-plotly.js";

const SunLayer: React.FC = () => {
  return (
    <Plot
    data={[
      {
        type: "sunburst",
        labels: [
          "January", "Week 1", "Project A", "Gym",
          "Week 2", "Report",
          "February", "Week 5", "Vacation Planning"
        ],
        parents: [
          "", "January", "Week 1", "Week 1",
          "January", "Week 2",
          "", "February", "Week 5"
        ],
        values: [10, 5, 2, 3, 5, 5, 8, 8, 8],
        branchvalues: "total",
        marker: {
          line: { width: 2 },
          colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"]
        },
        textinfo: "label", // Hide default labels inside the chart
        textposition: "outside",
      },
    ]}
    layout={{
      title: "Task Planner",
      height: 600,
      width: 600,
      margin: { l: 20, r: 20, b: 20, t: 50 },
      annotations: [
        { x: 0, y: 1.2, text: "January", showarrow: false, font: { size: 14 } },
        { x: 0, y: -1.2, text: "February", showarrow: false, font: { size: 14 } },
        { x: 1.2, y: 0, text: "Week 1", showarrow: false, font: { size: 12 } },
        { x: -1.2, y: 0, text: "Week 5", showarrow: false, font: { size: 12 } },
      ],
    }}
    config={{ responsive: true }}
  />
  );
};

export default SunLayer;
