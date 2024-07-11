import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { Projects_API, Tasks_API } from "../apis";
import { setToken, setUserData } from "../../slices/authSlice";

export const getAllUsersTasks = async (headers) => {
    let result = {};
    try {
        const response = await apiConnector("GET", Tasks_API.GetAllUsersTasks, null, headers)

        if (!response.data.success) {
            toast.error(response?.data?.message)
        }
        result = response?.data?.groupedTasks

    } catch (error) {
        console.log(error, "error")
        toast.error(error?.response?.data?.message);
    }
    return result;

}

export const getSingleProjectTasks = async (projectId, headers) => {
    let result = {};
    try {
        const response = await apiConnector("GET", Tasks_API.GetSingleProjectsTasks + "/" + projectId, null, headers)
        if (!response.data.success) {
            toast.error(response?.data?.message)
        }
        result = response?.data?.groupedTasks

    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
    return result
}

export const createTask = async (taskName, description, status, dueDate, assignedUser, projectId, tags, headers) => {
    const toastId = toast.loading('Loading...')
    try {
        const response = await apiConnector("POST", Tasks_API.CreateTask, { taskName, description, status, dueDate, assignedUser, projectId, tags }, headers)
        if (!response.data.success) {
            toast.error(response?.data?.message)
        }
        toast.success("Task Created Successfully");

    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
}