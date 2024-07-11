import React from 'react'
import TaskCards from './TaskCards'

const TaskContainer = ({title , cards}) => {
  return (
    <div className='flex flex-col gap-4'>
        <h3 className='text-xl font-extrabold'>{title}</h3>
        <div className='flex flex-col gap-8'>
            {
                cards?.length > 0 ? (cards?.map((card , index)=>{
                    return (
                        <TaskCards key={index} card={card}/>
                    )
                })) : (
                    <div className='font-semibold rounded-2xl overflow-hidden bg-white p-4 flex flex-col gap-6 cursor-pointer hover:shadow-lg duration-200 transition-all'>
                        Nothing Here !
                    </div>
                )
            }
            
        </div>
    </div>
  )
}

export default TaskContainer
