import React from 'react'
import { BsCheckCircle } from "react-icons/bs";

const TaskCards = ({ card, key }) => {
    console.log("card" , card)
    return (
        <div className='rounded-2xl overflow-hidden bg-white p-4 flex flex-col gap-6 cursor-pointer hover:shadow-lg duration-200 transition-all' key={key}>
            <div className='flex items-center justify-between'>
                <div className='bg-blue-500 w-[30%] h-[8px] rounded-full'></div>
                <h3 className='text-xs font-bold hover:underline cursor-pointer'>{card?.projectId?.projectName}</h3>
            </div>
            <div className='flex items-center gap-3'>
                <BsCheckCircle className='text-lg font-extrabold text-gray-500' />
                <h3 className='text-lg font-semibold'>{card?.taskName}</h3>
            </div>
            <p className='text-xs font-bold'>{card?.description}</p>
            <div className='grid grid-cols-3 gap-2'>
                {
                    card?.tags?.map((tag, index) => {
                        return (
                            <p className='bg-blue-500 text-white font-bold w-fit rounded-full px-4 py-1 text-xs' key={index}>{tag}</p>
                        )
                    })
                }
            </div>
            <div className='flex items-center gap-3'>
                <img src={card?.assignedUser?.userImage} className='w-[20px] rounded-full'/>
                <p className='text-xs font-bold'>{card?.dueDate.split('-')[1]}-{card?.dueDate.split('-')[2]}</p>
                <p className='font-bold ml-auto'>{card?.assignedUser?.userName}</p>
            </div>
        </div>
    )
}

export default TaskCards
