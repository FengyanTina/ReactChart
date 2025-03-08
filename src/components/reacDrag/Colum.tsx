import { useDroppable } from '@dnd-kit/core';
import { TaskCard } from './TaskCard';
import { Column as ColumnType, Task } from './types';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';


type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
  onTaskClick: (task: Task,) => void;
};

export function Column({ column, tasks, onTaskClick}: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  const columnColors = {
    TODO: '#A6C8FF', // Pastel Blue
    IN_PROGRESS: '#A8D08D', // Soft Green
    DONE: '#D3D3D3', // Soft Gray
  };
  return (
    <Box
      ref={setNodeRef}
      sx={{
        width: '15rem', // equivalent to w-80 (320px)
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '8px',
        backgroundColor: columnColors[column.id],
        padding: 2, // equivalent to p-4 (16px)
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#333' }}>
        {column.title}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          gap: 2, // equivalent to gap-4 (16px)
        }}
      >
        {tasks.map((task) => (
          <TaskCard  key={task.id} task={task} handleTaskClick={onTaskClick}/>
        ))}
      </Box>
    </Box>
);
  
}