import {React, useState} from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import moment from "moment";
import { summary } from "../assets/data";
import clsx from "clsx";
import { Chart } from "../components/Chart";
import { BGS, TASK_TYPE, getInitials } from "../utils";
import UserInfo from "../components/UserInfo";
// import { updateTaskPriority } from '../path/to/taskActions'; create this method 

const TaskTable = ({ tasks, updateTaskPriority }) => {
  // Here you can pass updateTaskPriority as a prop or use a dispatch method from Redux

  const TableRow = ({ task }) => {
    const [editMode, setEditMode] = useState(false);
    const [newPriority, setNewPriority] = useState(task.priority);

    const handlePriorityChange = (priority) => { // a bug to fix: The dropdown menu for changing High/Medium/Low needs to be sticky with the row selected (currently it generates menu way below)
      setNewPriority(priority);
      setEditMode(false);
      // updateTaskPriority(task.id, priority); // Assuming each task has a unique ID and a method to update the store
    };

    return (
      <tr className='border-b border-gray-300 text-gray-600 hover:bg-gray-300/10'>
        <td className='py-2'>
          <div className='flex items-center gap-2'>
            <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} />
            <p className='text-base text-black'>{task.title}</p>
          </div>
        </td>
        <td className={clsx(
            "flex gap-1 justify-center items-center p-2 rounded mr-5",
            {
              'bg-red-100 text-black': newPriority === 'high',
              'bg-yellow-100 text-black': newPriority === 'medium',
              'bg-green-100 text-black': newPriority === 'normal'
            }
          )}
          onClick={() => setEditMode(!editMode)}
        >
          <span className='capitalize'>{newPriority}</span>
          {editMode && (
            <div className='absolute mt-8 shadow-lg bg-white rounded z-10'>
              {['high', 'medium', 'normal'].map(priority => (
                <div
                  key={priority}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handlePriorityChange(priority)}
                >
                  {priority}
                </div>
              ))}
            </div>
          )}
        </td>
        <td className='py-2'>
          <div className='flex mx-2'>
            {task.team.map((m, index) => (
              <div
                key={index}
                className={clsx(
                  "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                  BGS[index % BGS.length]
                )}
              >
                <UserInfo user={m} />
              </div>
            ))}
          </div>
        </td>
      
      </tr>
    );
  };
  
  return (
    <div className='w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded'>
      <h2 className="lg:text-2xl md:text-xl font-bold my-2">Recent Tasks</h2>

      <table className='w-full'>
        <thead className='border-b border-gray-300 '>
          <tr className='text-black text-left'>
            <th className='py-2'>Task Title</th>
            <th className='py-2'>Priority</th>
            <th className='py-2'>Team</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task, id) => (
            <TableRow key={id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UserTable = ({ users }) => {
  const TableHeader = () => (
    <thead className='border-b border-gray-300 '>
      <tr className='text-black  text-left'>
        <th className='py-2'>Full Name</th>
        <th className='py-2'>Status</th>
        {/* <th className='py-2'>Joined</th> */}
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className='border-b border-gray-200  text-gray-600 hover:bg-gray-400/10'>
      <td className='py-2'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-violet-700'>
            <span className='text-center'>{getInitials(user?.name)}</span>
          </div>

          <div>
            <p> {user.name}</p>
            <span className='text-xs text-black'>{user?.role}</span>
          </div>
        </div>
      </td>

      <td>
        <p
          className={clsx(
            "w-fit px-3 py-1 rounded-full text-sm",
            user?.isActive ? "bg-green-200" : "bg-amber-100"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </p>
      </td>
      {/* <td className='py-2 text-sm'>{moment(user?.createdAt).fromNow()}</td> */}
    </tr>
  );

  return (
    <div className='w-full md:w-1/3 sm:w-3/3 bg-white h-fit px-2 md:px-6 py-4 shadow-md rounded'>
      <h2 className="lg:text-2xl md:text-xl font-bold my-2">Active Users</h2>
      <table className='w-full mb-5'>
        <TableHeader />
        <tbody>
          {users?.map((user, index) => (
            <TableRow key={index + user?._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
const Dashboard = () => {
  const totals = summary.tasks;

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: summary?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLTED TASK",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS ",
      total: totals["in progress"] || 0,
      icon: <LuClipboardEdit />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals["todo"],
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]" || 0,
    },
  ];

  const Card = ({ label, count, bg, icon }) => {
    return (
      <div className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
        <div className='h-full flex flex-1 flex-col justify-between'>
          <p className='text-base text-gray-600'>{label}</p>
          <span className='text-2xl font-semibold'>{count}</span>
          <span className='text-sm text-gray-400'>{"110 last month"}</span>
        </div>

        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center text-white",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    );
  };
  return (
    <div className='h-full py-4'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8'>
        {/* /left */}

        <TaskTable tasks={summary.last10Task} />

        {/* /right */}

        <UserTable users={summary.users} />
      </div>

      {/* <div className='w-full bg-white my-16 p-4 rounded shadow-sm'>
        <h4 className='lg:text-2xl md:text-xl my-2 font-bold'>
          Chart by Priority
        </h4>
        <Chart />
      </div> */}
    </div>
  );
};

export default Dashboard;