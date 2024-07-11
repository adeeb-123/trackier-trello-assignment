import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createProject } from '../../services/operations/projectsAPI'
import toast from 'react-hot-toast'

const CreateProjectModal = ({ isOpen, onClose }) => {

    const auth = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        projectName: "",
        projectDescription: ""
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

    function handleOnSubmit(event) {
        event.preventDefault();

        if (!formData?.projectName || !formData?.projectDescription) {
            toast.error('All fields are mandatory')
            return null;
        }

        const headers = {
            'Authorization': `${auth.token}`
        };
        createProject(formData?.projectName, formData?.projectDescription, headers)
    }


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create New Project</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form className="space-y-4 md:space-y-6 pb-4" onSubmit={handleOnSubmit}>
                        <div>
                            <label htmlFor="projectName" className="block mb-2 text-sm font-medium text-gray-900">Project Name</label>
                            <input type="text" name="projectName" id="projectName" value={formData?.email} onChange={changeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter Project Name" />
                        </div>
                        <div>
                            <label htmlFor="projectDescription" className="block mb-2 text-sm font-medium text-gray-900">Project Description</label>
                            <input type="text" name="projectDescription" id="projectDescription" value={formData?.password} onChange={changeHandler} placeholder="Enter Description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                        </div>
                        <button type="submit" className="w-full text-white bg-[#1e9561] font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create Project</button>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default CreateProjectModal
