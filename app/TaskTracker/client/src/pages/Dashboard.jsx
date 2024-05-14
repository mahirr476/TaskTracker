import React, { useEffect } from 'react';
import { MdAdminPanelSettings } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper, FaArrowsToDot } from "react-icons/fa6";
import { tasks, users } from "../assets/data";
import EnhancedTable from '../components/task/Table';
import UserTable from '../components/user/UserTable';
import Card from '../components/Card';
import Title from '../components/Title';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/log-in');
    }
  }, [user, navigate]);

  const totals = tasks.filter(task => task.team.includes(user?._id));
  

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: totals.length,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLETED TASK",
      total: totals.filter(t => t.stage === "completed").length,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS",
      total: totals.filter(t => t.stage === "in progress").length,
      icon: <LuClipboardEdit />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals.filter(t => t.stage === "todo").length,
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]",
    },
  ];

  return (
    <div className='h-full py-4'>
      <div className="mb-3">
        <Title title={"My Dashboard"}/>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>
      <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8'>
        <div className='w-full md:w-2/3'>
          <h2 className='text-2xl my-2'>Recent Tasks</h2>
          <EnhancedTable
            tasks={totals}
            users={users}
            showSearch={false}
            showStageFilter={false}
            enablePrioritySort={true}
            enableCreatedAtSort={true}
            enableActions={false}
            visibleColumns={['progress', 'title', 'priority', 'updatedAt', 'actions', 'expand']}
          />
        </div>
        <div className='w-full md:w-1/3'>
          <h2 className='text-2xl my-2'>User Activity</h2>
          <UserTable
            users={users}
            showSearch={false}
            visibleColumns={['avatar', 'isActive', 'role']}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
