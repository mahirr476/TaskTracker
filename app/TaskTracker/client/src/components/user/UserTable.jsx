import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, TableSortLabel, Box, Button } from '@mui/material';
import clsx from 'clsx';
import UserAvatar from '../UserAvatar'; // Ensure this path is correct

const UserTable = ({
  users,
  showSearch = true,
  visibleColumns = ['avatar', 'name', 'title', 'role', 'isActive', 'createdAt'],
  enableActions = false,
  onEditUser,
  onDeleteUser,
}) => {
  const [filter, setFilter] = useState('');
  const [orderDirection, setOrderDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedItems = useMemo(() => {
    return users.sort((a, b) => {
      if (!orderBy) return 0;
      if (typeof a[orderBy] === 'string') {
        return orderDirection === 'asc' ? a[orderBy].localeCompare(b[orderBy]) : b[orderBy].localeCompare(a[orderBy]);
      } else if (orderBy === 'createdAt') {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return orderDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });
  }, [users, orderBy, orderDirection]);

  const filteredItems = sortedItems.filter(user => user.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {showSearch && (
        <Box sx={{ display: 'flex', padding: 2 }}>
          <TextField
            label="Search Users"
            variant="outlined"
            fullWidth
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
        </Box>
      )}
      <TableContainer sx={{ maxHeight: 450 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {visibleColumns.includes('avatar') && <TableCell>Avatar</TableCell>}
              {visibleColumns.includes('name') && <TableCell>Name</TableCell>}
              {visibleColumns.includes('title') && <TableCell>Title</TableCell>}
              {visibleColumns.includes('role') && <TableCell>Role</TableCell>}
              {visibleColumns.includes('isActive') && <TableCell>Status</TableCell>}
              {visibleColumns.includes('createdAt') && <TableCell>Created At</TableCell>}
              {enableActions && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((user, index) => (
              <TableRow key={user._id}>
                {visibleColumns.includes('avatar') && <TableCell><UserAvatar user={user} index={index} /></TableCell>}
                {visibleColumns.includes('name') && <TableCell>{user.name}</TableCell>}
                {visibleColumns.includes('title') && <TableCell>{user.title}</TableCell>}
                {visibleColumns.includes('role') && <TableCell>{user.role}</TableCell>}
                {visibleColumns.includes('isActive') && (
                  <TableCell>
                    <span className={clsx(
                      "px-3 py-1 rounded-full text-sm",
                      user.isActive ? "bg-green-200" : "bg-amber-100"
                    )}>
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                )}
                {visibleColumns.includes('createdAt') && <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>}
                {enableActions && (
                  <TableCell>
                    <Button onClick={() => onEditUser(user)} color="primary">Edit</Button>
                    <Button onClick={() => onDeleteUser(user._id)} color="secondary">Delete</Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UserTable;
