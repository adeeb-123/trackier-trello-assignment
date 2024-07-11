import { useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { IoAddCircleOutline } from "react-icons/io5";
import CreateProjectModal from '../components/Dashboard/CreateProjectModal';
import { useSelector } from 'react-redux';
import { getAllProjects } from '../services/operations/projectsAPI';
import toast from 'react-hot-toast';
import Loader from '../components/global/Loader';


const Dashboard = () => {
  const auth = useSelector((state) => state.auth)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [allProjects, setAllProjects] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchProjects = async () => {
    setLoading(true)

    const token = auth?.token

    if (!token) {
      toast.error("No token found, please log in.");
      return;
    }

    try {
      const headers = {
        'Authorization': `${token}`
      };

      const projectsData = await getAllProjects(headers);
      console.log("projectsData", projectsData)

      setAllProjects(projectsData);
      setLoading(false)

    } catch (error) {
      toast.error("Error while fetching projects")
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [1]);

  return (
    <div className='w-[100%] py-4'>
      <div className='w-[95%] mx-auto flex flex-col gap-4'>

        <div className='w-[100%] flex items-end justify-end'>
          <button className='bg-[#232323] px-5 py-2 rounded-2xl text-white flex items-center gap-1' onClick={onOpen}>Create <span><IoAddCircleOutline className='text-lg' /> </span></button>
        </div>

        <div className='flex flex-col gap-4'>
          <h3 className='text-2xl font-semibold'>Your Projects</h3>
          <div className='border-t-[1px] border-0 border-[#4e4e4ec4] pt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-8'>

            {
              loading ? <Loader /> :
                allProjects?.map((project, index) => {
                  return (
                    <div key={index} className="bg-[url('https://trello-backgrounds.s3.amazonaws.com/SharedBackground/640x960/8ee8e0f6b4b19886cf7b5dd2d391296a/photo-1720122207974-0e950e7deb05.webp')] bg-cover bg-center h-[300px] relative text-white rounded-2xl cursor-pointer hover:shadow-2xl duration-200 transition-all overflow-hidden">
                      <div className='w-[100%] h-[100%] absolute bg-[#3b3b3b8d] z-20'></div>
                      <div className='z-30 text-white absolute h-[100%] p-4'>
                        <h2 className='text-2xl font-semibold'>{project?.projectName}</h2>
                        <p className='text-sm font-semibold mt-3'>{project?.projectDescription}</p>
                      </div>
                    </div>
                  )
                })

            }

          </div>
        </div>

        {/* Project Create Modal */}
        <CreateProjectModal isOpen={isOpen} onClose={onClose} />
      </div>
    </div>
  )
}

export default Dashboard
