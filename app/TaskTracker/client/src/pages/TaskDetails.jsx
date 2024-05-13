import clsx from "clsx";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { FaBug, FaTasks, FaThumbsUp, FaUser  } from "react-icons/fa"; 
import { GrInProgress } from "react-icons/gr";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineDoneAll,
  MdOutlineMessage,
  MdTaskAlt, MdImage, MdInsertDriveFile
} from "react-icons/md";

import { RxActivityLog } from "react-icons/rx";
import { BsDash } from "react-icons/bs";
import { toast } from "sonner";
import { tasks, users } from "../assets/data";  // Ensure users data is available
import Tabs from "../components/Tabs";
import { PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils";
import Loading from "../components/Loading";
import Button from "../components/Button";
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdAdd } from "react-icons/io";
import AddSubTask from "../components/task/AddTask";
import { TbArrowBackUp } from "react-icons/tb";


const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  normal: <BsDash />,
  low:<MdKeyboardArrowDown/>,
};

const bgColor = {
  high: "bg-red-100",
  medium: "bg-yellow-100",
  normal: "bg-blue-100",
  low: "bg-green-100",
};

const TABS = [
  { title: "Task Detail", icon: <FaTasks /> },
  { title: "Activities/Timeline", icon: <RxActivityLog /> },
];

const TASKTYPEICON = {
  commented: (
    <div className='w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white'>
      <MdOutlineMessage />,
    </div>
  ),
  started: (
    <div className='w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white'>
      <FaThumbsUp size={20} />
    </div>
  ),
  assigned: (
    <div className='w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white'>
      <FaUser size={14} />
    </div>
  ),
  bug: (
    <div className='text-red-600'>
      <FaBug size={24} />
    </div>
  ),
  completed: (
    <div className='w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white'>
      <MdOutlineDoneAll size={24} />
    </div>
  ),
  "in progress": (
    <div className='w-8 h-8 flex items-center justify-center rounded-full bg-violet-600 text-white'>
      <GrInProgress size={16} />
    </div>
  ),
};

const act_types = [
  "Started",
  "Completed",
  "In Progress",
  "Commented",
  "Bug",
  "Assigned",
];

