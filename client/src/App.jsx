import { useState } from 'react'
import './App.css'
import Navbar from './components/global/Navbar'
import { Navigate, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useSelector } from 'react-redux';
import Dashboard from './pages/Dashboard';
import TaskBoards from './pages/TaskBoardsPage';
import TaskBoardsPage from './pages/TaskBoardsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import TestDashboard from './pages/TestDashboard';


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
    <div className='w-[100vw] min-h-screen bg-gray-200 font-[Manrope]'>
      <Navbar />

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route path='/' element={<Navigate to="/dashboard" replace />} />
        
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path='/taskBoard' element={
          <ProtectedRoute>
            <TaskBoardsPage />
          </ProtectedRoute>
        } />

        <Route path='/project/:projectId' element={
          <ProtectedRoute>
            <ProjectDetailPage />
          </ProtectedRoute>
        } />

      </Routes>
    </div>
  )
}

export default App
