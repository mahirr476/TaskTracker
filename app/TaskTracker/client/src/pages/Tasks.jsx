import React, { useState, useEffect } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useSelector } from "react-redux"; // Import to access Redux store
import Loading from "../components/Loading";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import BoardView from "../components/BoardView";
import { tasks, users } from "../assets/data";
import EnhancedTable from "../components/task/Table";
import AddTask from "../components/task/AddTask";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];



const Tasks = () => {

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(state => state.auth); // Access the logged in user from Redux state

  const userTasks = user && user.role === "Admin" ? tasks : tasks.filter(task => task.team.includes(user._id));

  // Handle cases where there is no logged in user
  useEffect(() => {
    if (!user) {
      setLoading(true); // Optionally use loading to handle delay or redirection
      // Consider redirecting or showing an appropriate message if no user is logged in
    } else {
      setLoading(false);
    }
  }, [user]);

  

  return loading ? (
    <div className='py-10'>
      <Loading />
    </div>
  ) : (
    <div className='w-full my-6'>
      <div className='flex items-center justify-between mb-4'>
        <Title title={ "My Tasks"} />

       
          <Button
            label={"Create Task"}
            onClick={() => setOpen(true)}
            icon={<IoMdAdd />}
            className='bg-green-500 hover:bg-green-600 rounded-full flex flex-row-reverse justify-center items-center gap-2 text-white  py-2 px-4'
            />
          <AddTask open={open} setOpen={setOpen}  />

      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        
          
      

        {selected !== 1 ? (
          <BoardView tasks={userTasks} users={users}
          />
        ) : (
          <div className='w-full'>
            <EnhancedTable tasks={userTasks} 
            users={users}
            showSearch={true}
            showStageFilter={true}
            enablePrioritySort={true}
            enableCreatedAtSort={true}
            visibleColumns={['progress', 'title', 'priority', 'createdAt', 'team', "actions"]} />
          </div>
        )}
      </Tabs>

    </div>
  );
};

export default Tasks;