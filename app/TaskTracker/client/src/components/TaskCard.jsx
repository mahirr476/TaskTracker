import { MdAttachFile, MdReadMore } from "react-icons/md";
import clsx from "clsx";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BGS, TASK_TYPE, formatDate } from "../utils";
import TaskDialog from "./task/TaskDialog";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import UserInfo from "./UserInfo";
import { IoMdAdd } from "react-icons/io";
import AddSubTask from "./task/AddSubTask";
import { useNavigate } from 'react-router-dom';


const TaskCard = ({ task, users }) => {
  const navigate = useNavigate();  // Get access to the history instance
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const viewDetails = () => {
    console.log("Navigating to task with ID:", task.id);
    navigate(`/tasks/${task._id}`);
  };
  

  return (
    <>
      <div className={clsx('w-full h-fit bg-white shadow-md p-4 rounded')}>
        <div className='w-full flex justify-between'>
          <div
            className={clsx(
              "flex  mb-2 gap-1 justify-end items-center text-sm font-medium rounded-full", )}
          >
            <span className={clsx('uppercase p-1',{
                'bg-red-100': task.priority === 'high',
                'bg-yellow-100': task.priority === 'medium',
                'bg-blue-100': task.priority === 'normal',
                'bg-green-100': task.priority === 'low'
            })}>{task?.priority} Priority</span>
          </div>

          {user && <TaskDialog task={task} />}
        </div>

        <div className='flex items-center gap-2'>
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />
          <h4 className='line-clamp-1 text-black'>{task?.title}</h4>
        </div>
        <span className='text-sm text-gray-600'>
          {formatDate(new Date(task?.date))}
        </span>

        <div className='w-full border-t border-gray-200 my-2' />
        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center gap-3'>
            <div className='flex gap-1 items-center text-sm text-gray-600'>
              <BiMessageAltDetail />
              <span>{task?.activities?.length}</span>
            </div>
            <div className='flex gap-1 items-center text-sm text-gray-600 '>
              <MdAttachFile />
              <span>{task?.assets?.length}</span>
            </div>
            <div className='flex gap-1 items-center text-sm text-gray-600 '>
              <FaList />
              <span>0/{task?.subTasks?.length}</span>
            </div>
          </div>

          <div className='flex flex-row-reverse'>
            {task.team.map((userId, index) => {
              const userDetail = users.find(user => user._id === userId); // Find user detail based on ID
              return userDetail ? (
                <div key={userId} className={clsx("w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1", BGS[index % BGS.length])}>
                  <UserInfo user={userDetail} />
                </div>
              ) : null;
            })}
          </div>
        </div>

        {/* Sub tasks display and logic */}
        {task?.subTasks?.length > 0 ? (
          <div className='py-4 border-t border-gray-200'>
            <h5 className='text-base line-clamp-1 text-black'>
              {task?.subTasks[0].title}
            </h5>

            <div className='p-4 space-x-8'>
              <span className='text-sm text-gray-600'>
                {formatDate(new Date(task?.subTasks[0]?.date))}
              </span>
              <span className='bg-blue-600/10 px-3 py-1 rounded-full text-blue-700 font-medium'>
                {task?.subTasks[0].tag}
              </span>
            </div>
          </div>
        ) : (
          <div className='py-4 border-t border-gray-200'>
            <span className='text-gray-500'>No Sub Task</span>
          </div>
        )}

           {/* View Details Button */}
        <div className='w-full pb-2'>
          <button
            onClick={viewDetails}
            className='w-full flex gap-4 items-center text-sm text-purple-700 font-semibold py-2 rounded-md'
          >
            <MdReadMore className='text-lg' />
            <span>VIEW DETAILS</span>
          </button>
        </div>

        {/* Add SubTask Button */}
        <div className='w-full pb-2'>
          <button
            onClick={() => setOpen(true)}
            className='w-full flex gap-4 items-center text-sm text-gray-500 font-semibold disabled:cursor-not-allowed disabled::text-gray-300'
          >
            <IoMdAdd className='text-lg' />
            <span>ADD SUBTASK</span>
          </button>
        </div>
      </div>

      <AddSubTask open={open} setOpen={setOpen} id={task.id} />
    </>
  );
};

export default TaskCard;
