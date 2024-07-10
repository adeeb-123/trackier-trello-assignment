import React from 'react'
import TaskContainer from './TaskContainer'

const TaskBoard = () => {

    const backlogCards = [
        {
            projectName : "Trading Platform",
            taskName : "Create Admin of broker",
            description : "I want a dedicated dashboard for the broker also , make sure you do it",
            satus : "Backlog",
            tags : ["Important" , "Design"],
            dueDate : "2024-07-10",
            assignedUser: {
                userName : "Adeeb Ahmad",
                email : "adeebsiddiqui77@gmail.com",
                userImage : "https://api.dicebear.com/5.x/initials/svg?seed=Adeeb Ahmad"
            }

        },
        {
            projectName : "Ecommerce Application",
            taskName : "Create Admin of broker",
            description : "I want a dedicated dashboard for the broker also , make sure you do it",
            satus : "Backlog",
            tags : ["Important" , "Design"],
            dueDate : "2024-07-10",
            assignedUser: {
                userName : "Adeeb Ahmad",
                email : "adeebsiddiqui77@gmail.com",
                userImage : "https://api.dicebear.com/5.x/initials/svg?seed=Adeeb Ahmad"
            }

        },
    ]

  return (
    <div className='w-[100%]'>
        <div className='w-[95%] mx-auto'>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8'>
                {/* first column div */}
                <TaskContainer title={"Backlog"} cards={backlogCards}/>
                <TaskContainer title={"In Discussion"} cards={backlogCards}/>
                <TaskContainer title={"In Progress"} cards={backlogCards}/>
                <TaskContainer title={"Done"} cards={backlogCards}/>
            </div>
        </div>
    </div>
  )
}

export default TaskBoard
