import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
// import "./App.css";

import React, { useEffect, useState } from "react";
import { BKS } from "./data";
import SunburstChartType from "./components/SunBustType";
import OnSeriesItemClick from "./components/Pie";
import MarginAndLabelPosition from "./components/Bar";
import valueFormatter from "./components/BarWithLeg";
import BarsDataset from "./components/BarWithLeg";
import SyncHighlight from "./components/BarPie";
import Test from "./components/test";
import SunLayer from "./components/sunLayer";
import StackOrderDemo from "./components/ProgressBar";
import  SelectAllTransferList from "./components/SelectTransferList";
import DragComponent from "./components/reacDrag/DragComponent";
import DragDropTaskManager from "./components/htmlDrag/Dnd";
import TaskInput from "./components/forms/TaskInputForm";

interface Node {
  name: string;
  value?: number;
  time?: number;
  children?: Node[];
}
const departments = [
  "Ekonomi",
  "Arbetsgivaransvar",
  "Ledning och uppföljning",
  "Arbetsmiljö",
  "Styrelsen",
];
function App() {
  const [filteredData, setFilteredData] = useState<Node>(BKS);
  const [department, setDepartment] = useState<string>("");

  const filterDataByDepartment = (department: string): Node => {
    // If no department is selected, return the full BKS data
    if (!department) return BKS;

    // Recursive function to filter nodes based on department
    const filterNode = (node: Node): Node => {
      // If the node is a month (second level), filter the departments (third level)
      if (node.children) {
        const filteredChildren = node.children
          .map((child) => {
            // If the child is a department (third level), filter by department name
            if (child.children) {
              const filteredDepartmentChildren = child.children.filter(
                (grandChild) => grandChild.name === department // Only keep the selected department
              );
              // Return the department node with filtered children
              return {
                ...child,
                children: filteredDepartmentChildren,
              };
            }
            return child;
          })
          .filter((child) => child.children && child.children.length > 0); // Only include nodes that have filtered departments

        return { ...node, children: filteredChildren };
      }

      return node;
    };

    // Start filtering from the root node
    return filterNode({ ...BKS });
  };

  useEffect(() => {
    const updatedData = filterDataByDepartment(department);
    console.log("Filtered Data:", updatedData); // Log to check if data is filtered correctly
    setFilteredData(updatedData);
  }, [department]);

  return (
    <>
    <Box>
        <Box>
            <TaskInput/>
        </Box>
     <Box 
           sx={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            marginTop: 10, // Adjust margin for spacing between dropdown and chart
          }}>
            <StackOrderDemo/>
        </Box>
     </Box>

        <Box 
           sx={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            marginTop: 10, // Adjust margin for spacing between dropdown and chart
            mb: 1
          }}>
           <DragDropTaskManager/>
        </Box>
      <Box
        sx={{
          position: "relative", // This will ensure the dropdown is positioned relative to the Box
          height: "100%", // Ensure the Box takes up the available height
          top: 60,
          left: 60,
        }}
      >
        <FormControl
          fullWidth
          sx={{ position: "absolute", top: 20,  width: 150, mb: 2 }}
        >
          <InputLabel>Välj Avdelning</InputLabel>
          <Select
            value={department}
            onChange={(e) => setDepartment(e.target.value as string)}
            label="Välj avdelning"
          >
            <MenuItem value="">Alla avdelningar</MenuItem>{" "}
            {/* Default to All */}
            {departments.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          marginTop:10, 
        
        }}
      >
        <SunburstChartType
          key={JSON.stringify(filteredData)}
          task={filteredData}
        />
      </Box>
      <Box
        sx={{
          display: "flex", // Use flexbox
          justifyContent: "space-around", // Space between the two charts
          alignItems: "center", // Align them vertically
          width: "100%", // Take full width
          
        }}
      >
        <Box
         sx={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            marginTop: 10, // Adjust margin for spacing between dropdown and chart
          }}>
          <OnSeriesItemClick />
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
             // Adjust margin for spacing between dropdown and chart
          }}
        >
          <BarsDataset />
        </Box> 
      </Box>
      <Box 
           sx={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            marginTop: 10, // Adjust margin for spacing between dropdown and chart
          }}>
            
        </Box>
       
        
        
    </>
  );
}

export default App;
