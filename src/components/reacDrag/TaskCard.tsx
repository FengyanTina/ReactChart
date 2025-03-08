import { useDraggable } from "@dnd-kit/core";
import { Task } from "./types";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

type TaskCardProps = {
  task: Task;
  handleTaskClick: (task: Task) => void;
};

export function TaskCard({ task,handleTaskClick }: TaskCardProps) {
    
  const { attributes, listeners, setNodeRef, transform,isDragging } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;
    
  return (
    <Box
      key={task.id}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={() =>handleTaskClick(task)} 
      sx={{
        cursor: "grab",
        borderRadius: "8px",
        backgroundColor: "#FFF8E1", // Card background color
        padding: 2, // equivalent to 16px (2 * 8px)
        boxShadow: "0px 1px 2px rgba(29, 25, 25, 0.1)",
        "&:hover": {
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#FFEB3B",
        },
        ...style,
        transition: "transform 0.1s ease-in-out", // Smooth transition for the transform effect
      }}
    >
      <Typography variant="h6" sx={{ color: "#333" }}>
        {task.title}
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 1, color: "#777" }}>
        {task.description}
      </Typography>
    </Box>
  );
}
