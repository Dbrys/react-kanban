import React, { useState, useEffect } from 'react';
import { Card, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Task, TaskStage } from './KanbanBoard';
import { ArrowBigRight, ArrowBigLeft, Trash, Check } from 'lucide-react';

interface KanbanCardProps {
  task: Task;
  onDeleteClicked: (taskId: string) => void;
  onTaskUpdate: (taskId: string, newStage: TaskStage) => void;
  onTitleChange: (taskId: string, newTitle: string) => void;
}

function TaskCard({
  task,
  onDeleteClicked,
  onTaskUpdate,
  onTitleChange,
}: KanbanCardProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [taskDescription, setTaskDescription] = useState<string>(task.title);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  }, [isEditing]);
  return (
    <Card className="py-0 w-80 bg-white gap-4 flex flex-row items-stretch border-[#4a7c59] relative">
      {!isEditing && (
        <div className="mr-4">
          <Button
            variant={'ghost'}
            className="cursor-pointer absolute left-2 top-2"
            onClick={() => onDeleteClicked(task.id)}
          >
            <Trash size={14} className="text-red-500 cursor-pointer" />
          </Button>
        </div>
      )}
      <div className="flex-1 flex p-2 justify-center items-center ml-4">
        <CardDescription
          className={
            task.stage === 3
              ? 'line-through'
              : '' + 'text-sm font-semibold text-gray-800 w-full'
          }
          onDoubleClick={() => {
            onTitleChange(task.id, taskDescription.trim());
            setIsEditing((prev) => !prev);
          }}
        >
          {isEditing ? (
            <div className="flex flex-row items-center justify-between h-full">
              <textarea
                autoFocus={isEditing}
                ref={textareaRef}
                value={taskDescription}
                onChange={(e) => {
                  setTaskDescription(e.target.value);
                }}
                className="flex-1 h-auto mr-2 p-2 rounded-md"
              />
              <Button
                variant="ghost"
                className="cursor-pointer"
                onClick={() => {
                  onTitleChange(task.id, taskDescription.trim());
                  setIsEditing(false);
                }}
              >
                <Check size={20} className="cursor-pointer" />
              </Button>
            </div>
          ) : (
            <span>{taskDescription}</span>
          )}
        </CardDescription>
      </div>
      {!isEditing && (
        <div className="flex flex-col justify-between p-2">
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
      )}
    </Card>
  );
}

export default TaskCard;
