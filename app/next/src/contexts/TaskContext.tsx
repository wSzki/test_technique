import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import Task from '@/classes/Task';

interface TaskContextType {
  task_array: Task[];
  task_component_array: React.ReactNode[];
  set_task_array: Dispatch<SetStateAction<Task[]>>;
  set_task_component_array: Dispatch<SetStateAction<React.ReactNode[]>>;
  popup: boolean;
  set_popup: Dispatch<SetStateAction<boolean>>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}



export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [task_array, set_task_array] = useState<Task[]>([]);
  const [task_component_array, set_task_component_array] = useState<React.ReactNode[]>([]);
  const [popup, set_popup] = useState(false);

  return (
    <TaskContext.Provider value={{ task_array, task_component_array, set_task_array, set_task_component_array, popup, set_popup }}>
      {children}
    </TaskContext.Provider>
  );
};

