import React, { useState } from "react";
import Plot from "react-plotly.js";
import { Box, Container, Typography } from "@mui/material";

// 定义节点类型
interface Node {
    name: string;
    value?: number;
    time?: number;
    estimateTime?: number;  
    status?: "pending" | "in-progress" | "completed"; 
    priority?: number;
    children?: Node[];
  }

// 定义转换后的数据格式
interface ChartData {
  labels: string[];
  parents: string[];
  values: number[];
  hoverText: string[];
  colors: string[]; 
  times: number[];
  estimateTimes: number[];
}


interface SunburstChartTypeProps {
  task: Node; 
}

const SunburstChartType: React.FC<SunburstChartTypeProps> = ({ task }) => {
    console.log("SunburstChartType received new data:", task)
    const [selectedNode, setSelectedNode] = useState<any>();
  const transformData = (
    task: Node,
    parent: string = "",
  ): ChartData => {
    const labels: string[] = [];
    const parents: string[] = [];
    const values: number[] = [];
    const hoverText: string[] = [];
    const colors: string[] = [];
    const times: number[] = [];
    const estimateTimes: number[] = [];
    

    const processNode = (
      node: Node,
      parent: string,
      
    ) => {
      const uniqueLabel = parent ? `${parent}-${node.name}` : node.name;
      labels.push(uniqueLabel);
      parents.push(parent);
      values.push(node.value ||node.children?.reduce((sum, child) => sum + (child.value || 0), 0) ||0);
      hoverText.push(node.name);
      times.push(node.time || 0);
      estimateTimes.push(node.estimateTime || 0);

      if (node.children) {
        node.children.forEach((child) => processNode(child, uniqueLabel));
      }
    };

    processNode(task, parent, );

    return { labels, parents, values, hoverText, colors, times, estimateTimes };
  };
  const [chartData] = useState<ChartData>(transformData(task));  

  //   // 处理点击事件
//   const handleClick = (event: Readonly<Plotly.PlotMouseEvent>) => {
//     const { points } = event;
//     if (points && points[0]) {
//       const clickedPoint = points[0] as SunburstDatum; // 类型断言
//       const clickedLabel = clickedPoint.label;

//       // 查找点击的节点
//       const findNode = (node: Node, target: string): Node | null => {
//         if (node.name === target) return node;
//         if (node.children) {
//           for (let child of node.children) {
//             const result = findNode(child, target);
//             if (result) return result;
//           }
//         }
//         return null;
//       };

//       const clickedNode = findNode(data, clickedLabel);
//       if (clickedNode && clickedNode.children) {
//         // 更新图表数据
//         setChartData(transformData(clickedNode, clickedNode.name));
//       }
//     }
//   };

  return (
    <Container>
      <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center", }} variant="h4" gutterBottom>
      Sammanfattning av uppgifter
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px" }}>
      <Plot
        data={[
          {
            type: "sunburst",
            labels: chartData.labels,
            parents: chartData.parents,
            values: chartData.values,
            text: chartData.hoverText,
           
            customdata: chartData.labels.map((_, index) => [
                chartData.times[index], // Finished Time
                chartData.estimateTimes[index], // Estimated Time          
              ]), 
            hovertemplate:
              "%{text}<br>Beräknad tid: %{customdata[1]} timmar<br> Färdigställningstid: %{customdata[0]} timmar<extra></extra>", // Removes default trace info
              marker: { colors: ["#FF6F61", "#6B5B95", "#88B04B", "#F7CAC9", "#92A8D1", "#955251","#B565A7"] },
    
            branchvalues: "total",
            textfont: {
              size: 10, // Default text size
              color: "white",
            },
            textinfo: "text", // Show both label and value
            
          },
        ]}
        layout={{
          title: "",
          autosize: true,
          margin: { l: 10, r: 0, b: 10, t: 40 },
          width: 500,  // Increase width
          height:500,
          hoverlabel: {
            bordercolor: "transparent",
            font: {
              size: 10,
              color: "#ffffff",
            },
          },
        }}
        
      />
   
     {/* Table beside the Sunburst Chart */}
     <Box style={{
            marginLeft: "20px",
            textAlign: "left",
            minHeight: "200px", // Minimum height to keep it in line
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "10px",
            overflow: "auto", // Allow growing with content
          }}>
          {selectedNode ? (
            <>
             
              <Typography variant="body1">{selectedNode.label}</Typography>
              <Typography variant="body1"><strong>Färdigställningstid(h):</strong> {selectedNode.time}</Typography>
              <Typography variant="body1"><strong>Beräknad tid (h):</strong> {selectedNode.estimateTime}</Typography>
            </>
          ) : (
            <Typography variant="body1">Click on a section of the chart to see details here.</Typography>
          )}
        </Box>
      </Box>
      </Container>
  );
};

export default SunburstChartType;
