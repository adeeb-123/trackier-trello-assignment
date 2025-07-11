import React, { useEffect, useState } from 'react'
import TaskContainer from './TaskContainer'
import { useSelector } from 'react-redux'
import { getAllUsersTasks, getSingleProjectTasks } from '../../services/operations/taskAPI'
import Loader from '../global/Loader'

const TaskBoard = ({ projectId }) => {
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

        } catch (error) {
            toast.error("Error while fetching projects")
        }
        setLoading(false)
    };

    const SingleProjectTasks = async () => {
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

            const taskData = await getSingleProjectTasks(projectId, headers);

            setAllUsersTask(taskData);

        } catch (error) {
            toast.error("Error while fetching projects")
        }
        setLoading(false)
    };

    useEffect(() => {
        if (projectId) {
            SingleProjectTasks()
        } else {
            fetchAllUsersTasks();
        }
    }, [1]);

    return (
        <div className='w-[100%]'>
            <div className='w-[95%] mx-auto'>
                <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8'>
                    {
                        loading ? (<Loader />) : <><TaskContainer title={"Backlog"} cards={allUsersTask?.Backlog} />
                            <TaskContainer title={"In Discussion"} cards={allUsersTask?.['In Discussion']} />
                            <TaskContainer title={"In Progress"} cards={allUsersTask?.['In Progress']} />
                            <TaskContainer title={"Done"} cards={allUsersTask?.Done} />
                        </>

                    }

                </div>
            </div>
        </div>
    )
}

export default TaskBoard
