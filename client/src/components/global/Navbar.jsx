import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/operations/authAPI';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

  const auth = useSelector((state)=>state.auth)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogOut = (e) => {
    dispatch(logout(navigate));
  }

  return (
    <nav className="bg-[#0c0c0cca] shadow-md py-3">
      <div className="flex justify-between items-center max-w-[95%] mx-auto">
        <div className="flex items-center">
          <Link to={'/'}>
          <img className="h-6" src="https://trello.com/assets/87e1af770a49ce8e84e3.gif" alt="Logo" />
          </Link>
        </div>

        <div className="flex items-center gap-4">

          {
            auth?.token === null && (<Link to={'/login'}>
              <button type="submit" className="w-full text-white bg-[#0d64e4] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 text-center ">Login</button>
            </Link>)
          }

          {
            auth?.token === null && (<Link to={'/signup'}>
              <button type="submit" className="w-full text-white bg-[#0d64e4] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 text-center ">Signup</button>
            </Link>)
          }

          {
            auth?.token !== null && <div className="relative">
              <button onClick={toggleDropdown} className="relative z-10 block h-8 w-8 rounded-full overflow-hidden focus:outline-none">
                <img className="h-full w-full object-cover" src={auth?.userData?.userImage} alt="Your Name" />
              </button>

              {
                auth?.token !== null && isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden">
                    <Link to={"/dashboard"}>
                      <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">
                        Dashboard
                      </button>
                    </Link>
                    <hr />
                    <button onClick={handleLogOut} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">
                      Logout
                    </button>
                  </div>
                )
              }

            </div>
          }

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
