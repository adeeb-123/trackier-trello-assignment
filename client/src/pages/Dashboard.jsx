import { useDisclosure } from '@chakra-ui/react';
import React from 'react'
import { IoAddCircleOutline } from "react-icons/io5";
import CreateProjectModal from '../components/Dashboard/CreateProjectModal';


const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div className='w-[100%] py-4'>
      <div className='w-[95%] mx-auto flex flex-col gap-4'>

        <div className='w-[100%] flex items-end justify-end'>
          <button className='bg-[#232323] px-5 py-2 rounded-2xl text-white flex items-center gap-1' onClick={onOpen}>Create <span><IoAddCircleOutline className='text-lg'/> </span></button>
        </div>

        <div className='flex flex-col gap-4'>
          <h3 className='text-2xl font-semibold'>Your Projects</h3>
          <div className='border-t-[1px] border-0 border-[#4e4e4ec4] pt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-8'>

            {/* All Projects */}
            <div className="bg-[url('https://trello-backgrounds.s3.amazonaws.com/SharedBackground/640x960/8ee8e0f6b4b19886cf7b5dd2d391296a/photo-1720122207974-0e950e7deb05.webp')] bg-cover bg-center h-[300px] relative text-white rounded-2xl cursor-pointer hover:shadow-2xl duration-200 transition-all overflow-hidden">
              <div className='w-[100%] h-[100%] absolute bg-[#3b3b3b8d] z-20'></div>
              <div className='z-30 text-white absolute h-[100%] p-4'>
                <h2 className='text-2xl font-semibold'>Trading Project</h2>
                <p className='text-sm font-semibold mt-3'>This is the basic description of this project</p>
              </div>
            </div>

          </div>
        </div>

        {/* Project Create Modal */}
        <CreateProjectModal isOpen={isOpen} onClose={onClose} />
      </div>
    </div>
  )
}

export default Dashboard
