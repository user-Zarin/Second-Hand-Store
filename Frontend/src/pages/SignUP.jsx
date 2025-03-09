import React, { useState } from 'react';
import { Link, useParams, useNavigate, data } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
  const { id } = useParams();
 
  const navigate = useNavigate();
  const [err, setErr] = useState(null);

 
  const handleSub = async (data) => {
   
    try {
      const res=await axios.post("http://localhost:3300/auth/signup", data,{
        withCredentials : true
      })
     .then(res=>{
      if(res.status===201){
       if(id==='admin'){
        alert("Registration Successful");
        navigate('/dashboard/admin');
       }
       else{
        alert("Registration Successful");
        navigate('/login')
       }
      }
      else{
        alert("error")
      }
     })
      
    } catch (err) {
      setErr(err.response?.data || "An error occurred");
    }
  };

  const buttonClass = 'bg-purple-600 text-center w-11/12 h-14 rounded-xl mt-5 text-lg font-serif font-medium text-slate-100 ml-7 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-purple-800 duration-500';

  return (
    <div className='flex h-screen w-screen items-center justify-center bg-purple-200'>
      <div className="absolute inset-0 lg:rounded-3xl lg:h-5/6 lg:w-5/6 lg:mx-28 lg:my-10 flex justify-center flex-col md:flex-row bg-white">
        <img src="https://plus.unsplash.com/premium_photo-1684785617081-2962277d3ac3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Background" className='hidden lg:block lg:w-6/12 lg:h-11/12 m-6 rounded-3xl' />

        <div className='mt-7 pr-6 text-center items-center w-full lg:w-1/2'>
          <div className='ml-7'>
            <b className='text-4xl'>Create an Account</b>
          </div>

          <form onSubmit={handleSubmit(handleSub)} className='px-8 lg:px-0'>
            <input
              type="text"
              name='name'
              placeholder='Enter your name'
              className='w-full lg:w-11/12 h-10 bg-slate-100 my-5 rounded-xl pl-5 mt-6'
              {...register("name", {
                required: { value: true, message: "This Field is required" },
                minLength: { value: 3, message: "Min length is 3" }
              })}
            />
            {errors.name && <div className='text-left ml-2 text-red-500 text-sm'>{errors.name.message}</div>}

            <input
              type="email"
              name='email'
              placeholder='Email address'
              className='w-full lg:w-11/12 h-10 bg-slate-100 my-6 rounded-xl pl-5 mt-4'
              {...register("email", {
                required: { value: true, message: "This Field is required" },
                minLength: { value: 3, message: "Min length is 3" }
              })}
            />
            {errors.email && <div className='text-left ml-2 text-red-500 text-sm'>{errors.email.message}</div>}

            <input
              type="password"
              name='password'
              placeholder='Create Password'
              className='w-full lg:w-11/12 h-10 rounded-xl bg-slate-100 pl-5 mt-4'
              {...register("password", {
                required: { value: true, message: "This Field is required" },
                minLength: { value: 3, message: "Min length is 3" },
                maxLength: { value: 10, message: "Max length is 10" }
              })}
            />
            {errors.password && <div className='text-left ml-2 text-red-500 text-sm'>{errors.password.message}</div>}

            <button className={buttonClass} disabled={!isValid} type="submit">
              Sign up
            </button>
          </form>

          <p className='text-slate-500 text-sm pt-3'>Already have an account? <Link to={"/login"} className='text-blue-500 underline'>Login</Link></p>
          {id === 'admin' ? (
            <p className='text-slate-500 text-sm pt-3'> <Link to={"/signup"} className='text-blue-500 underline'>Sign up</Link> as User</p>
          ) : (
            <p className='text-slate-500 text-sm pt-3'> <Link to={"/signup/admin"} className='text-blue-500 underline'>Sign up</Link> as Admin</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
