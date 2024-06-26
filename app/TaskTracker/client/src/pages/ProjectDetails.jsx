import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import to access Redux store
import { projects as allProjects, tasks as globalTasks, users as globalUsers } from '../assets/data';
import EnhancedTable from '../components/task/Table';
import BoardView from '../components/BoardView'; 
import UserTable from '../components/user/UserTable';
import Tabs from '../components/Tabs';
import { FaList } from 'react-icons/fa';
import { MdGridView } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper, FaArrowsToDot } from "react-icons/fa6";
import Chart from '../components/charts/Gantt';
import Card from '../components/Card';
import { Typography, Paper } from "@mui/material";
import Button from "../components/Button";
import AddTask from "../components/task/AddTask";
import Loading from '../components/Loading'; 
import clsx from "clsx";
import { TbArrowBackUp } from "react-icons/tb";
import Title from '../components/Title';


const TABS = [
  { title: "List View", icon: <FaList />},
  { title: "Board View", icon: <MdGridView />  },
];
const ProjectDetails = () => {
  const { pid } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(true); // State to manage loading
  const user = useSelector(state => state.auth.user); // Access the logged in user from Redux state
  const [userProjects, setUserProjects] = useState([]);


  useEffect(() => {
    if (user) {
      const relatedProjects = allProjects.filter(p => p.teamMembers.includes(user._id));
      setUserProjects(relatedProjects);

      const foundProject = relatedProjects.find(p => p.pid === pid);
      if (foundProject) {
        setProject(foundProject);
        setTasks(globalTasks.filter(t => t.pid === foundProject.pid));
        setUsers(globalUsers.filter(u => foundProject.teamMembers.includes(u._id)));
      }
      setLoading(false);
    }
  }, [pid, user]);

  if (loading) {
    return <Loading />;
  }
  

  // Calculate task statistics 
  const totalTasks = tasks.length; 
  const completedTasks = tasks.filter(t => t.stage === 'completed').length;
  const inProgressTasks = tasks.filter(t => t.stage === 'in progress').length;
  const todoTasks = tasks.filter(t => t.stage === 'todo').length;

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: totalTasks,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLETED TASK",
      total: completedTasks,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS",
      total: inProgressTasks,
      icon: <LuClipboardEdit />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: todoTasks,
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]" || 0,
    },
  ];

  const currentIndex = userProjects.findIndex(p => p.pid === pid);
  const nextPid = currentIndex >= 0 && currentIndex < userProjects.length - 1 ? userProjects[currentIndex + 1].pid : null;
  const prevPid = currentIndex > 0 ? userProjects[currentIndex - 1].pid : null;

  const goToProjects = () => navigate('/projects');
  const goToPrevProject = () => prevPid && navigate(`/projects/${prevPid}`);
  const goToNextProject = () => nextPid && navigate(`/projects/${nextPid}`);

  return (
    <div>
      {project ? (
         <div className='w-full flex flex-col mb-4 overflow-y-hidden'>
          <div className="mb-3">
          <Paper elevation={0} className='p-4 mb-3 flex w-full  lg:flex-row lg:justify-between flex-col justify-start  gap-3'>
          <div className="flex flex-col">
              <Typography variant="h5" gutterBottom><div className='font-bold'>{project.projectName} Project</div></Typography>
              <Typography variant="body1"><div >{project.description}</div></Typography>
            </div>
              <div className='flex gap-2 justify-end items-center'>
                <button onClick={goToProjects} className='button bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded'>
                  <TbArrowBackUp size={20}/>
                </button>
                  <button onClick={goToPrevProject} className={clsx('button  p-2 rounded', prevPid ? "bg-blue-200 text-blue-800 hover:bg-blue-300 " : "text-gray-300" )} disabled={userProjects.findIndex(project => project.pid === pid) === 0}>
                    PREVIOUS
                  </button>
                  <button onClick={goToNextProject} className={clsx('button  p-2 rounded', nextPid ? "bg-green-200 text-green-800 hover:bg-green-300 " : "text-gray-300" )} disabled={userProjects.findIndex(project => project.pid === pid) === userProjects.length - 1}>
                    NEXT
                  </button>
              </div>
           
          </Paper>          
          </div>
         <div className="flex flex-wrap justify-between items-center mb-5 ">
          <div className='w-full h-full lg:w-2/3 '>
          <Title title="Gantt Chart" className={"text-3xl font-normal my-2"} />

            <Chart tasks={tasks} users={users}/>
          </div>
           <div className='w-full lg:w-1/3 flex flex-wrap  pl-5 sm:p-1 mt-5 lg:mt-0 lg:pl-3 gap-4'>

             {stats.map(({ icon, bg, label, total }, index) => (
               <Card key={index} icon={icon} bg={bg} label={label} count={total} />
             ))}

           </div>
           
         </div>
         <Paper elevation={0} className='w-full p-4 '>

          <Typography variant="h4" component="div" gutterBottom><div>Team Members</div></Typography>
          </Paper>
          <div className="flex mb-5 justify-between">
            <UserTable
              users={users}
              showSearch={false}
            />
          </div>

          <div className="flex w-full justify-between items-center mb-5">
          <Paper elevation={0} className='w-full p-4 '>

            <div className="flex w-full justify-between">
            <Typography variant="h4" component="div" style={{ width: "100%", marginBottom: "20px" }}>
              Project Tasks
            </Typography>
            <Button
            onClick={() => setOpen(true)}
            icon={<IoMdAdd className='text-lg' />}

            className='flex flex-row-reverse gap-1 items-center bg-blue-300 text-black rounded-md py-2 2xl:py-2.5'
          />
            </div>
            <Tabs tabs={TABS} selected={selectedTab} setSelected={setSelectedTab} />
            {selectedTab === 0 ? (
              <EnhancedTable tasks={tasks}  
              users={globalUsers}
              showSearch={true}
              showStageFilter={true}
              enablePrioritySort={true}
              enableCreatedAtSort={true}
              visibleColumns={['progress', 'title', 'priority',"actions", 'createdAt', 'team', "action"]} />
            ) : ( <BoardView tasks={tasks} users={globalUsers} />
            )}
            <AddTask open={open} setOpen={setOpen} />
          </Paper>
            </div>
          
        </div>
      ) : (
        <Typography variant="h6" color="error">Project not found.</Typography>
      )}
    </div>
  );
};

export default ProjectDetails;
