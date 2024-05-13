import React, { useState, useMemo } from "react";
import TaskCard from "./TaskCard";
import { Paper, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import TaskTitle from "../components/TaskTitle";


const BoardView = ({ tasks, users }) => {
    const [stageFilter, setStageFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleStageChange = (event) => {
      setStageFilter(event.target.value);
    };
  
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value.toLowerCase());
    };


    const filteredTasks = useMemo(() => {
      return tasks.filter(task => 
        (stageFilter ? task.stage === stageFilter : true) &&
        (task.title.toLowerCase().includes(searchQuery))
      );
    }, [tasks, stageFilter, searchQuery]);
    

const TASK_TYPE = {
  todo: "bg-blue-600 ",
  "in progress": "bg-yellow-600 ",
  completed: "bg-green-600 ",
};
  
    return (
      <div>
        <Paper sx={{ padding: 2, display: 'flex', flexDirection:"column", alignItems: 'center', justifyContent:'end', width:"100%"}}>

        <div className="flex w-full gap-2 justify-center items-center">
          <TextField
            label="Search For Tasks"
            variant="outlined"
            fullWidth
            sx={{ flexGrow: 1 }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <FormControl fullWidth sx={{ maxWidth: 200 }}>
            <InputLabel id="stage-select-label">Filter by Stage</InputLabel>
            <Select
              labelId="stage-select-label"
              id="stage-select"
              value={stageFilter}
              onChange={handleStageChange}
              label="Filter by Stage"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="in progress">In Progress</MenuItem>
              <MenuItem value="todo">Todo</MenuItem>
            </Select>
          </FormControl>
          </div>




          <div className='flex px-2 gap-5 w-full mt-2'>
            <TaskTitle label='To Do' className={TASK_TYPE.todo} />
            <TaskTitle
              label='In Progress'
              className={TASK_TYPE["in progress"]}
            />
            <TaskTitle label='Completed' className={TASK_TYPE.completed} />
          </div>
       

        </Paper>
        <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
          {filteredTasks.map((task, index) => (
            <TaskCard task={task} users={users} key={index} />
          ))}
        </div>
      </div>
    );
  }

export default BoardView;