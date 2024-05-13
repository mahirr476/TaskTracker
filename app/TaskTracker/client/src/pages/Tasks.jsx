import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
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
          <BoardView tasks={tasks} users={users}
          />
        ) : (
          <div className='w-full'>
            <EnhancedTable tasks={tasks} 
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