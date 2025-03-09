export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export type Task = {
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