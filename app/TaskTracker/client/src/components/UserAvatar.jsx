import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { FaUser, FaUserLock } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getInitials } from '../utils/index';
import { logoutUser } from '../redux/slices/authSlice';

const UserAvatar = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logoutUser());
        navigate('/log-in');
    };

    const handleProfileClick = () => {
        navigate('/profile');  // Redirects to the profile page
    };
    return (
        <div className="relative inline-block text-left">
            <Menu as="div">
                <Menu.Button className="w-10 h-10 2xl:w-12 2xl:h-12 flex items-center justify-center rounded-full bg-amber-200 z-20">
                    <span className='text-black font-semibold'>{getInitials(user?.name || "Default User")}</span>
                </Menu.Button>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none z-50'>
                        <div className="p-4">
                            <Menu.Item>
                                {({ active }) => (
                                    <button onClick={handleProfileClick} className="text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base">
                                        <FaUser className='mr-2' aria-hidden="true" />
                                        Profile
                                    </button>
                                )}
                            </Menu.Item>
                            {/* <Menu.Item>
                                {({ active }) => (
                                    <button className="text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base">
                                        <FaUserLock className='mr-2' aria-hidden="true" />
                                        Change Password
                                    </button>
                                )}
                            </Menu.Item> */}
                            <Menu.Item>
                                {({ active }) => (
                                    <button onClick={logoutHandler} className="text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-base">
                                        <IoLogOutOutline className='mr-2' aria-hidden="true" />
                                        Logout
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};

export default UserAvatar;
