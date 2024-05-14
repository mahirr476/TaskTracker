import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // If you're using Redux to store user data
import { useForm } from 'react-hook-form';
import { Dialog } from '@headlessui/react';
import ModalWrapper from '../ModalWrapper';
import Textbox from '../Textbox';
import Button from '../Button';
import UserAvatar from '../UserAvatar';  // Assuming UserAvatar is correctly imported


const Profile =  () => {
  const user = useSelector(state => state.auth.user); // Assuming user info is stored in auth.user

  const { register, handleSubmit, watch, reset, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email
    }
  });

  const [editMode, setEditMode] = useState({
    name: false,
    password: false
  });

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    reset(user); // Reset form when user data changes
  }, [user, reset]);

  const toggleEdit = (field) => {
    setEditMode(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const saveChanges = (data) => {
    console.log('Saving changes:', data);
    // Here you would typically make an API call to update the user data
    setEditMode({ name: false, password: false }); // Reset edit modes
  };

  const openChangePasswordModal = () => {
    setOpenModal(true);
  };

  return (
    <div className='bg-white shadow rounded-lg p-6'>
      <div className='flex items-center space-x-6 mb-4'>
        <UserAvatar user={user} />
        <div>
          {editMode.name ? (
            <form onSubmit={handleSubmit(saveChanges)}>
              <Textbox
                register={register("name", { required: "Name is required" })}
                name="name"
                type="text"
                error={errors.name && errors.name.message}
              />
              <button type='submit' className='text-blue-600'>Save</button>
            </form>
          ) : (
            <h2 className='text-lg font-bold'>{user.name}</h2>
          )}
          <p className='text-gray-600'>{user.email}</p>
          <button onClick={() => toggleEdit('name')} className='text-sm text-blue-600'>Edit Name</button>
        </div>
      </div>

      <div className='space-y-3'>
        <Button label="Change Password" onClick={openChangePasswordModal} className='text-sm bg-blue-600 text-white'/>
      </div>

      {openModal && (
        <ModalWrapper open={openModal} setOpen={setOpenModal}>
          <Dialog.Title className='text-lg'>Change Password</Dialog.Title>
          <form onSubmit={handleSubmit(saveChanges)}>
            <Textbox
              register={register("password")}
              name="password"
              type="password"
              label="New Password"
            />
            <Button type="submit" label="Update Password" className='bg-blue-600 text-white'/>
          </form>
        </ModalWrapper>
      )}

      <Button
        label="Save Changes"
        onClick={() => handleSubmit(saveChanges)()}
        disabled={!isDirty}
        className={isDirty ? 'bg-green-500 text-white' : 'bg-gray-300 text-white'}
      />
    </div>
  );
};

export default Profile;
