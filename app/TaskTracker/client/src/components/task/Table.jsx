import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, TableSortLabel, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { MdAttachFile, MdOutlineReadMore, MdRestore, MdDelete } from 'react-icons/md';
import { BiMessageAltDetail } from 'react-icons/bi';
import { FaList } from 'react-icons/fa';
import clsx from 'clsx';
import UserInfo from '../UserInfo';
import { TASK_TYPE, formatDate, BGS, prioritize } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { Collapse, IconButton, Typography } from '@mui/material';
import { MdExpandMore } from 'react-icons/md';
import { FaPencilAlt  } from "react-icons/fa"; 
import TaskTitle from '../TaskTitle';


const EnhancedTable = ({
  tasks,
  users,
  showSearch = true,
  showStageFilter =true,
  enablePrioritySort = true,
  enableCreatedAtSort =true,
  enableActions = true,
  onRestoreTask,
  onDeleteTask,
  visibleColumns = ['progress', 'title', 'priority', 'createdAt', "updatedAt", 'team', 'actions', "admin"],

}) => {
  const [orderDirection, setOrderDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [filter, setFilter] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const navigate = useNavigate();
  const [expandedRow, setExpandedRow] = useState(null);
  const [expandedIconRotation, setExpandedIconRotation] = useState({});
  
  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
    setExpandedIconRotation({
      ...expandedIconRotation,
      [id]: expandedRow === id ? 0 : 180,  // Rotate icon 180 degrees when expanded
    });
  };
  
  const TASK_TYPE = {
    todo: "bg-blue-600 ",
    "in progress": "bg-yellow-600 ",
    completed: "bg-green-600 ",
  };

  const handleSortRequest = (property) => {
    if (!enablePrioritySort && property === 'priority' || !enableCreatedAtSort && property === 'date') {
      return;
    }
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedItems = useMemo(() => {
    return tasks.sort((a, b) => {
      if (!orderBy) return 0;
      if (orderBy === 'priority' && enablePrioritySort) {
        return prioritize(a[orderBy], b[orderBy], orderDirection);
      } else if (orderBy === 'date' && enableCreatedAtSort) {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return orderDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });
  }, [tasks, orderBy, orderDirection, enablePrioritySort, enableCreatedAtSort, enableActions]);

  const filteredItems = sortedItems.filter(task => task.title.toLowerCase().includes(filter.toLowerCase()) &&
  (stageFilter ? task.stage === stageFilter : true));

  const viewDetails = (id) => {
    navigate(`/tasks/${id}`);  // Navigate to task details page
  };

  // const onRestoreTask = (id) => {
  //   navigate(`/tasks/${id}`);  // Navigate to task details page
  // };

  // const onDeleteTask = (id) => {
  //   navigate(`/tasks/${id}`);  // Navigate to task details page
  // };

  const onEditTask = (id) => {
    navigate(`/tasks/${id}`);  // Navigate to task details page
  };


  return (
      <Paper sx={{ width: '100%', overflow: 'hidden' ,gap: "2"}}>
        {showSearch && (
        <Box sx={{ padding: 2, display: 'flex', flexDirection:"column", alignItems: 'center', justifyContent:'end', width:"100%"}}>
        <div className="flex w-full gap-2 justify-center items-center">
              <TextField
                  label="Search For Tasks"
                  variant="outlined"
                  fullWidth
                  sx={{ flexGrow: 1 }}
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                />
                {showStageFilter && (
                  <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                    <InputLabel id="stage-filter-label">Filter by Stage</InputLabel>
                    <Select
                      labelId="stage-filter-label"
                      id="stage-filter-select"
                      value={stageFilter}
                      onChange={e => setStageFilter(e.target.value)}
                      label="Filter by Stage"
                    >
                      <MenuItem value="">All Stages</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="in progress">In Progress</MenuItem>
                      <MenuItem value="todo">Todo</MenuItem>
                    </Select>
                  </FormControl>
                )}

              </div>
              
                <div className='flex px-2 gap-5 w-full mt-2'>
                  <TaskTitle label='To Do' className={TASK_TYPE.todo} />
                  <TaskTitle
                    label='In Progress'
                    className={TASK_TYPE["in progress"]}
                  />
                  <TaskTitle label='Completed' className={TASK_TYPE.completed} />
                </div>
            </Box>
        )}
        
        <TableContainer sx={{ maxHeight: 450 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {visibleColumns.includes('progress') && <TableCell>Progress</TableCell>}
                {visibleColumns.includes('title') && <TableCell>Task Title</TableCell>}
                {visibleColumns.includes('priority') && (
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'priority'}
                      direction={orderBy === 'priority' ? orderDirection : 'asc'}
                      onClick={() => handleSortRequest('priority')}
                    >
                      Priority
                    </TableSortLabel>
                  </TableCell>
                )}
                {visibleColumns.includes('createdAt') && (
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'date'}
                      direction={orderBy === 'date' ? orderDirection : 'asc'}
                      onClick={() => handleSortRequest('date')}
                    >
                      Created At
                    </TableSortLabel>
                  </TableCell>
                )}
                 {visibleColumns.includes('updatedAt') && (
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'date'}
                      direction={orderBy === 'date' ? orderDirection : 'asc'}
                      onClick={() => handleSortRequest('date')}
                    >
                      Last Updated
                    </TableSortLabel>
                  </TableCell>
                )}
                {visibleColumns.includes('assets') && <TableCell>Assets</TableCell>}
                {visibleColumns.includes('team') && <TableCell>Team</TableCell>}
                {visibleColumns.includes('actions') && <TableCell>Actions</TableCell>}
                {visibleColumns.includes('expand') && <TableCell>Expand</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((task, index) => (
              <>
              <TableRow hover role="checkbox" tabIndex={-1} key={task._id}>
                  {visibleColumns.includes('progress') && (
                    <TableCell component="th" scope="row">
                      <div className='flex items-center gap-2'>
                        <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} />
                      </div>
                    </TableCell>
                  )}
                  {visibleColumns.includes('title') && (
                    <TableCell component="th" scope="row">
                      <div className='flex items-center gap-2'>
                        <p className='line-clamp-2 text-base'>{task.title}</p>
                      </div>
                    </TableCell>
                  )}
                  {visibleColumns.includes('priority') && (
                    <TableCell className={clsx({
                      'bg-red-100': task.priority === 'high',
                      'bg-yellow-100': task.priority === 'medium',
                      'bg-blue-100': task.priority === 'normal',
                      'bg-green-100': task.priority === 'low'
                    })}>
                      <span className='flex items-center justify-center capitalize'>{task.priority}</span>
                    </TableCell>
                  )}
                  {visibleColumns.includes('createdAt') && <TableCell>{formatDate(new Date(task.date))}</TableCell>}
                  {visibleColumns.includes('assets') && (
                    <TableCell>
                      <div className='flex items-center gap-3'>
                        <BiMessageAltDetail />
                        <span>{task.activities.length}</span>
                        <MdAttachFile />
                        <span>{task.assets.length}</span>
                        <FaList />
                        <span>0/{task.subTasks.length}</span>
                      </div>
                    </TableCell>
                  )}
                {visibleColumns.includes('updatedAt') && <TableCell>{formatDate(new Date(task.updatedAt))}</TableCell>}

                {visibleColumns.includes('team') && (
                  <TableCell>
                    <div className='flex'>
                      {task.team.map((userId, idx) => {
                        const userDetail = users && users.find(user => user._id === userId);
                        return userDetail ? (
                          <div key={userId} className={clsx("w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1", BGS[idx % BGS.length])} style={{ backgroundColor: userDetail.isActive ? 'green' : 'gray' }}>
                            <UserInfo user={userDetail} />
                          </div>
                        ) : null;
                      })}
                    </div>
                  </TableCell>
                )}
                  {visibleColumns.includes('actions') && (
                    <TableCell >
                      <div className="flex gap-2">
                      <Button onClick={() => viewDetails(task._id)} startIcon={<MdOutlineReadMore />} >
                        View
                      </Button>
                      <Button  onClick={() => onEditTask(task._id)}><FaPencilAlt size={"15"}/></Button>
                      </div>
                    </TableCell>
                  )}
                   {visibleColumns.includes('admin') && (
                   <TableCell>
                    
                   <Button  onClick={() => onRestoreTask(task._id)}><MdRestore size={"20"}/></Button>
                   <Button onClick={() => onDeleteTask(task._id)} color="error"><MdDelete size={"20"} /></Button>
                 </TableCell>
                  )}
                  
                  {visibleColumns.includes('expand') && ( <TableCell>
                    
                  <IconButton
                    onClick={() => toggleRow(task._id)}
                    aria-expanded={expandedRow === task._id}
                    aria-label="show more"
                  >
                    <MdExpandMore style={{ transform: `rotate(${expandedIconRotation[task._id] || 0}deg)` }} />
                  </IconButton>
                </TableCell>
                   )}
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={visibleColumns.length + 1}>
                  <Collapse in={expandedRow === task._id} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 2}} className="flex w-full justify-between">
                      <div className="flex flex-col gap-2 w-1/2">
                        <Typography variant="h6" gutterBottom component="div">
                          Task Details
                        </Typography>
                        <Typography>{task.description}</Typography>
                        <Typography><div className='text-blue-500'>Created: {formatDate(new Date(task.startDate))}</div></Typography>
                        <Typography><div className='text-red-500'>Due: {formatDate(new Date(task.endDate))}</div></Typography>
                      </div>
                      <div className="w-1/2">
                        <Typography>Dependencies:</Typography>
                        <div className="flex gap-2">
                        {task.dependencies.map(depId => {
                            const depTask = tasks.find(t => t._id === depId);
                            if (!depTask) {
                              return (
                                <Typography key={depId} style={{ color: 'red' }}>
                                  Dependency task not found
                                </Typography>
                              );
                            }
                            const stageColor = depTask.stage === 'todo' ? 'bg-red-500' : depTask.stage === 'in progress' ? 'bg-amber-300' : 'bg-green-500';
                            return (
                              <div key={depId} className={`${stageColor} text-black rounded p-2`}>
                                {depTask.title}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Paper>
  
  );
};

export default EnhancedTable;
