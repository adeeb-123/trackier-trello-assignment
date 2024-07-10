import { useState } from 'react'
import './App.css'
import Navbar from './components/global/Navbar'
import { Navigate, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useSelector } from 'react-redux';
import Dashboard from './pages/Dashboard';

function App() {

  const ProtectedRoute = ({ children }) => {
    const auth = useSelector((state) => state.auth);
    console.log('auth' , auth)

    if (auth?.token !== null) {
      return children;
    }
    else {
      return <Navigate to="/login" />;
    }
  }

  return (
    <div className='w-[100vw] h-full'>
      <Navbar />

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route path='/' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

      </Routes>
    </div>
  )
}

export default App
