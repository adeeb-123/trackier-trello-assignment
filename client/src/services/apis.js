const BASE_URL = 'http://localhost:4000/api/v1'

export const Auth_API = {
    Login: BASE_URL + "/auth/login",
    Signup: BASE_URL + "/auth/signup"
}

export const Projects_API = {
    CreateProject: BASE_URL + "/project/createProject",
    GetAllProjects: BASE_URL + "/project/getAllProjects",
}

export const Tasks_API = {
    GetAllUsersTasks: BASE_URL + "/task/getAllUserTasks",
}