import React from 'react';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { useState } from 'react';

interface TaskInputProps {
  onAddTask: (task: string) => void;
}

function TaskInput({ onAddTask }: TaskInputProps) {
  const [taskInput, setTaskInput] = useState('');

  const handleAddTask = () => {
    if (taskInput.trim() === '') return;
    onAddTask(taskInput);
    setTaskInput('');
  };
  return (
    <div className="flex flex-row items-center space-x-4 p-4">
      <Input
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        className="w-80"
        placeholder="Add a new task..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddTask();
          }
        }}
      />
      <Button className="cursor-pointer" onClick={() => handleAddTask()}>
        Add Task
      </Button>
    </div>
  );
}

export default TaskInput;
