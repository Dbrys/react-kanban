import React, { useCallback, useState, useMemo } from 'react';
import { Card, CardTitle } from './components/ui/card';
import TaskInput from './TaskInput';
import TaskCard from './TaskCard';

export type TaskStage = 1 | 2 | 3;

export type Task = {
  id: string;
  title: string;
  stage: TaskStage;
};

const stageMapping: Record<number, string> = {
  1: 'Todo',
  2: 'In Progress',
  3: 'Done',
};

const STAGES: TaskStage[] = [1, 2, 3];

function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = useCallback((taskTitle: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskTitle,
      stage: 1,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }, []);

  const handleUpdateTaskStage = useCallback(
    (taskId: string, newStage: TaskStage) => {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task.id === taskId ? { ...task, stage: newStage } : task
        );
        return updatedTasks;
      });
    },
    []
  );

  const handleDeleteTask = useCallback((taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  const tasksByStage = useMemo(() => {
    return tasks.reduce((acc, task) => {
      if (!acc[task.stage]) acc[task.stage] = [];
      acc[task.stage].push(task);
      return acc;
    }, {} as Record<TaskStage, Task[]>);
  }, [tasks]);

  return (
    <Card className="h-200 bg-[#4a7c59] overflow-hidden">
      <div className="flex flex-col items-center">
        <TaskInput onAddTask={handleAddTask} />
      </div>
      <div className="flex flex-row justify-around p-4 h-full">
        {STAGES.map((stage) => (
          <Card
            key={stage}
            className="flex flex-col items-center flex-1 overflow-hidden max-h-[620px] mx-2"
          >
            <CardTitle className="text-lg font-semibold mb-4 border-b-2 p-4 border-gray-200 w-1/2">
              {stageMapping[stage]}
            </CardTitle>
            <div className="space-y-4 overflow-y-auto pr-4">
              {tasksByStage[stage]?.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDeleteClicked={handleDeleteTask}
                  onTaskUpdate={handleUpdateTaskStage}
                />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}

export default KanbanBoard;
