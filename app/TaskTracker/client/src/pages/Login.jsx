// Login.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import Textbox from '../components/Textbox'
import Button from '../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/slices/authSlice' // Adjust action creators as per your authSlice
import { users } from '../assets/data'
import { Transition } from '@headlessui/react';
import { MdOutlineLogin } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa6";



const Login = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  
  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);
  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const submitHandler = data => {
    console.log(data);
    if (isRegistering) {
      // Here, add your registration logic
      console.log('Registering new user:', data);
      // After registration, you might want to automatically log them in or confirm their email, etc.
      setIsRegistering(false); // Switch back to login form after registration
    } else {
      const foundUser = users.find(u => u.email === data.email && u.password === data.password);
      if (foundUser) {
        dispatch(loginUser(foundUser));
        navigate("/dashboard");
      } else {
        console.error("Invalid credentials");
      }
    }
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    reset(); // Reset form fields when switching forms
  };

  return (
    <div className="w-full py-5 min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
      <div className="w-full md:w-auto flex gap-0 flex-col items-center justify-center">
        {/*Left Side*/}
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full mb-5  md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:mt-20">
           
            <div className='text-4xl md:text-6xl 2xl:text-5xl flex flex-col gap-2 justify-center items-center text-center  text-blue-500'>
              <span >TaskTracker</span>
              <span className='flex py-1 px-3 border rounded-full text-sm md:text-base lg:text-xl border-gray-300 text-gray-600'>
                Paragon IT
              </span>
            </div>
            

            {/* <div className='cell'>
              <div className="circle rotate-in-up-left  ">
              </div> 
            </div> */}
          </div>
        </div>
        
        {/*Right Side*/}
        <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
        <Transition
            show={!isRegistering}
            as="div"
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
          <form onSubmit={handleSubmit(submitHandler)} className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'>
            <div className="">
              <p className="text-blue-500 text-3xl font-bold text-center">Welcome Back!</p>
              <p className='text-center text-base text-gray-700'>Keep all your credentials safe</p>
            </div>

            <div className="flex flex-col gap-y-5">
              <Textbox 
                placeholder={"email@example.com"}
                type="email"
                name="email"
                label="Email Address"
                className="w-full rounded-full"
                register={register("email", {
                  required: "Email Address is required!",
                })}
                error={errors.email ? errors.email.message : ""} 
              />
            </div>
            <div className="flex flex-col gap-y-5">
              <Textbox 
                placeholder={"Your Password"}
                type="password"
                name="password"
                label="Password"
                className="w-full rounded-full"
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password.message : ""} 
              />

              <span className='text-sm text-gray-500 hover:text-blue-500 hover:underline cursor-pointer'>
                Forget Password?
              </span>

              <Button 
                type='submit'
                label='Submit'
                className='w-full h-10 bg-blue-500 text-white rounded-full' />
            </div>
          </form>
          </Transition>

          <Transition
            show={isRegistering}
            as="div"
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
          <form onSubmit={handleSubmit(submitHandler)} className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'>

            <div className="text-center">
              <p className="text-3xl font-bold text-blue-500">Register</p>
              <p className='text-gray-700'>Create your account</p>
            </div>

            <Textbox 
              placeholder="Full Name"
              type="text"
              name="name"
              label="Full Name"
              className="w-full rounded-full"
              register={register("name", {
                required: "Full Name is required!",
              })}
              error={errors.name ? errors.name.message : ""}
            />

            <Textbox 
              placeholder="email@example.com"
              type="email"
              name="email"
              label="Email Address"
              className="w-full rounded-full"
              register={register("email", {
                required: "Email is required!",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Email is not valid",
                }
              })}
              error={errors.email ? errors.email.message : ""}
            />

            <Textbox 
              placeholder="Password"
              type="password"
              name="password"
              label="Password"
              className="w-full rounded-full"
              register={register("password", {
                required: "Password is required!",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters"
                }
              })}
              error={errors.password ? errors.password.message : ""}
            />

            <Textbox 
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              className="w-full rounded-full"
              register={register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === watch('password') || "Passwords do not match"
              })}
              error={errors.confirmPassword ? errors.confirmPassword.message : ""}
            />

            <Button 
              type='submit'
              label='Register'
              className='w-full h-10 bg-blue-500 text-white rounded-full'
            />

            </form>
          </Transition>
          
          <Button onClick={toggleForm} className='mt-4 w-[15rem] p-0 flex bg-gray-300 rounded justify-center items-center flex-row-reverse gap-2  text-black hover:bg-blue-500 hover:text-white ' icon={isRegistering ? <MdOutlineLogin/>: <FaUserPlus />} label={isRegistering ? "Back to Login" : "Create New Account"}/>
            

        </div>
      </div>
    </div>
  )
}

export default Login
