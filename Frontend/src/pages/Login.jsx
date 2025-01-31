import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';


const Login = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    console.log(data);
    alert("Login Successful");
  };

  return (
    <div className='flex h-[100vh] w-[100vw] items-center justify-center bg-purple-200'>
      <div className="absolute inset-0 rounded-3xl h-5/6 w-5/6 mx-28 my-12 flex justify-center flex-row bg-white">
        <img src="https://plus.unsplash.com/premium_photo-1684785617081-2962277d3ac3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='lg:visible max-lg:hidden max-2xl:w-6/12 max-2xl:h-11/12 m-6 rounded-3xl' />
        
        <div className='m-10 pr-5 text-center'>
          <div className='ml-7'>
            <b className='text-4xl'>Welcome Back</b>
            <p className='text-slate-500 text-sm'>Please login to your account</p>
          </div>
          
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              placeholder='Email address'
              className='w-11/12 h-14 bg-slate-100 my-6 rounded-xl pl-5 ml-7 lg:max-w-full md:min-w-fit'
              {...register("Email", {
                required: { value: true, message: "This Field is required" },
                minLength: { value: 3, message: "Min length is 3" }
              })}
            />
            {errors.Email && <div className='text-left ml-8 text-red-500 text-sm'>{errors.Email.message}</div>}
            
            <input
              type="password"
              placeholder='Password'
              className='w-11/12 h-14 rounded-xl bg-slate-100 pl-5 ml-7 lg:max-w-full md:min-w-fit'
              {...register("password", {
                required: { value: true, message: "This Field is required" },
                minLength: { value: 3, message: "Min length is 3" },
                maxLength: { value: 10, message: "Max length is 10" }
              })}
            />
            {errors.password && <div className='text-left ml-8 text-red-500 text-sm'>{errors.password.message}</div>}
            
            <p className='text-right mr-7 text-xs'>Forgot password?</p>
            <Link to={"/home"}>
              <button
                className='bg-purple-600 text-center w-11/12 h-14 rounded-xl mt-5 text-lg font-serif font-medium text-slate-100 ml-7 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-purple-800 duration-500'
                disabled={!isValid}
              >
                Sign in
              </button>
            </Link>
          </form>

          <p className='text-slate-500 text-sm pt-3 ml-7'>
            Don't have an account? <Link to={"/signup"} className='text-blue-500 underline'>signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
