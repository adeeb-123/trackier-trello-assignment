import React from 'react'
import TaskCards from './TaskCards'

const TaskContainer = ({title , cards}) => {
  return (
    <div className='flex flex-col gap-4'>
        <h3 className='text-xl font-extrabold'>{title}</h3>
        <div className='flex flex-col gap-8'>
            {
                cards?.map((card , index)=>{
                    return (
                        <TaskCards key={index} card={card}/>
                    )
                })
            }
        </div>
    </div>
  )
}

export default TaskContainer
