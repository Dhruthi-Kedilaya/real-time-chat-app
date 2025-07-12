import React, { useState } from 'react'
import {Eye, EyeOff, Key, Loader, Loader2, Mail, MessageSquare, User} from "lucide-react"
import {useAuthStore} from "../store/useAuthStore"
import {Link} from "react-router-dom" 
import Pattern from '../components/pattern'
import toast from 'react-hot-toast'

const SignUpPage = () => {
  const {signUp,isSigningUp}=useAuthStore();
  const [showPassword,setShowPassword]=useState(false);
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    password:""
  });

  const validate=(data)=>{
    if(!data.name) return toast.error("Enter your name");
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
      signUp(formData);
    }
    
  }

  return (
    <div className='h-screen w-full grid lg:grid-cols-2'>
      <div className='flex flex-col items-center justify-center bg-base-100 p-6 sm:p-12 text-base-content'>
        <div className='p-2 bg-primary/10 rounded-lg mb-2 animate-bounce'>
          <MessageSquare className='size-10 text-primary'/> 
        </div>
        <div className='text-3xl font-medium'>Create An Account</div>
        <div className='font-normal mb-6'>Join us and start chatting in seconds!</div>

          <form onSubmit={(e)=>{handleSubmit(e)}} className='space-y-4 w-full max-w-lg'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Full Name</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <User className='size-5 text-base-content'/>
                </div>
                <input type="text"placeholder='Enter your name' className={`input input-bordered w-full pl-10`} value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})}/>
              </div>
            </div>

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

            <button type='submit' className="btn w-full btn-primary " disabled={isSigningUp}>{isSigningUp?(<><Loader2 className='animate-spin'/>Submitting...</>):("Create account")}</button>
          </form>
          <div className='text-center'>Already have an account?</div>
          <Link to="/login" className='link link-primary'>Login</Link>

      </div>
      <div className='hidden lg:flex flex-col items-center justify-center bg-base-200 p-6 sm:p-12'>
        <Pattern title="Create Your Chat Account" des="Sign up to connect instantly with friends, share messages, and enjoy real-time conversations — all in one place."/>
      </div>
    </div>
  )
}

export default SignUpPage