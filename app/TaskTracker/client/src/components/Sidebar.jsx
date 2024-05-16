import React from 'react';
import { MdDashboard, MdOutlineAddTask, MdSettings } from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { PiProjectorScreenChart } from "react-icons/pi";
import { TbSquarePercentage } from "react-icons/tb";
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import clsx from "clsx";

const linkData = [
    {
        label: "Dashboard",
        link: "/dashboard",
        icon: <MdDashboard />,
        adminOnly: false,
    },
    {
        label: "Tasks",
        link: "/tasks",
        icon: <FaTasks />,
        adminOnly: false,
    },
    {
        label: "Projects",
        link: "/projects",
        icon: <PiProjectorScreenChart />,
        adminOnly: false,
    },
    {
        label: "KPI",
        link: "/kpi",
        icon: <TbSquarePercentage />,
        adminOnly: false,
    },
    {
        label: "Team",
        link: "/team",
        icon: <FaUsers />,
        adminOnly: false,
    },
    {
        label: "Trash",
        link: "/trashed",
        icon: <FaTrashAlt />,
        adminOnly: false,
    },
];

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();
    const path = location.pathname.split("/")[1];

    // Filter links based on the user role
    const availableLinks = linkData.filter(link => !link.adminOnly || user.role === "admin");

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
                {availableLinks.map((link) => (
                    <Link
                        key={link.label}
                        to={link.link}
                        className={clsx(
                            "flex gap-2 px-3 py-2 rounded-full items-center text-base",
                            path === link.link ? "bg-amber-200 text-gray-900" : "hover:bg-amber-100 text-gray-800"
                        )}
                    >
                        {link.icon}
                        <span>{link.label}</span>
                    </Link>
                ))}
            </div>

            {user.role === "admin" && (
                <div>
                    <button className='w-full flex gap-2 p-2 items-center text-lg text-gray-800 '>
                        <MdSettings />
                        <span>Settings</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
