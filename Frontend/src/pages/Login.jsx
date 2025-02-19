import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios'
const Login = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
  const { id } = useParams();
   const [inputValues,setInputValues]=useState({
    name:'',
    password:''
   })
 const navigate = useNavigate();
 
  const [err, setErr] = useState(null);
  axios.defaults.withCredentials=true;
  const handelSub = async(event) => {
    try {
      const res = await axios.post('http://localhost:3000/auth/login', inputValues);
      if (res.data.Status === "Success") {
        navigate("/home");
      } else {
        alert(res.data.Message);
      }
    } catch (err) {
      setErr(err.response?.data || "An error occurred");
    }
   
   
  };
  const inputClass = 'w-11/12 h-14 bg-slate-100 rounded-xl pl-5 ml-7 lg:max-w-full md:min-w-fit';
  const errorClass = 'text-left ml-8 text-red-500 text-sm';
  const buttonClass = 'bg-purple-600 text-center w-11/12 h-14 rounded-xl mt-5 text-lg font-serif font-medium text-slate-100 ml-7 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-purple-800 duration-500';

  return (
    <div className='flex h-[100vh] w-[100vw] items-center justify-center bg-purple-200 md:items-center'>
      <div className="absolute inset-0 rounded-3xl h-5/6 w-5/6 mx-28 my-12 flex justify-center flex-row bg-white">
        <img src="https://plus.unsplash.com/premium_photo-1684785617081-2962277d3ac3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='lg:visible max-lg:hidden max-2xl:w-6/12 max-2xl:h-11/12 m-6 rounded-3xl' />
        
        <div className='m-10 pr-5 text-center'>
          <div className='ml-7'>
            <b className='text-4xl'>Welcome Back</b>
            <p className='text-slate-500 text-sm'>Please login to your account</p>
          </div>
          
          <form onSubmit={handleSubmit(handelSub)}>
            <input
            type="name"
            name='name'
            placeholder='Email address'
            className={inputClass + ' my-6'}
            onChange={e=>{setInputValues({...inputValues,name:e.target.value})}}
            {...register("name", {
              required: { value: true, message: "This Field is required" },
              minLength: { value: 3, message: "Min length is 3" }
            })}
            />
            {errors.name && <div className={errorClass}>{errors.name.message}</div>}
            
            <input
              type="password"
              name='password'
              placeholder='Password'
              className={inputClass}
              onChange={e=>{setInputValues({...inputValues,password:e.target.value})}}
              {...register("password", {
                required: { value: true, message: "This Field is required" },
                minLength: { value: 3, message: "Min length is 3" },
                maxLength: { value: 10, message: "Max length is 10" }
              })}
            />
            {errors.password && <div className={errorClass}>{errors.password.message}</div>}
            
           {/**  <Link to={id === 'admin' ? "/dashboard/admin" : "/home"}>
              <button className={buttonClass} disabled={!isValid}>
                Sign in
              </button>
            </Link>*/}
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
