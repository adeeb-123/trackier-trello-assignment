import React, { useEffect, useState } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdFunnel } from "react-icons/io";
import { FaSort } from "react-icons/fa";
import TaskBoard from '../components/TaskBoard/TaskBoard';
import { useParams } from 'react-router-dom';
import { getSingleProject } from '../services/operations/projectsAPI';
import { useSelector } from 'react-redux';
import { useDisclosure } from '@chakra-ui/react';
import CreateTaskModal from '../components/Dashboard/CreateTaskModal';

const ProjectDetailPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { projectId } = useParams();
    const auth = useSelector((state) => state.auth)

    const [projectData, setProjectData] = useState({})


    const SingleProjectData = async () => {
        const token = auth?.token

        if (!token) {
            toast.error("No token found, please log in.");
            return;
        }

        try {
            const headers = {
                'Authorization': `${token}`
            };

            const projectData = await getSingleProject(projectId, headers);
            setProjectData(projectData);

        } catch (error) {
            toast.error("Error while fetching projects")
        }
    };

    useEffect(() => {
        SingleProjectData();
    }, [1]);

    return (
        <div className='w-[100%]'>
            <div className='bg-white py-2 flex justify-between items-center px-6'>
                <div className='flex items-center gap-3'>
                    <img src='https://png.pngtree.com/png-clipart/20231110/original/pngtree-green-shoes-concept-art-png-image_13524992.png' alt='img' className='w-[50px] bg-[#8cf55c7b] rounded-2xl overflow-hidden p-2' />
                    <div className='flex flex-col'>
                        <h2 className='text-2xl font-semibold'>{projectData?.projectName}</h2>
                        <ul className='flex items-center gap-2 text-sm font-semibold text-[#7a7979] cursor-pointer max-lg:hidden'>
                            <li>Overview</li>
                            <li>List</li>
                            <li className='underline text-green-600'>Board</li>
                            <li>Timeline</li>
                            <li>Calendar</li>
                            <li>Dashboard</li>
                            <li>Messages</li>
                            <li>More...</li>
                        </ul>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <div className='flex cursor-pointer max-md:hidden'>
                        <img className='w-[30px] h-[30px] rounded-full' src='https://ui.aceternity.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1535713875002-d1d0cf377fde%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww%26auto%3Dformat%26fit%3Dcrop%26w%3D800%26q%3D60&w=256&q=75' alt='img' />
                        <img className='w-[30px] h-[30px] rounded-full' src='https://ui.aceternity.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1535713875002-d1d0cf377fde%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww%26auto%3Dformat%26fit%3Dcrop%26w%3D800%26q%3D60&w=256&q=75' alt='img' />
                        <img className='w-[30px] h-[30px] rounded-full' src='https://ui.aceternity.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1535713875002-d1d0cf377fde%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww%26auto%3Dformat%26fit%3Dcrop%26w%3D800%26q%3D60&w=256&q=75' alt='img' />
                        <img className='w-[30px] h-[30px] rounded-full' src='https://ui.aceternity.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1535713875002-d1d0cf377fde%3Fixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww%26auto%3Dformat%26fit%3Dcrop%26w%3D800%26q%3D60&w=256&q=75' alt='img' />
                    </div>
                    <div className='flex items-center gap-3'>
                        <input placeholder='Search' type='text' className='rounded-full border px-4 text-xs py-2' />
                        <CiCirclePlus className='text-red-500 text-3xl cursor-pointer' onClick={onOpen} />
                    </div>
                </div>
            </div>

            <div className='bg-white w-[100%] py-3 mt-1 flex justify-between px-8'>
                <p className='text-xs font-semibold'>Last task completed on Sep 30</p>
                <div className='flex gap-6 items-center'>
                    <div className='flex items-center gap-1'>
                        <FaRegCheckCircle />
                        <p className='text-[#565656] text-xs font-semibold'>All Tasks</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <IoMdFunnel />
                        <p className='text-[#565656] text-xs font-semibold'>Field Sort</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <FaSort />
                        <p className='text-[#565656] text-xs font-semibold'>Sort</p>
                    </div>
                </div>
            </div>

            <TaskBoard projectId={projectId} />

            <CreateTaskModal projectId={projectId} isOpen={isOpen} onClose={onClose} />
        </div>
    )
}

export default ProjectDetailPage
