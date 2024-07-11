import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { Projects_API } from "../apis";
import { setToken, setUserData } from "../../slices/authSlice";

export const getAllProjects = async (headers) => {
    let result = [];
    try {
        const response = await apiConnector("GET", Projects_API.GetAllProjects, null, headers)

        if (!response.data.success) {
            toast.error(response?.data?.message)
        }
        result = response?.data?.allProjects

    } catch (error) {
        console.log(error, "error")
        toast.error(error?.response?.data?.message);
    }
    return result;

}

export const createProject = async (projectName, projectDescription, headers) => {
    const toastId = toast.loading('Loading...')
    try {
        const response = await apiConnector("POST", Projects_API.CreateProject, { projectName, projectDescription }, headers)
        if (!response.data.success) {
            toast.error(response?.data?.message)
        }
        toast.success("Project Created Successfully");

    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
}