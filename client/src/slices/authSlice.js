import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userData: localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")) : {},
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setToken(state, value) {
            state.token = value.payload
        },
        setUserData(state, value) {
            state.userData = value.payload
        },
    }
})

export const { setToken, setUserData } = authSlice.actions;
export default authSlice.reducer;