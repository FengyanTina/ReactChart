import React, { useState } from "react";
import Plot from "react-plotly.js";
import { Box, Container, Typography } from "@mui/material";
interface SunburstDatum extends Plotly.PlotDatum {
    label: string;
    value: number;
    parent: string;
    children?: Node[];
  }
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
  const [chartData, setChartData] = useState<ChartData>(transformData(task));
  const [selectedNodeInfo, setSelectedNodeInfo] = useState<{ node: Node, parent: Node | null } | null>(null); // Track clicked node and its parent
 




//   const findNodeDetails = (
//     node: Node,
//     target: string,
//     parent: Node | null = null
// ): { node: Node, parent: Node | null, children: Node[] } | null => {
//     if (!node || !node.name) return null;

//     console.log("Checking node:", node.name, "Target:", target);

//     // Check if the current node's label matches the clicked label (using split logic)
//     const nodeNameWithoutPrefix = node.name.split("-").pop();
//     const targetWithoutPrefix = target.split("-").pop();

//     if (nodeNameWithoutPrefix === targetWithoutPrefix) {
//         console.log("Node found:", node);
//         return { node, parent, children: node.children ?? [] }; // Ensure children are included
//     }

//     // If not found, recursively search children
//     if (node.children && node.children.length > 0) {
//         for (let child of node.children) {
//             const result = findNodeDetails(child, target, node);
//             if (result) {
//                 console.log("Parent found:", parent);
//                 return result; // Return the result if found
//             }
//         }
//     }

//     // Return null if node is not found in this branch
//     return null;
// };
const findNodeDetails = (
    node: Node,
    target: string,
    parent: Node | null = null
): { node: Node, parent: Node | null, children: Node[] } | null => {
    if (!node || !node.name) return null;

    // Normalize node name and target for comparison
    const normalize = (str: string) => str.trim().toLowerCase(); // Remove spaces and convert to lowercase

    console.log("Checking node:", node.name, "Target:", target);

    if (normalize(node.name) === normalize(target)) {
        console.log("Node found:", node);
        return { node, parent, children: node.children ?? [] };
    }

    // If not found, recursively search children
    if (node.children && node.children.length > 0) {
        for (let child of node.children) {
            const result = findNodeDetails(child, target, node);
            if (result) {
                console.log("Parent found:", parent);
                return result;
            }
        }
    }

    // Return null if node is not found in this branch
    return null;
};


const handleClick = (event: Readonly<Plotly.PlotMouseEvent>) => {
    console.log("Click event triggered");
    const { points } = event;
    if (points && points[0]) {
        console.log("Clicked point:", points[0]);
        const clickedPoint = points[0] as SunburstDatum;
        const clickedLabel = clickedPoint.label.trim(); // Ensure label is trimmed
        console.log("Clicked label:", clickedLabel);

        // Find the node details starting from the root (task)
        const result = findNodeDetails(task, clickedLabel);

        if (result) {
            setSelectedNodeInfo(result);
            console.log("Selected node info:", result);
        } else {
            console.log("No matching node found.");
        }
    }
};
// Handle Click
// const handleClick = (event: Readonly<Plotly.PlotMouseEvent>) => {
//     console.log("Click event triggered");
//     const { points } = event;
//     if (points && points[0]) {
//         console.log("Clicked point:", points[0]);
//         const clickedPoint = points[0] as SunburstDatum;
//         const clickedLabel = clickedPoint.label.trim(); // Ensure label is trimmed
//         console.log("Clicked label:", clickedLabel);

//         // Find the node details starting from the root (task)
//         const result = findNodeDetails(task, clickedLabel);

