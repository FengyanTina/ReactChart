import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

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
    // Fixed colors for departments
    const departmentColors: Record<string, string> = {
      "Marketing Department": "#FF6F61",
      "R&D Department": "#6B5B95",
      "HR Department": "#88B04B",
      "Ekonomi": "#F7CAC9",
      "Arbetsgivaransvar": "#92A8D1",
      "Ledning och uppföljning": "#955251",
      "Arbetsmiljö": "#B565A7",
      "Styrelsen": "#009B77",
      "Department I": "#DD4124",
      "Department J": "#D65076",
      "Department K": "#45B8AC",
      "Department L": "#EFC050",
    };

    // Dynamic color palette
    const colorPalette = [
      "#FF6F61",
      "#6B5B95",
      "#88B04B",
      "#F7CAC9",
      "#92A8D1",
      "#955251",
      "#B565A7",
      "#DD4124",
      "#D65076",
      "#45B8AC",
      "#EFC050",
    ];

    const processNode = (
      node: Node,
      parent: string,
      depth: number,
      colorIndex: number
    ) => {
      const uniqueLabel = parent ? `${parent}-${node.name}` : node.name;
      labels.push(uniqueLabel);
      parents.push(parent);
      values.push(node.value ||node.children?.reduce((sum, child) => sum + (child.value || 0), 0) ||0);
      hoverText.push(node.name);
      times.push(node.time || 0);
      estimateTimes.push(node.estimateTime || 0);
      
      // **Assign Colors**
      let nodeColor = colorPalette[colorIndex % colorPalette.length]; // Default to dynamic color

      if (departmentColors[node.name]) {
        nodeColor = departmentColors[node.name]; // **Fix color for departments**
      }

      colors.push(nodeColor);

      if (node.children) {
        node.children.forEach(
          (child, index) =>
            processNode(child, uniqueLabel, depth + 1, colorIndex + index) // 传递当前节点的名称作为父级
        );
      }
    };

    processNode(task, parent, 0, 0);

    return { labels, parents, values, hoverText, colors, times, estimateTimes };
  };

 
  const [chartData] = useState<ChartData>(transformData(task));

//   const handleSelection = (event: any) => {
//     // Log the event to inspect the data
//     console.log("Selection event: ", event);
    
//     // Extract the label of the clicked section
//     const clickedLabel = event.points[0].label;
    
//     // Log the clicked label to ensure it's correct
//     console.log("Clicked Label: ", clickedLabel);

//     // Find the index of the clicked label
//     const clickedIndex = chartData.labels.indexOf(clickedLabel);

//     if (clickedIndex !== -1) {
//       const selected = {
//         label: chartData.labels[clickedIndex],
//         value: chartData.values[clickedIndex],
//         hoverText: chartData.hoverText[clickedIndex],
//         time: chartData.times[clickedIndex],
//         estimateTime: chartData.estimateTimes[clickedIndex],
//       };

//       // Log the selected node data to ensure it's being set correctly
//       console.log("Selected Node Data: ", selected);

//       // Set the selected node to update the text section
//       setSelectedNode(selected);
//     } else {
//       console.log("Label not found in chartData.labels");
//     }
//   };




//   useEffect(() => {
    
//     const handlePlotlyClick = (event: any) => {
//       // Extract clicked section information from the event object
//       const clickedLabel = event.points[0].label;
//       const clickedIndex = chartData.labels.indexOf(clickedLabel);

//       if (clickedIndex !== -1) {
//         // Create an object with selected node information to update the text display
//         const selected = {
//           label: chartData.labels[clickedIndex],
//           value: chartData.values[clickedIndex],
//           hoverText: chartData.hoverText[clickedIndex],
//           time: chartData.times[clickedIndex],
//           estimateTime: chartData.estimateTimes[clickedIndex],
//         };
// console.log("clicked data:" ,{selected})
//         // Set the selected node data for display beside the chart
//         setSelectedNode(selected);
//       }
//     };

//     // Get the plot element by its ID
//     const plotElement = document.getElementById('sunburst-plot');

//     // Ensure the plot element exists before attaching the event listener
//     if (plotElement) {
//       // Attach the 'plotly_click' event listener
//       plotElement.addEventListener('plotly_click', handlePlotlyClick);
//     }

//     // Cleanup the event listener on component unmount
//     return () => {
//       if (plotElement) {
//         plotElement.removeEventListener('plotly_click', handlePlotlyClick);
//       }
//     };
  
//   }, [chartData]);


//   const handlePlotlyClick = (event: any) => {
//     // Check if the event has points (i.e., a section was clicked)
//     if (event && event.points && event.points.length > 0) {
//       const clickedLabel = event.points[0].label;
//       const clickedIndex = chartData.labels.indexOf(clickedLabel);

//       if (clickedIndex !== -1) {
//         const selected = {
//           label: chartData.labels[clickedIndex],
//           value: chartData.values[clickedIndex],
//           hoverText: chartData.hoverText[clickedIndex],
//           time: chartData.times[clickedIndex],
//           estimateTime: chartData.estimateTimes[clickedIndex],
//         };

//         console.log('Clicked data:', selected); // For debugging
//         setSelectedNode(selected);  // Update the selected node data
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
            domain: { x: [0, 1], y: [0, 1] },
            customdata: chartData.labels.map((_, index) => [
                chartData.times[index], // Finished Time
                chartData.estimateTimes[index], // Estimated Time
                 // Original Task Time
              ]), // Pass times data to customdata
            hovertemplate:
              "%{text}<br>Beräknad tid: %{customdata[1]} timmar<br> Färdigställningstid: %{customdata[0]} timmar<extra></extra>", // Removes default trace info
            marker: {
              colors: chartData.colors,
            },
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
        onSelected={() => setSelectedNode(chartData)}
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
