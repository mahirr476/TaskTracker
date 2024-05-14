import React, { useState, useEffect } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectList from "../SelectList";
import { BiImages } from "react-icons/bi";
import Button from "../Button";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const AddTask = ({ open, setOpen, task, users }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [team, setTeam] = useState([]);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(task?.priority?.toUpperCase() || PRIORITY[2]);
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Set form defaults when task is provided
  useEffect(() => {
    if (task && users) {
      reset({
        title: task.title,
        date: task.date?.slice(0, 10) // Assuming task.date is in ISO format
      });
      setTeam(users.filter(user => task.team.includes(user._id))); // Map user IDs to user objects
      setStage(task.stage?.toUpperCase() || LISTS[0]);
      setPriority(task.priority?.toUpperCase() || PRIORITY[2]);
      // Optionally set assets based on task.assets if needed
    }
  }, [task, reset, users]);

  const submitHandler = data => {
    const teamIds = team.map(user => user._id); // Correctly accessing _id from user object
    if (task) {
      // Update task logic here
      console.log("Updating Task with IDs:", teamIds);
    } else {
      // Add task logic here
      console.log("Adding Task with IDs:", teamIds);
    }
  };

  const handleSelect = e => {
    setAssets([...e.target.files]);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Dialog.Title as="h2" className="text-lg font-bold text-gray-900 mb-4">
            {task ? "Update Task" : "Add Task"}
          </Dialog.Title>

          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Task Title"
              type="text"
              name="title"
              label="Task Title"
              className="w-full rounded"
              register={register("title", { required: "Title is required" })}
              error={errors.title ? errors.title.message : ""}
            />

            <UserList setTeam={setTeam} team={team} users={users} />

            <div className="flex gap-4">
              <SelectList
                label="Task Stage"
                lists={LISTS}
                selected={stage}
                setSelected={setStage}
              />

              <Textbox
                placeholder="Date"
                type="date"
                name="date"
                label="Task Date"
                className="w-full rounded"
                register={register("date", {
                  required: "Date is required!",
                })}
                error={errors.date ? errors.date.message : ""}
              />
            </div>

            <SelectList
              label="Priority Level"
              lists={PRIORITY}
              selected={priority}
              setSelected={setPriority}
            />

            <div className="flex items-center justify-center mt-4">
              <label
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                htmlFor="imgUpload"
              >
                <input
                  type="file"
                  className="hidden"
                  id="imgUpload"
                  onChange={handleSelect}
                  accept=".jpg, .jpeg, .png"
                  multiple
                />
                <BiImages />
                <span>Add Assets</span>
              </label>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button type="submit" label="Submit" className="bg-blue-500 text-white" />
              <Button type="button" onClick={() => setOpen(false)} label="Cancel" className="bg-gray-300 text-black" />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddTask;
