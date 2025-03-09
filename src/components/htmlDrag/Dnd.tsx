import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { Box, Typography } from "@mui/material";
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';




// const INITIAL_TASKS: Task[] = [
//   {
//     id: "1",
//     title: "Research Project",
//     time:"2025-03-23",
//     description: "Gather requirements and create initial documentation",
//     status: "TODO",
//   },
//   {
//     id: "2",
//     title: "Design System",
//     time:"2025-03-19",
//     description: "Create component library and design tokens",
//     status: "TODO",
//   },
//   {
//     id: "3",
//     title: "API Integration",
//     time:"2025-03-20",
//     description: "Implement REST API endpoints",
//     status: "IN_PROGRESS",
//   },
//   {
//     id: "4",
//     title: "Testing",
//     time:"2025-03-20",
//     description: "Write unit tests for core functionality",
//     status: "DONE",
//   },
//   {
//     id: "5",
//     title: "Meeting",
//     time:"2025-03-25",
//     description: "Write unit tests for core functionality",
//     status: "TODO",
//   },
// ];

type Task = {
  id: string;
  title: string;
  time?:string;
  detail?:string;
  status: "planning" | "doing" | "complete";
};

// Sample tasks
const initialTasks: Task[] = [
  { id: "1", title: "Meeting with Anna", time:"2025-03-23", detail: "Need to talk",status: "planning" },
  { id: "2", title: "Teaching",time:"2025-03-17", detail: "Need to talk", status: "planning" },
  { id: "3", title: "Task 3", time:"2025-03-26", detail: "Need to talk",status: "planning" },
  { id: "4", title: "Task 4", time:"2025-03-215", detail: "Need to talk",status: "doing" },
  { id: "5", title: "Task 5",time:"2025-03-18", detail: "Need to talk", status: "doing" },
  { id: "6", title: "Task 6", time:"2025-03-09", detail: "Need to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talkNeed to talk",status: "complete" },
  { id: "7", title: "Task 7", time:"2025-03-07", detail: "Need to talk",status: "complete" },
];
const columnColors: Record<Task['status'], string> = {
    planning: '#A6C8FF', // Pastel Blue
    doing: '#A8D08D', // Soft Green
    complete: '#D3D3D3', // Soft Gray
  };
  const taskColors: Record<Task['status'], string> = {
    planning: '#8BB3FF', // Slightly darker blue
    doing: '#92C57B', // Slightly darker green
    complete: '#BDBDBD', // Slightly darker gray
  };  
export default function DragDropTaskManager() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [draggingItem, setDraggingItem] = useState<Task | null>(null);
const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  // Handle drag start
  const handleDragStart = (event: React.DragEvent, task: Task) => {
    event.dataTransfer.setData("taskId", task.id);
  };
  
  // Handle drag over (allows dropping)
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    
  };

  // Handle drop
  const handleDrop = (newStatus: Task["status"], event: React.DragEvent) => {
    const taskId = event.dataTransfer.getData("taskId");
  
    if (!taskId) return;
  
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };
 function handleTaskClick(task: Task) {
    setSelectedTask(task);
  }
  
//   const handleDragStart = (event: React.DragEvent, task: Task) => {
//     setDraggingItem(task);
//     event.dataTransfer.setData("taskId", task.id);
//   };

//   // Handle drag over (allows dropping)
//   const handleDragOver = (event: React.DragEvent) => {
//     event.preventDefault();
//   };

//   // Handle drop
//   const handleDrop = (newStatus: Task["status"]) => {
//     if (draggingItem && draggingItem.status !== newStatus) {
//       setTasks((prevTasks) =>
//         prevTasks.map((task) =>
//           task.id === draggingItem.id ? { ...task, status: newStatus } : task
//         )
//       );
//     }
//     setDraggingItem(null);
//   };
const [maxHeight, setMaxHeight] = useState(300);

  useEffect(() => {
    const taskCounts = { planning: 0, doing: 0, complete: 0 };
    tasks.forEach((task) => taskCounts[task.status]++);
    const newMaxHeight = Math.min(500, Math.max(350, taskCounts.planning * 50, taskCounts.doing * 50, taskCounts.complete * 50));
    setMaxHeight(newMaxHeight);
  }, [tasks]);
  // Render each task list section
  const TaskList = ({
    title,
    status,
  }: {
    title: string;
    status: Task["status"];
  }) => (
   
    <Card
      sx={{
        width: 250,
        height: maxHeight,
        p: 1,
        bgcolor: columnColors[status],
        boxShadow: 3,
        borderRadius: 3,
        display: 'flex', flexDirection: 'column' 
      }}
      onDragOver={handleDragOver}
      onDrop={(event) => handleDrop(status, event)}
      
    >
      <CardHeader
        title={title}
        sx={{
          textAlign: "start",
          
          fontWeight: "bold",
          py: 1,
          borderRadius: "4px",
        }}
      />
      <Divider />
      <List sx={{ flexGrow: 1, maxHeight: maxHeight - 50, overflowY: "auto", p: 1 }}>
        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <ListItem
              key={task.id}
              className="draggable-task"
              draggable
              onDragStart={(event) => handleDragStart(event, task)}
              onClick={() =>handleTaskClick(task)} 
              sx={{
                backgroundColor: draggingItem?.id === task.id ? '#d1e7ff' : taskColors[task.status],
                boxShadow: draggingItem?.id === task.id ? "0px 2px 10px rgba(0,0,0,0.2)" : "none",
                p: 1,
                my: 1,
                borderRadius: "8px",
                cursor: "grab",
                transition: "background 0.2s, transform 0.1s",
                ":hover": { backgroundColor: "#f1f1f1" },
                display: "flex",
                alignItems: "start",
                flexDirection:"column"
              }}
            >
              <ListItemText primary={task.title} sx={{ fontSize: "2.5rem", fontWeight: "bold" }} />
              <ListItemText primary={task.time} sx={{ fontSize: "0.5rem", fontWeight: "bold" }} />
            </ListItem>
          ))}
      </List>
    </Card>
    
  );

  return (
    <Grid container spacing={3} sx={{ justifyContent: "center", alignItems: "start", mt: 3 }}>
      <Grid >
        <TaskList title="Planning" status="planning" />
      </Grid>
      <Grid >
        <TaskList title="Doing" status="doing" />
      </Grid>
      <Grid >
        <TaskList title="Complete" status="complete" />
      </Grid>

      <Grid >
        <Box sx={{ width: 350, bgcolor: '#fff',  }}>
         
          {selectedTask ? (
            <Box>
              <Typography variant='body1' sx={{ fontWeight: 'bold', mb: 0.5 }}>
                {selectedTask.title}
              </Typography>
              <Typography variant='body1' sx={{ fontWeight: 'bold', mb: 0.5 }}>
                {selectedTask.time}
              </Typography>
              
              <Divider sx={{ mb: 2 }} />
              <Typography variant='body1' sx={{ fontWeight: 'bold', mb: 1,maxHeight: maxHeight - 70, overflowY: "auto", }}>
                {selectedTask.detail}
              </Typography>
            </Box>
          ) : (
            <Typography variant='body1' sx={{ color: '#555' }}>
              Click on a task to see details
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
    
  );
}