const TaskDetails = () => {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const currentIndex = tasks.findIndex(task => task._id.toString() === id);
  const nextTaskId = currentIndex >= 0 && currentIndex < tasks.length - 1 ? tasks[currentIndex + 1]._id : null;
  const prevTaskId = currentIndex > 0 ? tasks[currentIndex - 1]._id : null;
  const goToHome = () => navigate('/tasks');  // Adjust according to your home route
  const goToPrevTask = () => prevTaskId && navigate(`/tasks/${prevTaskId}`);
  const goToNextTask = () => nextTaskId && navigate(`/tasks/${nextTaskId}`);


  const [task, setTask] = useState(null);  // State to hold the current task
  const [taskUsers, setTaskUsers] = useState([]);


  useEffect(() => {
    // Find the task that matches the ID from the URL
    const currentTask = tasks.find((task) => task._id.toString() === id);
    if (currentTask) {
      setTask(currentTask);
      const relatedUsers = users.filter(user => currentTask.team.includes(user._id));
      setTaskUsers(relatedUsers);
    } else {
      // Handle the case where no task is found
      console.log("No task found with ID:", id);
      // Optionally redirect the user or show an error message
    }
  }, [id]);  // Re-run this effect if the ID changes

  if (!task) {
    // Render a loading or not found message while the task is null
    return <p>Loading task details or task not found...</p>;
  }

  const handleEditTask = () => {
    // Function to navigate to the task edit page or open a modal
    console.log("Edit task:", id);
    navigate(`/edit-task/${id}`);
  };

  
  const downloadFile = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderAssetIcon = (url) => {
    const isImage = /\.(jpeg|jpg|gif|png|svg)$/i.test(url);
    return isImage ? <MdImage size={24} /> : <MdInsertDriveFile size={24} />;
  };

  // Rest of your component rendering logic using the `task` variable
  return (

    <div className='w-full flex flex-col gap-3 mb-4 overflow-y-hidden'>
   
     <div className="flex justify-between border-b-2 pb-5 items-end">
    
        <h1 className='text-2xl text-gray-600 font-bold'>{task.title}</h1>
        <div className="flex gap-2">
        <button onClick={goToHome} className='button bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded'>
               < TbArrowBackUp size={20}/>
                </button>
          <button onClick={goToPrevTask} className={clsx('button p-2 rounded', prevTaskId ? " text-blue-700 bg-blue-200 hover:bg-blue-300 " : "text-gray-400" ) } disabled={!prevTaskId}>
            PREVIOUS
          </button>
          <button onClick={goToNextTask} className={clsx('button  p-2 rounded', nextTaskId ? "text-green-700 hover:bg-green-300 bg-green-200 " : "text-gray-400" )} disabled={!nextTaskId}>
            NEXT
          </button>
        </div>
        
      </div>
      
      <Tabs tabs={TABS} setSelected={setSelected}>
        {selected === 0 ? (
          <>
            <div className='w-full flex flex-col md:flex-row gap-5 2xl:gap-8 bg-white shadow-md p-8 overflow-y-auto'>
              <div className='w-full md:w-1/2 space-y-8'>
                <div className='flex items-center gap-5'>
                
                  <div
                    className={clsx(
                      "flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full",
                      PRIOTITYSTYELS[task?.priority],
                      bgColor[task?.priority]
                    )}
                  >
                    <span className='text-lg'>{ICONS[task?.priority]}</span>
                    <span className='uppercase'>{task?.priority} Priority</span>
                  </div>

                  <div className={clsx("flex items-center gap-2")}>
                    <div
                      className={clsx(
                        "w-4 h-4 rounded-full",
                        TASK_TYPE[task.stage]
                      )}
                    />
                    <span className='text-black uppercase'>{task?.stage}</span>
                    
                  </div>

                  
                </div>

                <p className='text-gray-500'>
                  Created At: {new Date(task?.date).toDateString()}
                </p>

                <div className='flex items-center gap-8 p-4 border-y border-gray-200'>
                  <div className='space-x-2'>
                    <span className='font-semibold'>Assets :</span>
                    <span>{task?.assets?.length}</span>
                  </div>

                  <span className='text-gray-400'>|</span>

                  <div className='space-x-2'>
                    <span className='font-semibold'>Sub-Task :</span>
                    <span>{task?.subTasks?.length}</span>
                  </div>

                  <Button label="Edit Task" type="edittask" className="hover:bg-amber-100 hover:transition-opacity border-2  shadow rounded-full" onClick={handleEditTask} />

                </div>

        

                <div className=''>
                  <p className='text-gray-500 font-semibold text-sm'>
                    SUB-TASKS
                  </p>
                  <div className='space-y-8'>
                    {task?.subTasks?.map((el, index) => (
                      <div key={index} className='flex gap-3'>
                        <div className='w-10 h-10 flex items-center justify-center rounded-full bg-violet-50-200'>
                          <MdTaskAlt className='text-violet-600' size={26} />
                        </div>

                        <div className='space-y-1'>
                          <div className='flex gap-2 items-center'>
                            <span className='text-sm text-gray-500'>
                              {new Date(el?.date).toDateString()}
                            </span>

                            <span className='px-2 py-0.5 text-center text-sm rounded-full bg-violet-100 text-violet-700 font-semibold'>
                              {el?.tag}
                            </span>
                          </div>

                          <p className='text-gray-700'>{el?.title}</p>
                        </div>
                      </div>
                    ))}
                    <div className='w-full pb-2'>
                      <button
                        onClick={() => setOpen(true)}
                        className='w-full flex gap-4 items-center text-sm text-gray-500 font-semibold disabled:cursor-not-allowed disabled::text-gray-300'
                      >
                        <IoMdAdd className='text-lg' />
                        <span>ADD SUBTASK</span>
                      </button>
                    </div>
                  <AddSubTask open={open} setOpen={setOpen} id={task.id} />
                  </div>
                </div>
              </div>
              {/* RIGHT */}
              <div className='w-full md:w-1/2 space-y-8'>
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2  border-b-2 ">Dependencies</h2>
                <div className="flex flex-col gap-3">
                {task.dependencies.map(depId => {
                            const depTask = tasks.find(t => t._id === depId);
                            if (!depTask) {
                              return (
                                <Typography key={depId} style={{ color: 'red' }}>
                                  Dependency task not found
                                </Typography>
                              );
                            }
                            const stageColor = depTask.stage === 'todo' ? 'bg-blue-300' : depTask.stage === 'in progress' ? 'bg-amber-300' : 'bg-green-300';
                            return (
                              <div key={depId} className={`${stageColor} text-black rounded p-2`}>
                                {depTask.title}
                              </div>
                            );
                          })}
                </div>
              </div>
                {/* Assets Section */}
                <div className="mt-4">
                  <h2 className="text-xl font-semibold">Assets</h2>
                  <div className="flex flex-wrap">
                    {task.assets.map((asset, index) => (
                      <div key={index} className="p-2 m-1 bg-gray-100 rounded cursor-pointer flex items-center space-x-2" onClick={() => downloadFile(asset)}>
                        {renderAssetIcon(asset)}
                        <span className="text-sm">{asset.split('/').pop()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='space-y-4 py-6'>
                  <p className='text-gray-600 font-semibold test-sm'>
                    Task Members
                  </p>
                  <div className='space-y-3'>
                  <h2 className="text-xl font-semibold"></h2>
                  {taskUsers.map(user => (
                    <div key={user._id} className="flex items-center space-x-2 my-1">
                      <div className="w-8 h-8 bg-blue-500 rounded-full text-white flex items-center justify-center">
                        {user.name.charAt(0)}
                      </div>
                      <span>{user.name}</span>
                    </div>
                  ))}
                  </div>
                </div>
              </div>
            </div>
            
            
            <div className='flex my-5 justify-end items-center'>
              
            
            </div>
          </>
        ) : (
          <>
            <Activities activity={task?.activities} id={id} />
          </>
        )}
      </Tabs>
    </div>
  );
};

const Activities = ({ activity, id }) => {
  const [selected, setSelected] = useState(act_types[0]);
  const [text, setText] = useState("");
  const isLoading = false;

  const handleSubmit = async () => {};

  const Card = ({ item }) => {
    return (
      <div className='flex space-x-4'>
        <div className='flex flex-col items-center flex-shrink-0'>
          <div className='w-10 h-10 flex items-center justify-center'>
            {TASKTYPEICON[item?.type]}
          </div>
          <div className='w-full flex items-center'>
            <div className='w-0.5 bg-gray-300 h-full'></div>
          </div>
        </div>

        <div className='flex flex-col gap-y-1 mb-8'>
          <p className='font-semibold'>{item?.by?.name}</p>
          <div className='text-gray-500 space-y-2'>
            <span className='capitalize'>{item?.type}</span>
            <span className='text-sm'>{moment(item?.date).fromNow()}</span>
          </div>
          <div className='text-gray-700'>{item?.activity}</div>
        </div>
      </div>
    );
  };

  return (
    <div className='w-full flex gap-10 2xl:gap-20 min-h-screen px-10 py-8 bg-white shadow rounded-md justify-between overflow-y-auto'>
      <div className='w-full md:w-1/2'>
        <h4 className='text-gray-600 font-semibold text-lg mb-5'>Activities</h4>

        <div className='w-full'>
          {activity?.map((el, index) => (
            <Card
              key={index}
              item={el}
              isConnected={index < activity.length - 1}
            />
          ))}
        </div>
      </div>

      <div className='w-full md:w-1/3'>
        <h4 className='text-gray-600 font-semibold text-lg mb-5'>
          Add Activity
        </h4>
        <div className='w-full flex flex-wrap gap-5'>
          {act_types.map((item, index) => (
            <div key={item} className='flex gap-2 items-center'>
              <input
                type='checkbox'
                className='w-4 h-4'
                checked={selected === item ? true : false}
                onChange={(e) => setSelected(item)}
              />
              <p>{item}</p>
            </div>
          ))}
          <textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Type ......'
            className='bg-white w-full mt-10 border border-gray-300 outline-none p-4 rounded-md focus:ring-2 ring-blue-500'
          ></textarea>
          {isLoading ? (
            <Loading />
          ) : (
            <Button
              type='button'
              label='Submit'
              onClick={handleSubmit}
              className='bg-blue-600 text-white rounded'
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default TaskDetails;