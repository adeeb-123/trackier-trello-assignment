import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import { fetchAllUsers } from '../../services/operations/authAPI'
import { createTask } from '../../services/operations/taskAPI'
import toast from 'react-hot-toast'

const CreateTaskModal = ({ isOpen, onClose, projectId }) => {
    const auth = useSelector((state) => state.auth)
    const [allUsers, setAllUsers] = useState([])

    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (inputValue.trim() && !tags.includes(inputValue)) {
                setTags([...tags, inputValue.trim()]);
                setInputValue("");
            }
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const [formData, setFormData] = useState({
        taskName: "",
        description: "",
        status: "Backlog",
        tags: [],
        dueDate: "",
        assignedUser: "",
        projectId: projectId,
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    function changeHandler(event) {
        setFormData((prevData) => (
            {
                ...prevData,
                [event.target.name]: event.target.value
            }
        ))
    }

    const getAllUsers = async () => {
        try {
            const result = await fetchAllUsers()
            setAllUsers(result)
        } catch (error) {
            toast.error("Error while fetching projects")
        }
    }

    function handleOnSubmit(event) {
        event.preventDefault();

        if (!formData?.taskName || !formData?.description || !formData?.status || !formData?.dueDate || !formData?.assignedUser) {
            toast.error('All fields are mandatory')
            return null;
        }

        const headers = {
            'Authorization': `${auth.token}`
        };

        createTask(formData?.taskName, formData?.description, formData?.status, formData?.dueDate, formData?.assignedUser, formData?.projectId, tags, headers)

        setFormData({ taskName: "",description: "",status: "Backlog",tags: [],dueDate: "",assignedUser: "",projectId: projectId })
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create a Task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form className="space-y-4 md:space-y-6 pb-4" onSubmit={handleOnSubmit}>
                        <div>
                            <label htmlFor="taskName" className="block mb-2 text-sm font-medium text-gray-900">Task Name</label>
                            <input type="text" name="taskName" id="taskName" value={formData?.email} onChange={changeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter Project Name" />
                        </div>
                        <div>
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Task Description</label>
                            <input type="text" name="description" id="description" value={formData?.password} onChange={changeHandler} placeholder="Enter Description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                        </div>

                        <div>
                            <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                            <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ' value={formData?.status} onChange={changeHandler} name='status' id='status'>
                                <option value={"Backlog"}>Backlog</option>
                                <option value={"In Discussion"}>In Discussion</option>
                                <option value={"In Progress"}>In Progress</option>
                                <option value={"Done"}>Done</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="dueDate" className="block mb-2 text-sm font-medium text-gray-900">Date</label>
                            <input type="date" name="dueDate" id="dueDate" value={formData?.dueDate} onChange={changeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                        </div>

                        <div>
                            <label htmlFor="tags" className="block mb-2 text-sm font-medium text-gray-900">Tags</label>
                            <input
                                type="text"
                                id="tags"
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Enter Tag and press Enter"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {tags.map((tag, index) => (
                                    <div key={index} className="bg-gray-200 text-gray-800 text-sm rounded-full px-3 py-1 flex items-center">
                                        {tag}
                                        <button
                                            onClick={() => handleRemoveTag(tag)}
                                            className="ml-2 text-gray-500 hover:text-gray-700"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <input type="hidden" name="tags" value={JSON.stringify(tags)} />
                        </div>

                        <div>
                            <label htmlFor="assignedUser" className="block mb-2 text-sm font-medium text-gray-900">Assign User</label>
                            <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ' value={formData?.assignedUser} onChange={changeHandler} name='assignedUser' id='assignedUser'>
                                <option value={""}>Select</option>
                                {
                                    allUsers?.map((user, index) => (
                                        <option key={index} value={user?._id}>{user?.userName}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <button type="submit" className="w-full text-white bg-[#1e9561] font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create Task</button>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default CreateTaskModal
