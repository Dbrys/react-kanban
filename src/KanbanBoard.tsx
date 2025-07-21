import React, { useState, useMemo } from 'react';
import { Card, CardTitle } from './components/ui/card';
import TaskInput from './TaskInput';
import TaskCard from './TaskCard';
import { AlignJustify } from 'lucide-react';

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

  const handleAddTask = (taskTitle: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskTitle,
      stage: 1,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleUpdateTaskStage = (taskId: string, newStage: TaskStage) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, stage: newStage } : task
      );
      return updatedTasks;
    });
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleUpdatingTaskTitle = (taskId: string, newTitle: string) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, title: newTitle };
        }
        return task;
      });
    });
  };

  const tasksByStage = useMemo(() => {
    return tasks.reduce((acc, task) => {
      if (!acc[task.stage]) acc[task.stage] = [];
      acc[task.stage].push(task);
      return acc;
    }, {} as Record<TaskStage, Task[]>);
  }, [tasks]);

  return (
    <Card className="h-9/10 bg-[#4a7c59] overflow-hidden">
      <div className="flex flex-col items-center">
        <TaskInput onAddTask={handleAddTask} />
      </div>
      <div className="flex flex-row justify-around p-4 h-full overflow-y-auto">
        {STAGES.map((stage) => (
          <Card
            key={stage}
            className="flex flex-col items-center flex-1 overflow-hidden mx-2 min-w-[250px] h-full"
          >
            <CardTitle className="text-lg font-semibold mb-4 border-b-2 p-4 border-gray-200 w-1/2">
              {stageMapping[stage]}
            </CardTitle>
            <div className="space-y-4 w-full overflow-y-auto pl-4 pr-4 h-full">
              {!tasksByStage[stage] || tasksByStage[stage]?.length === 0 ? (
                <div className="text-black flex flex-col gap-4 text-center justify-center align-center h-[90%] opacity-50">
                  <text className='text-lg font-semibold'>No tasks</text>
                  <AlignJustify size={64} className="mx-auto mb-2" />
                </div>
              ) : (
                tasksByStage[stage].map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDeleteClicked={handleDeleteTask}
                    onTaskUpdate={handleUpdateTaskStage}
                    onTitleChange={handleUpdatingTaskTitle}
                  />
                ))
              )}
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}

export default KanbanBoard;
