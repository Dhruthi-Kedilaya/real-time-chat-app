import React, { useEffect } from 'react'
import Navbar from "./components/Navbar"
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"
import { useAuthStore } from './store/useAuthStore';
import {Loader} from "lucide-react"
import {Toaster} from "react-hot-toast"
import { useThemeStore } from './store/useThemeStore';
import CreateGroupPage from './pages/CreateGroupPage';


const App = () => {
  const {authUser,isCheckingAuth,checkAuth,onlineUsers}=useAuthStore();
  const {themes}=useThemeStore();
console.log(onlineUsers);

  useEffect(()=>{
    checkAuth();
  },[checkAuth]);
  console.log(authUser);
  if(isCheckingAuth && !authUser){
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin'/>
      </div>
    )
  }
  return (
    <div data-theme={themes}>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/create-group' element={authUser ? <CreateGroupPage /> : <Navigate to="/login" />} />
        <Route path='/signup' element={authUser ? <Navigate to="/" /> : <SignUpPage />} />
        <Route path='/login' element={authUser ? <Navigate to="/" /> : <LoginPage />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App