import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, TableSortLabel, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { MdAttachFile, MdOutlineReadMore, MdRestore, MdDelete } from 'react-icons/md';
import { BiMessageAltDetail } from 'react-icons/bi';
import { FaList } from 'react-icons/fa';
import clsx from 'clsx';
import UserInfo from '../UserInfo';
import { TASK_TYPE, formatDate, BGS, prioritize } from '../../utils';
import { useNavigate } from 'react-router-dom';

const EnhancedTable = ({
  tasks,
  showSearch = true,
  showStageFilter =true,
  enablePrioritySort = true,
  enableCreatedAtSort =true,
  enableActions = true,
  onRestoreTask,
  onDeleteTask,
  visibleColumns = ['progress', 'title', 'priority', 'createdAt', 'team', 'actions', "admin"],

}) => {
  const [orderDirection, setOrderDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [filter, setFilter] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const navigate = useNavigate();

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

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {showSearch && (
          <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
            <TextField
              label="Search For Task"
              variant="outlined"
              fullWidth
              sx={{ flexGrow: 1, marginRight: 2 }}
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
                {visibleColumns.includes('assets') && <TableCell>Assets</TableCell>}
                {visibleColumns.includes('team') && <TableCell>Team</TableCell>}
                {visibleColumns.includes('actions') && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((task, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
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
                  {visibleColumns.includes('team') && (
                    <TableCell>
                      <div className='flex'>
                        {task.team.map((m, index) => (
                          <div key={m._id} className={clsx("w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1", BGS[index % BGS.length])}>
                            <UserInfo user={m} />
                          </div>
                        ))}
                      </div>
                    </TableCell>
                  )}
                  {visibleColumns.includes('actions') && (
                    <TableCell>
                      <Button onClick={() => viewDetails(task._id)} startIcon={<MdOutlineReadMore />} >
                        View
                      </Button>
                    </TableCell>
                  )}
                   {visibleColumns.includes('admin') && (
                   <TableCell>
                   <Button  onClick={() => onRestoreTask(task._id)}><MdRestore size={"20"}/></Button>
                   <Button onClick={() => onDeleteTask(task._id)} color="error"><MdDelete size={"20"} /></Button>
                 </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default EnhancedTable;
