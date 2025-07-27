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
    <div className="flex min-h-screen w-full items-center justify-center bg-blue-100 px-4">
  <div className="relative flex flex-col lg:flex-row bg-white rounded-3xl w-full max-w-6xl h-[90vh] shadow-lg overflow-hidden">
    
    {/* Image - shown only on large screens */}
    <img
      src="https://plus.unsplash.com/premium_photo-1684785617081-2962277d3ac3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="login"
      className="hidden lg:block lg:w-1/2 object-cover"
    />

    {/* Form Container */}
    <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6 sm:p-10 text-center">
      <div className="w-full max-w-md">
        <h2 className="text-4xl font-bold mb-2">Welcome Back</h2>
        <p className="text-slate-500 text-sm mb-6">Please login to your account</p>

        <form onSubmit={handleSubmit(handelSub)} className="space-y-5">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full h-10 bg-slate-100 rounded-xl pl-5"
              {...register("email", {
                required: { value: true, message: "This Field is required" },
                minLength: { value: 3, message: "Min length is 3" }
              })}
            />
            {errors.email && (
              <div className="text-left text-red-500 text-sm">{errors.email.message}</div>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full h-10 bg-slate-100 rounded-xl pl-5"
              {...register("password", {
                required: { value: true, message: "This Field is required" },
                minLength: { value: 3, message: "Min length is 3" },
                maxLength: { value: 10, message: "Max length is 10" }
              })}
            />
            {errors.password && (
              <div className="text-left text-red-500 text-sm">{errors.password.message}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-xl disabled:opacity-50"
            disabled={!isValid}
          >
            Sign in
          </button>
        </form>

        <p className="text-slate-500 text-sm pt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 underline">
            Signup
          </Link>
        </p>

        {id === "admin" ? (
          <p className="text-slate-500 text-sm pt-2">
            <Link to={"/login"} className="text-blue-500 underline">
              Login
            </Link>{" "}
            as User
          </p>
        ) : (
          <p className="text-slate-500 text-sm pt-2">
            <Link to={"/login/admin"} className="text-blue-500 underline">
              Login
            </Link>{" "}
            as Admin
          </p>
        )}
      </div>
    </div>
  </div>
</div>

  );
}

export default Login;