//         if (result) {
//             setSelectedNodeInfo(result); // Update state with the found node details
//             console.log("Selected node info:", result);
//         } else {
//             console.log("No matching node found."); // Debugging information
//         }
//     }
// };

    
    // const handleClick = (event: Readonly<Plotly.PlotMouseEvent>) => {
    //     const { points } = event;
    //     if (points && points[0]) {
    //       const clickedPoint = points[0] as SunburstDatum;
    //       const clickedLabel = clickedPoint.label;
      
    //       // If the clicked label is the root (year), reset to the full dataset
    //       if (clickedLabel === task.name) {
    //         setChartData(transformData(task)); // Reset to full chart
    //         return;
    //       }
      
    //       // Function to find the clicked node
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
      
    //       const clickedNode = findNode(task, clickedLabel);
    //       if (clickedNode && clickedNode.children) {
    //         setChartData(transformData(clickedNode, clickedNode.name)); // Zoom into the selected section
    //       }
    //     }
    //   };
      
    const renderChildren = (children: Node[]) => {
        return children.map((child: Node, index: number) => (
          <Box key={index} sx={{ marginLeft: 2 }}>
            <Typography variant="body1">
              <strong>{child.name} ({child.value ?? "N/A"}h)</strong>
            </Typography>
      
            {/* Render grandchildren recursively */}
            {child.children && child.children.length > 0 && (
              <Box sx={{ marginLeft: 2 }}>
                {renderChildren(child.children)} {/* Call recursively for deeper layers */}
              </Box>
            )}
          </Box>
        ));
      };
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
              marker: { colors: ["#FF6F61", "#6B5B95", ] },
    
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
        onClick={handleClick}
      />
   
     {/* Table beside the Sunburst Chart */}
     <Box  key={selectedNodeInfo ? selectedNodeInfo.node.name : "default"} style={{
            marginLeft: "20px",
            textAlign: "left",
            minHeight: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "10px",
            overflow: "auto",
          }}>
            
        {selectedNodeInfo ? (
          <>
           {selectedNodeInfo.parent && (
              <>
                <Typography variant="body1" sx={{ marginTop: 2 }}><strong>Föräldernod:</strong> {selectedNodeInfo.parent.name}</Typography>
                {/* <Typography variant="body1"><strong>Värde:</strong> {selectedNodeInfo.parent.value ?? "N/A"}</Typography>
                <Typography variant="body1"><strong>Färdigställningstid (h):</strong> {selectedNodeInfo.parent.time ?? "N/A"}</Typography>
                <Typography variant="body1"><strong>Beräknad tid (h):</strong> {selectedNodeInfo.parent.estimateTime ?? "N/A"}</Typography>
                <Typography variant="body1"><strong>Status:</strong> {selectedNodeInfo.parent.status ?? "N/A"}</Typography>
                <Typography variant="body1"><strong>Prioritet:</strong> {selectedNodeInfo.parent.priority ?? "N/A"}</Typography> */}
              </>
            )}
            <Typography variant="body1"><strong>Nod:</strong> {selectedNodeInfo.node.name}</Typography>
            {/* <Typography variant="body1"><strong>Värde:</strong> {selectedNodeInfo.node.value ?? "N/A"}</Typography>
            <Typography variant="body1"><strong>Färdigställningstid (h):</strong> {selectedNodeInfo.node.time ?? "N/A"}</Typography>
            <Typography variant="body1"><strong>Beräknad tid (h):</strong> {selectedNodeInfo.node.estimateTime ?? "N/A"}</Typography>
            <Typography variant="body1"><strong>Status:</strong> {selectedNodeInfo.node.status ?? "N/A"}</Typography>
            <Typography variant="body1"><strong>Prioritet:</strong> {selectedNodeInfo.node.priority ?? "N/A"}</Typography> */}

{selectedNodeInfo.node.children && selectedNodeInfo.node.children.length > 0 ? (
    <>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
            <strong>Category:</strong>
        </Typography>
        {selectedNodeInfo.node.children.map((child: Node, index: number) => (
            <Box key={index} sx={{ marginLeft: 2 }}>
                <Typography variant="body1">
                    <strong>{child.name}({child.value ?? "N/A"}h)</strong> 
                </Typography>

                {/* Show grandchildren if they exist */}
                {child.children && child.children.length > 0 && (
                    <Box sx={{ marginLeft: 2 }}>
                        {/* <Typography variant="body1" sx={{ marginTop: 1 }}>
                            <strong>Sub-category:</strong>
                        </Typography> */}
                        {child.children.map((grandchild: Node, grandIndex: number) => (
                            <Typography variant="body1" key={grandIndex}>
                                <strong>{grandchild.name}({grandchild.value ?? "N/A"}h)</strong> 
                            </Typography>
                        ))}
                    </Box>
                )}
            </Box>
        ))}
    </>
           
        ) : (
            <Typography variant="body1">Klicka på en sektion för att se detaljer.</Typography>
          )}
        </>
      ) : (
        <Typography variant="body1">Klicka på en sektion för att se detaljer.</Typography>
      )}
        </Box>
        
      </Box>
      </Container>
  );
};

export default SunburstChartType;
