import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, TableSortLabel, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { MdAttachFile, MdOutlineReadMore } from 'react-icons/md';
import { BiMessageAltDetail } from 'react-icons/bi';
import { FaList } from 'react-icons/fa';
import clsx from 'clsx';
import UserInfo from '../UserInfo';
import { TASK_TYPE, formatDate, BGS, prioritize,  } from '../../utils';
import { useNavigate } from 'react-router-dom';
import ConfirmatioDialog from '../Dialogs';

const EnhancedTable = ({ tasks }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [orderDirection, setOrderDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [filter, setFilter] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const navigate = useNavigate();
  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
  const sortedItems = useMemo(() => {
    return tasks.sort((a, b) => {
      if (!orderBy) return 0;
      if (orderBy === 'priority') {
        return prioritize(a[orderBy], b[orderBy], orderDirection);
      } else if (orderBy === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return orderDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });
  }, [tasks, orderBy, orderDirection]);
  

  const filteredItems = sortedItems.filter(task => task.title.toLowerCase().includes(filter.toLowerCase())&&
  (stageFilter ? task.stage === stageFilter : true));

  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const viewDetails = (id) => {
    navigate(`/tasks/${id}`);  // Navigate to task details page
  };

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
        <TextField
          label="Search For Task"
          variant="outlined"
          fullWidth
          sx={{ flexGrow: 1, marginRight: 2 }}  // Adjust max width to fit better
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
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
      </Box>
        <TableContainer sx={{ maxHeight: 450 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Progress</TableCell>
                <TableCell>Task Title</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'priority'}
                    direction={orderBy === 'priority' ? orderDirection : 'asc'}
                    onClick={() => handleSortRequest('priority')}
                  >
                    Priority
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'date'}
                    direction={orderBy === 'date' ? orderDirection : 'asc'}
                    onClick={() => handleSortRequest('date')}
                  >
                    Created At
                  </TableSortLabel>
                </TableCell>
                <TableCell>Assets</TableCell>
                <TableCell>Team</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((task, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell component="th" scope="row">
                    <div className='flex items-center gap-2'>
                      <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} />
                    </div>
                    </TableCell>
                  <TableCell component="th" scope="row">
                    <div className='flex items-center gap-2'>
                      <p className='line-clamp-2 text-base'>{task.title}</p>
                    </div>
                  </TableCell>
                  <TableCell className={({
                    'bg-red-100': task.priority === 'high',
                    'bg-yellow-100': task.priority === 'medium',
                    'bg-blue-100': task.priority === 'normal',
                    'bg-green-100': task.priority === 'low'
                  })}>
                    <span className='flex items-center justify-center capitalize'>{task.priority}</span>
                  </TableCell>
                  <TableCell>{formatDate(new Date(task.date))}</TableCell>
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
                  <TableCell>
                    <div className='flex'>
                      {task.team.map((m, index) => (
                        <div key={m._id} className={clsx("w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1", BGS[index % BGS.length])}>
                          <UserInfo user={m} />
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => viewDetails(task._id)} startIcon={<MdOutlineReadMore />} >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      /> */}
    </>
  );
};

export default EnhancedTable;
