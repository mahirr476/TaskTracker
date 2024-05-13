import React, { useState, useEffect } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import SelectList from "../SelectList";
import Button from "../Button";

const STATUS = ["PLANNING", "IN PROGRESS", "COMPLETED"];

const AddProj = ({ open, setOpen, project }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [status, setStatus] = useState(project?.status?.toUpperCase() || STATUS[0]);
  
  // Set form defaults when project is provided
  useEffect(() => {
    if (project) {
      reset({
        projectName: project.projectName,
        description: project.description,
        startDate: project.startDate?.slice(0, 10), // Assuming startDate is in ISO format
        endDate: project.endDate?.slice(0, 10) // Assuming endDate is in ISO format
      });
      setStatus(project.status?.toUpperCase() || STATUS[0]);
    }
  }, [project, reset]);

  const submitHandler = (data) => {
    if (project) {
      // Update project logic
    } else {
      // Add project logic
    }
    console.log(data); // Log data for debug
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Dialog.Title as='h2' className='text-base font-bold leading-6 text-gray-900 mb-4'>
            {project ? "Update Project" : "Add Project"}
          </Dialog.Title>
          
          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Project Name'
              type='text'
              name='projectName'
              label='Project Name'
              className='w-full rounded'
              register={register("projectName", { required: "Project name is required" })}
              error={errors.projectName ? errors.projectName.message : ""}
            />

            <Textbox
              placeholder='Description'
              type='text'
              name='description'
              label='Description'
              className='w-full rounded'
              register={register("description")}
            />

            <div className='flex gap-4'>
              <Textbox
                placeholder='Start Date'
                type='date'
                name='startDate'
                label='Start Date'
                className='w-full rounded'
                register={register("startDate", {
                  required: "Start date is required!",
                })}
                error={errors.startDate ? errors.startDate.message : ""}
              />

              <Textbox
                placeholder='End Date'
                type='date'
                name='endDate'
                label='End Date'
                className='w-full rounded'
                register={register("endDate", {
                  required: "End date is required!",
                })}
                error={errors.endDate ? errors.endDate.message : ""}
              />
            </div>

            <SelectList
              label='Project Status'
              lists={STATUS}
              selected={status}
              setSelected={setStatus}
            />

            <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
              <Button
                label='Submit'
                type='submit'
                className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto'
              />

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Cancel'
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddProj;
