import React, { useState } from 'react';
import {
    MdDashboard,
    MdOutlineAddTask,
    MdSettings,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { PiProjectorScreenChart } from "react-icons/pi";
import { CiGlobe } from "react-icons/ci";
import { TbSquarePercentage } from "react-icons/tb";
import { IoCalendarSharp } from "react-icons/io5";
import { setOpenSidebar } from '../redux/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import clsx from "clsx";

const linkData = [
    {
        label: "Dashboard",
        link: "dashboard",
        icon: <MdDashboard />
    },
    {
        label: "Tasks",
        link: "tasks",
        icon: <FaTasks />,
    },
    // {
    //     label: "Calendar",
    //     link: "calendar",
    //     icon: <IoCalendarSharp />
    // },
    {
        label: "Projects",
        link: "projects",
        icon: <PiProjectorScreenChart />
    },
    {
        label: "KPI",
        link: "kpi",
        icon: <TbSquarePercentage />
    },

    {
        label: "Team",
        link: "team",
        icon: <FaUsers />
    },
    {
        label: "Trash",
        link: "trashed",
        icon: <FaTrashAlt />
    },
];

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const [isTasksOpen, setIsTasksOpen] = useState(false);

    const closeSidebar = () => {
        dispatch(setOpenSidebar(false));
    };

    const NavLink = ({ el, isSubLink = false }) => {
        const isActive = path === el.link.split("/")[0];
        return (
            <Link
                to={el.link}
                onClick={closeSidebar}
                className={clsx(
                    "flex gap-2 px-3 py-2 rounded-full items-center text-base hover:bg-amber-100",
                    isActive ? "bg-amber-200 text-gray-900 hover:text-gray-800" : "text-gray-800",
                    isSubLink && "pl-10 rounded-none"
                )}
            >
                {el.icon}
                <span className={isActive ? "" : "hover:text-[#2564ed]"}>{el.label}</span>
            </Link>
        );
    };

    return (
        <div className='w-full h-full flex flex-col gap-6 p-5 '>
            <h1 className="flex gap-1 items-center">
                <p className='bg-amber-200 p-2 rounded-full'>
                    <MdOutlineAddTask className='text-black text-2xl font-black' />
                </p>
                <span className='text-2xl font-bold text-black'>
                    TaskTracker
                </span>
            </h1>

            <div className='flex-1 flex flex-col gap-y-5 py-8'>
                {linkData.map((link) => {
                    return <NavLink key={link.label} el={link} />                  
                })}

            </div>

            <div>
                <button className='w-full flex gap-2 p-2 items-center text-lg text-gray-800 '>
                    <MdSettings />
                    <span>Settings</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
