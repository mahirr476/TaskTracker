import React from 'react';
import { MdAdminPanelSettings } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper, FaArrowsToDot } from "react-icons/fa6";
import { summary } from "../assets/data";
import EnhancedTable from '../components/task/Table'; // Adjust this path to where your EnhancedTable is located
import UserTable from '../components/user/UserTable'; // Adjust this path to where your UserTable is located
import Card from '../components/Card';
import { Typography } from "@mui/material";


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
      label: "COMPLETED TASK",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS",
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


  return (
    <div className='h-full py-4'>
      <div className="mb-3">
        <Typography variant="h4" component="h1" ><div className='font-bold mb-5'>My Dashboard</div></Typography>
      </div>
      <div className=' grid grid-cols-1 md:grid-cols-4 gap-5'>
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>
      <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8'>
        <div className='w-full md:w-2/3'>
        <h2 className='text-2xl my-2 '>Recent Tasks</h2>
          <EnhancedTable
            tasks={summary.last10Task}
            showSearch={false}
            showStageFilter={false}
            enablePrioritySort={true}
            enableCreatedAtSort={true}
            visibleColumns={['progress', 'title', 'priority', 'createdAt', 'team']}
          />
        </div>
        <div className='w-full md:w-1/3'>
        <h2 className='text-2xl my-2 '>User Activity</h2>
          <UserTable
            users={summary.users}
            showSearch={false}
            visibleColumns={['avatar','isActive', 'role']}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
