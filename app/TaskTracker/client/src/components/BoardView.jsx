import React, { useState, useMemo } from "react";
import TaskCard from "./TaskCard";
import { Box, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";


const BoardView = ({ tasks }) => {
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
    
  
    return (
      <div>
        <Box sx={{ padding: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
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
        </Box>
        <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
          {filteredTasks.map((task, index) => (
            <TaskCard task={task} key={index} />
          ))}
        </div>
      </div>
    );
  }

export default BoardView;