import React, { useEffect, useState } from 'react'
import TaskContainer from './TaskContainer'
import { useSelector } from 'react-redux'
import { getAllUsersTasks } from '../../services/operations/taskAPI'

const TaskBoard = () => {
    const auth = useSelector((state) => state.auth)

    const [allUsersTask, setAllUsersTask] = useState({})
    const [loading, setLoading] = useState(false)

    const fetchAllUsersTasks = async () => {
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

            const allUsersTasks = await getAllUsersTasks(headers);

            setAllUsersTask(allUsersTasks);
            setLoading(false)

        } catch (error) {
            toast.error("Error while fetching projects")
        }
    };

    useEffect(() => {
        fetchAllUsersTasks();
    }, [1]);

    return (
        <div className='w-[100%]'>
            <div className='w-[95%] mx-auto'>
                <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8'>
                    {/* first column div */}
                    <TaskContainer title={"Backlog"} cards={allUsersTask?.Backlog} />
                    <TaskContainer title={"In Discussion"} cards={allUsersTask?.['In Discussion']} />
                    <TaskContainer title={"In Progress"} cards={allUsersTask?.['In Progresss']} />
                    <TaskContainer title={"Done"} cards={allUsersTask?.Done} />
                </div>
            </div>
        </div>
    )
}

export default TaskBoard
