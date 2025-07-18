import React, { useState } from 'react';
import { Card } from './components/ui/card';
import TaskInput from './TaskInput';
import KanbanCard from './KanbanCard';

type TaskStage = 1 | 2 | 3;

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

function KanbanBoard() {
  const [tasks, setTasks] = useState<Record<TaskStage, Task[]>>({
    1: [],
    2: [],
    3: [],
  });

  const handleAddTask = (taskTitle: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskTitle,
      stage: 1,
    };
    setTasks((prevTasks) => {
      const updateTodoTask = {
        ...prevTasks,
        1: [...prevTasks[1], newTask],
      };
      return updateTodoTask;
    });
  };
  return (
    <Card className="h-200">
      <div className="flex flex-col items-center">
        <TaskInput onAddTask={handleAddTask} />
      </div>
      <div className="flex flex-row justify-around p-4 h-full">
        {Object.keys(stageMapping).map((stage) => (
          <div key={stage} className="flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4">
              {stageMapping[parseInt(stage)]}
            </h2>
            <div className="space-y-4">
              {tasks[parseInt(stage) as TaskStage] &&
                tasks[parseInt(stage) as TaskStage].map((task) => (
                  <KanbanCard key={task.id} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default KanbanBoard;
