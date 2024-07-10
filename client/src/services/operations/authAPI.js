import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { Auth_API } from "../apis";
import { setToken, setUserData } from "../../slices/authSlice";

export function signUp(userName, email, password, confirmPassword, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...')
        try {
            const response = await apiConnector("POST", Auth_API.Signup, { userName, email, password, confirmPassword })
            if (!response.data.success) {
                toast.error(response?.data?.message)
            }
            toast.success("Signup Successfully");
            navigate("/login");
        } catch (error) {
            console.log(error, "error")
            toast.error(error?.response?.data?.message);
            navigate("/signup");
        }
        toast.dismiss(toastId);
    }
}

export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading")

        try {
            const response = await apiConnector("POST", Auth_API.Login, {
                email,
                password,
            });
            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Login Successfull");
            dispatch(setToken(response?.data?.token));
            dispatch(setUserData(response?.data?.user));
            localStorage.setItem("token", JSON.stringify(response?.data?.token))
            localStorage.setItem("userDetails", JSON.stringify(response?.data?.user))

            navigate("/dashboard")

        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}


export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUserData({}))
        localStorage.removeItem("token")
        localStorage.removeItem("userDetails")
        toast.success("Logged Out")
        navigate("/")
    }
}
