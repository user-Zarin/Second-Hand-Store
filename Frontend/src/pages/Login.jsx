import React, { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios'
import { UserContext } from '../context/User';
const Login = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
  const { id } = useParams();
  
 const navigate = useNavigate();
 const { login } = useContext(UserContext);
  const [err, setErr] = useState(null);
  axios.defaults.withCredentials=true;
  const handelSub = async(data) => {
    try {
      const res = await login(data)
     if(res.success){
      if(id === 'admin'){
        navigate("/dashboard/admin")
      }else{
      navigate("/home");
      }
    }
      
    } catch (err) {
      setErr(err.response?.data || "An error occurred");
    }
   
   
  };
  const inputClass = 'w-11/12 h-14 bg-slate-100 rounded-xl pl-5 ml-7 lg:max-w-full md:min-w-fit';
  const errorClass = 'text-left ml-8 text-red-500 text-sm';
  const buttonClass = 'bg-gradient-to-r from-cyan-400 to-blue-500 text-center w-11/12 h-14 rounded-xl mt-5 text-lg font-serif font-medium text-slate-100 ml-7 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-purple-800 duration-500';

  return (
    <div className='flex h-[100vh] w-[100vw] items-center justify-center bg-blue-100 md:items-center'>
      <div className="absolute inset-0 rounded-3xl h-5/6 w-5/6 mx-28 my-12 flex justify-center flex-row bg-white">
        <img src="https://plus.unsplash.com/premium_photo-1684785617081-2962277d3ac3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='lg:visible max-lg:hidden max-2xl:w-6/12 max-2xl:h-11/12 m-6 rounded-3xl' />
        
        <div className='m-10 pr-5 text-center'>
          <div className='ml-7'>
            <b className='text-4xl'>Welcome Back</b>
            <p className='text-slate-500 text-sm'>Please login to your account</p>
          </div>
          
          <form onSubmit={handleSubmit(handelSub)}>
            <input
            type="email"
            name='email'
            placeholder='Email address'
            className={inputClass + ' my-6'}
            
            {...register("email", {
              required: { value: true, message: "This Field is required" },
              minLength: { value: 3, message: "Min length is 3" }
            })}
            />
            {errors.email && <div className={errorClass}>{errors.email.message}</div>}
            
            <input
              type="password"
              name='password'
              placeholder='Password'
              className={inputClass}
             
              {...register("password", {
                required: { value: true, message: "This Field is required" },
                minLength: { value: 3, message: "Min length is 3" },
                maxLength: { value: 10, message: "Max length is 10" }
              })}
            />
            {errors.password && <div className={errorClass}>{errors.password.message}</div>}
            
           
           
          <button className={buttonClass} disabled={!isValid}>
                Sign in
              </button>
          </form>

          <p className='text-slate-500 text-sm pt-3 ml-7'>
            Don't have an account? <Link to="/signup" className='text-blue-500 underline'>signup</Link>
          </p>
          {id === 'admin' ? (
                      <p className='text-slate-500 text-sm pt-3'> <Link to={"/login"} className='text-blue-500 underline'>Login </Link> as User</p>
                    ) : (
                      <p className='text-slate-500 text-sm pt-3'> <Link to={"/login/admin"} className='text-blue-500 underline'>Login </Link> as Admin</p>
                    )}
      
        </div>
      </div>
    </div>
  );
}

export default Login;
