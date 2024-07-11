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