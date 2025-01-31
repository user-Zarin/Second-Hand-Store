import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    console.log(data);
    alert("Sign Up Successful");
  };

  return (
    <div className='flex h-screen w-screen items-center justify-center bg-purple-200'>
      <div className="absolute inset-0 lg:rounded-3xl lg:h-5/6 lg:w-5/6 lg:mx-28 lg:my-10 flex justify-center flex-col md:flex-row bg-white">
        <img src="https://plus.unsplash.com/premium_photo-1684785617081-2962277d3ac3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Background" className='hidden lg:block lg:w-6/12 lg:h-11/12 m-6 rounded-3xl' />

        <div className='mt-7 pr-6 text-center items-center w-full lg:w-1/2'>
          <div className='ml-7'>
            <b className='text-4xl'>Create an Account</b>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='px-8 lg:px-0'>
            <input
              type="text"
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
              placeholder='Email address'
              className='w-full lg:w-11/12 h-10 bg-slate-100 my-6 rounded-xl pl-5 mt-4'
              {...register("Email", {
                required: { value: true, message: "This Field is required" },
                minLength: { value: 3, message: "Min length is 3" }
              })}
            />
            {errors.Email && <div className='text-left ml-2 text-red-500 text-sm'>{errors.Email.message}</div>}

            <input
              type="password"
              placeholder='Create Password'
              className='w-full lg:w-11/12 h-10 rounded-xl bg-slate-100 pl-5 mt-4'
              {...register("password", {
                required: { value: true, message: "This Field is required" },
                minLength: { value: 3, message: "Min length is 3" },
                maxLength: { value: 10, message: "Max length is 10" }
              })}
            />
            {errors.password && <div className='text-left ml-2 text-red-500 text-sm'>{errors.password.message}</div>}

            <p className='text-right text-xs'>Forgot password?</p>
            <Link to={"/home"}>
              <button
                className='bg-purple-600 text-center w-full lg:w-11/12 h-14 rounded-xl mt-5 text-lg font-serif font-medium text-slate-100 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-purple-800 duration-500'
                disabled={!isValid}
              >
                Sign Up
              </button>
            </Link>
          </form>

          <p className='text-slate-500 text-sm pt-3'>Already have an account? <Link to={"/login"} className='text-blue-500 underline'>Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
