import React from 'react'
import Login from './pages/Login'
import TaskDetails from "./pages/TaskDetails"
import Tasks from "./pages/Tasks"
import Trash from "./pages/Trash"
import Users from "./pages/Users"
import Dashboard from "./pages/Dashboard"
import Sidebar from "./components/Sidebar"
import Navbar from './components/Navbar'
import {useRef} from "react"
import clsx from "clsx"
import {useSelector, useDispatch} from 'react-redux'
import {Route, Routes, Navigate, useLocation, Outlet} from 'react-router-dom'
import {Toaster} from "sonner"
import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import {IoClose} from 'react-icons/io5'
import { setOpenSidebar } from './redux/slices/authSlice'

function Layout() { // Main functions
  const user = useSelector((state) => state.auth)
  const location = useLocation()

  return user ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className="w-1/5 h-screen bg-white top-9 hidden md:block">
        <Sidebar/>
      </div>

        <MobielSidebar/>

      <div className='flex-1 overflow-y-auto'>
        <Navbar/>
        <div className="p-4 2xl:px-10">
          <Outlet/>
        </div>
      </div>
    </div>
  ): (
    <Navigate to="/log-in" state={{from: location}} replace/> 
  )
}

const MobielSidebar = () => {
  const {isSidebarOpen } = useSelector((state) => state.auth)
  const mobileMenuRef = useRef(null)
  const dispatch = useDispatch();

  const closeSidebar = () => { 
    dispatch(setOpenSidebar(false))
  }

  return <>
    <Transition
      show={isSidebarOpen}
      as={Fragment}
      enter='transition-opacity duration-700'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity duration-700'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'

    >

      {(ref)=> (
        <div
        ref={(node)=> (mobileMenuRef.current = node)}
        className={clsx('md:hidden fixed inset-0 z-40 transition-all duration-700 transform',
        isSidebarOpen ? "translate-x-0" : "-translate-x-full")}

        onClick= {() => closeSidebar()}
        >
          <div className="bg-white w-2/4 h-full">
            <div className="w-full flex justify-end px-5 pt-5">
              <button
               onClick={() => closeSidebar()}
               className='flex justify-end items-end'
              >
                <IoClose size={25}  />
              </button>
            </div>

            <div className="mt-10">
              <Sidebar/>
            </div>
          </div>

        </div>
      )}

    </Transition>
  </>



}

function App() {

  return (
    <main className='w-full min-h-screen bg-[#f3f4f6]'>
      <Routes>
        <Route element={<Layout />}>  // Protected Routes
          <Route index path='/' element={<Navigate to ="/dashboard"/>}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/tasks' element={<Tasks />}/>
          <Route path='/completed/:status' element={<Tasks />}/>
          <Route path='/in-progress/:status' element={<Tasks />}/>
          <Route path='/todo/:status' element={<Tasks />}/>
          <Route path='/team' element={<Users/>}/>
          <Route path='/trashed' element={<Trash/>}/>
          <Route path='/tasks/:id' element={<TaskDetails/>}/>
        </Route>

        <Route path='/log-in' element={<Login />}/>

      </Routes>

      <Toaster richColors /> 
    </main>
  )
}

export default App
