import React, { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { tasks, users } from "../assets/data";
import UserTable from "../components/user/UserTable";
import AddUser from "../components/user/AddUser";
import ConfirmatioDialog from "../components/Dialogs";

const Users = () => {
  const [openAddUser, setOpenAddUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const addUserHandler = () => {
    setSelectedUser(null);  // Reset selected user
    setOpenAddUser(true);
  };


  const editUserHandler = (user) => {
    setSelectedUser(user);
    setOpenAddUser(true);
  };

  const deleteUserHandler = (id) => {
    console.log("Delete User:", id);
    // delete user API call
  };

  return (
    <>
      <div className='w-full md:px-1 px-0 my-6'>
        <div className='flex items-center justify-between mb-8'>
          <Title title='Team Members' />
          <Button
            label='Add New User'
            onClick={addUserHandler}
            className='bg-blue-600 text-white rounded-md py-2 px-4'
          />
        </div>

        <UserTable
          users={users}
          showSearch={true}
          enableActions={true}
          onEditUser={editUserHandler}
          onDeleteUser={deleteUserHandler}
        />

      
      </div>

      <ConfirmatioDialog
        open={false} // Controlled based on some state when delete is initiated
        setOpen={() => {}} // Handler to close the dialog
        onConfirm={deleteUserHandler}
      />

{openAddUser && (
          <AddUser
            open={openAddUser}
            setOpen={setOpenAddUser}
            userData={selectedUser}
            key={selectedUser ? selectedUser._id : 'new'}
          />
        )}
    </>
  );
};

export default Users;
