import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type Task1 = {
  id: string;
  status: TaskStatus;
  title: string;
  time?:string
  description: string;
};

export type Column = {
  id: TaskStatus;
  title: string;
};
const COLUMNS: Column[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

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
  status: "planning" | "doing" | "complete";
};

// Sample tasks
const initialTasks: Task[] = [
  { id: "1", title: "Task 1", status: "planning" },
  { id: "2", title: "Task 2", status: "planning" },
  { id: "3", title: "Task 3", status: "planning" },
  { id: "4", title: "Task 4", status: "doing" },
  { id: "5", title: "Task 5", status: "doing" },
  { id: "6", title: "Task 6", status: "complete" },
  { id: "7", title: "Task 7", status: "complete" },
];

export default function DragDropTaskManager() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [draggingItem, setDraggingItem] = useState<Task | null>(null);

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
        minHeight: 300,
        p: 1,
        bgcolor: "#f8f9fa",
        boxShadow: 2,
        borderRadius: 2,
      }}
      onDragOver={handleDragOver}
      onDrop={(event) => handleDrop(status, event)}
    >
      <CardHeader
        title={title}
        sx={{
          textAlign: "center",
          bgcolor: "#ddd",
          fontWeight: "bold",
          py: 1,
          borderRadius: "4px",
        }}
      />
      <Divider />
      <List sx={{ minHeight: 250, overflowY: "auto", p: 1 }}>
        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <ListItem
              key={task.id}
              className="draggable-task"
              draggable
              onDragStart={(event) => handleDragStart(event, task)}
              sx={{
                backgroundColor: draggingItem?.id === task.id ? "#d1e7ff" : "#ffffff",
                boxShadow: draggingItem?.id === task.id ? "0px 2px 10px rgba(0,0,0,0.2)" : "none",
                p: 1.5,
                my: 0.5,
                borderRadius: "8px",
                cursor: "grab",
                transition: "background 0.2s, transform 0.1s",
                ":hover": { backgroundColor: "#f1f1f1" },
                display: "flex",
                alignItems: "center",
              }}
            >
              <ListItemText primary={task.title} sx={{ fontSize: "0.9rem", fontWeight: "bold" }} />
            </ListItem>
          ))}
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} sx={{ justifyContent: "center", alignItems: "start", mt: 3 }}>
      <Grid >
        <TaskList title="Planning" status="planning" />
      </Grid>
      <Grid >
        <TaskList title="Doing" status="doing" />
      </Grid>
      <Grid >
        <TaskList title="Complete" status="complete" />
      </Grid>
    </Grid>
  );
}
