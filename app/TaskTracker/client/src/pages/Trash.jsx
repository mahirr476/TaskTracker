import React, { useState } from 'react';
import { TrashedTasks as tasks, users } from "../assets/data"; // Make sure this import is correctly configured to get deleted tasks
import Title from "../components/Title";
import Button from "../components/Button";
import EnhancedTable from '../components/task/Table'; // Ensure path is correct
import ConfirmatioDialog from "../components/Dialogs";

const Trash = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [actionType, setActionType] = useState('');

  const handleActionClick = (type, task) => {
    setSelectedTask(task);
    setActionType(type);
    setOpenDialog(true);
  };

  const deleteRestoreHandler = () => {
    // Implement the function to delete or restore based on actionType and selectedTask
    console.log(`Action: ${actionType}, Task ID: ${selectedTask?._id}`);
    setOpenDialog(false);
  };

  return (
    <>
      <div className='w-full md:px-1 px-0 mb-6'>
        <div className='flex items-center justify-between mb-4'>
          <Title title='Trashed Tasks' />
          <div className="flex gap-2">
          <Button
            onClick={() => handleActionClick('restoreAll')}
            label='Restore All'
            className='text-white rounded bg-green-500 hover:bg-green-600'
          />
            <Button
            onClick={() => handleActionClick('deleteAll')}
            label='Delete All'
            className='text-white rounded bg-red-500 hover:bg-red-600'
          />
          </div>
        </div>
        <EnhancedTable
          tasks={tasks}
          users={users}

          showSearch={true}
          showStageFilter={true}
          visibleColumns={['progress','title', 'priority', 'team', 'createdAt', 'actions', "admin"]}
          enableActions={true}
          onRestore={(task) => handleActionClick('restore', task)}
          onDelete={(task) => handleActionClick('delete', task)} 
        />
      </div>

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onConfirm={deleteRestoreHandler}
        title={`Confirm ${actionType}`}
        message={`Are you sure you want to ${actionType} this task?`}
      />
    </>
  );
};

export default Trash;
