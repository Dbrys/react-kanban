import React from 'react';
import { Card, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Task, TaskStage } from './KanbanBoard';
import { ArrowBigRight, ArrowBigLeft, Trash } from 'lucide-react';

interface KanbanCardProps {
  task: Task;
  onDeleteClicked: (taskId: string) => void;
  onTaskUpdate: (taskId: string, newStage: TaskStage) => void;
}

function TaskCard({ task, onDeleteClicked, onTaskUpdate }: KanbanCardProps) {
  return (
    <Card className="py-0 w-80 bg-white flex flex-row items-center border-[#4a7c59] relative">
      <div className="mr-4">
        <Button
          variant={'ghost'}
          className="cursor-pointer absolute left-2 top-2"
          onClick={() => onDeleteClicked(task.id)}
        >
          <Trash size={14} className="text-red-500 cursor-pointer" />
        </Button>
      </div>
      <div className="flex-1 flex justify-center ml-4">
        <CardDescription
          className={
            task.stage === 3
              ? 'line-through'
              : '' + 'text-sm font-semibold text-gray-800'
          }
        >
          {task.title}
        </CardDescription>
      </div>
      <div className="flex flex flex-col space-y-2 p-2">
        <Button
          disabled={task.stage === 1}
          variant={'ghost'}
          className="cursor-pointer"
          onClick={() => onTaskUpdate(task.id, (task.stage - 1) as TaskStage)}
        >
          <ArrowBigLeft size={20} className="cursor-pointer" />
        </Button>
        <Button
          disabled={task.stage === 3}
          variant={'ghost'}
          className="cursor-pointer"
          onClick={() => onTaskUpdate(task.id, (task.stage + 1) as TaskStage)}
        >
          <ArrowBigRight size={20} className="cursor-pointer" />
        </Button>
      </div>
    </Card>
  );
}

export default TaskCard;
