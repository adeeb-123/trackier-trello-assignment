const BASE_URL = 'https://trackier-trello-assignment.onrender.com/api/v1'

export const Auth_API = {
    Login: BASE_URL + "/auth/login",
    Signup: BASE_URL + "/auth/signup",
    AllUsers: BASE_URL + "/auth/getAllUsers"
}

export const Projects_API = {
    CreateProject: BASE_URL + "/project/createProject",
    GetAllProjects: BASE_URL + "/project/getAllProjects",
    GetSingleProjects : BASE_URL + "/project/getSingleProject"
}

export const Tasks_API = {
    CreateTask:BASE_URL + "/task/createTask",
    GetAllUsersTasks: BASE_URL + "/task/getAllUserTasks",
    GetSingleProjectsTasks: BASE_URL + "/task/getProjectTasks",
}