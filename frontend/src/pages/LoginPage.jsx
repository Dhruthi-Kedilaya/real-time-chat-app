import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Eye, EyeOff, Key, Loader2, Mail, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import Pattern from '../components/pattern';

const LoginPage = () => {
  const {logIn,isLoggingIn}=useAuthStore();
  const [showPassword,setShowPassword]=useState(false);
  const [formData,setFormData]=useState({
    email:"",
    password:""
  });
  const validate=(data)=>{
    if(!data.email) return toast.error("Enter your email");
    if(!data.password) return toast.error("Enter password");
    if(data.password.length<6) return toast.error("Password must have atleast 6 characters");
    return true;
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(formData);
    const result=validate(formData);
    if(result===true){
      logIn(formData);
    }
    
  }
  return (
    <div className='h-screen w-full grid lg:grid-cols-2'>
      <div className='flex flex-col items-center justify-center bg-base-100 p-6 sm:p-12 text-base-content'>
        <div className='p-2 bg-primary/10 rounded-lg mb-2 animate-bounce'>
          <MessageSquare className='size-10 text-primary'/> 
        </div>
        <div className='text-3xl font-medium'>LogIn To Your Account</div>
        <div className='font-normal mb-6 text-center'>Pick up right where you left off — your chats are waiting!</div>

          <form onSubmit={(e)=>{handleSubmit(e)}} className='space-y-4 w-full max-w-lg'>
            
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='size-5 text-base-content'/>
                </div>
                <input type='email' placeholder='Enter your email' className={`input input-bordered w-full pl-10`} value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})}/>
              </div>
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Key className='size-5 text-base-content'/>
                </div>
                <input type={showPassword ? "text" : "password"} placeholder='Enter password' className={`input input-bordered w-full pl-10`} value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})}/>
                <button type="button"  className='inset-y-0 right-1 absolute 'onClick={()=>setShowPassword(!showPassword)}>{showPassword ? <EyeOff className='size-5 text-base-content'/> : <Eye className='size-5 text-base-content'/>}</button>
              </div>
            </div>

            <button type='submit' className="btn w-full btn-primary " disabled={isLoggingIn}>{isLoggingIn?(<><Loader2 className='animate-spin'/>Submitting...</>):("Log In")}</button>
          </form>
          <div className='text-center'>Do not have an account?</div>
          <Link to="/signup" className='link link-primary'>Signup</Link>

      </div>
      <div className='hidden lg:flex flex-col items-center justify-center bg-base-200 p-6 sm:p-12'>
        <Pattern title="Welcome Back to ChatterBox" des="Welcome back! Log in to resume your conversations and stay connected!"/>
      </div>
    </div>
  )
}

export default LoginPage