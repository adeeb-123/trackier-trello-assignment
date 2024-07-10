import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/operations/authAPI'
import toast from 'react-hot-toast';

const Login = () => {

  const auth = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  function changeHandler(event) {
    setFormData((prevData) => (
      {
        ...prevData,
        [event.target.name]: event.target.value
      }
    ))
  }

  function handleOnSubmit(event) {
    event.preventDefault();

    if (!formData?.email || !formData?.password) {
      toast.error('All fields are mandatory')
      return null;
    }

    dispatch(login(formData?.email, formData?.password, navigate));
  }

  useEffect(() => {
    if (auth.token !== null) {
      navigate('/')
    }
  }, [auth])

  return (
    <div className="w-[100%]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[90vh] lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-[#182a4d] md:text-2xl">
              Log in to continue
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleOnSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                <input type="email" name="email" id="email" value={formData?.email} onChange={changeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Luke Marques" required="" />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input type="password" name="password" id="password" value={formData?.password} onChange={changeHandler} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
              </div>
              <button type="submit" className="w-full text-white bg-[#0b65e4] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Login</button>
              <p className="text-sm font-light text-gray-500 ">
                Don't have an account? <a href="/signup" className="font-medium text-primary-600 hover:underline">Signup here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
