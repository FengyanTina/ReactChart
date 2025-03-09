import { useState } from "react";
import type { Task, Column as ColumnType } from "./types";

import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Column } from "./Colum";
import { Box, Divider, Typography } from "@mui/material";

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Research Project",
    time:"2025-03-23",
    description: "Gather requirements and create initial documentation",
    status: "TODO",
  },
  {
    id: "2",
    title: "Design System",
    time:"2025-03-19",
    description: "Create component library and design tokens",
    status: "TODO",
  },
  {
    id: "3",
    title: "API Integration",
    time:"2025-03-20",
    description: "Implement REST API endpoints",
    status: "IN_PROGRESS",
  },
  {
    id: "4",
    title: "Testing",
    time:"2025-03-20",
    description: "Write unit tests for core functionality",
    status: "DONE",
  },
  {
    id: "5",
    title: "Meeting",
    time:"2025-03-25",
    description: "Write unit tests for core functionality",
    status: "TODO",
  },
];

export default function DragComponent() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 鼠标移动超过 5px 才触发拖拽
      },
    })
  );
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
  }
  function handleTaskClick(task: Task) {
    setSelectedTask(task);
  }
  return (
    <Box sx={{ padding: 4 }}>
      {/* Week Plan Title */}
      <Typography variant="h5" sx={{ color: "#555", marginBottom: 2 }}>
        Week Plan
      </Typography>
  
  
      {/* Flex container for the drag-and-drop columns and task detail panel */}
      <Box sx={{ display: "flex", gap: 4 }}>
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
              onTaskClick={handleTaskClick}
            />
          ))}
        </DndContext>
  
        {/* Task Detail Panel on the Right Side */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "350px", // Same width as the task detail panel
           
            
            padding: 2,
          }}
        >
              <Typography variant="body1" sx={{ color: "#555", marginBottom: 2 }}>
          Task Detail
        </Typography>
          {/* Task Detail Content */}
          <Box>
          {selectedTask ? (
            <Box>
              <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                {selectedTask.title}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                {selectedTask.time}
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Typography variant="body2" sx={{ color: "#555" }}>
                {selectedTask.description}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body1" sx={{ color: "#555" }}>
              Click on a task to see details
            </Typography>
          )}
         </Box>
      </Box>
    </Box>
  </Box>
  );
}
