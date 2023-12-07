import { createSlice } from "@reduxjs/toolkit";
import {io} from "socket.io-client"



const authSlice = createSlice({
    name: "verify",
    initialState: {
        googleAuth: null,
        socket: null,
        activeusers:[],
},
    reducers:{
        checkAuth(state , action){    
            state.googleAuth = action.payload  
        },
        setActiveusers(state, action){
            state.activeusers = action.payload
        }
    }
})

const {actions, reducer} = authSlice
const {checkAuth , startSocket,setActiveusers} = actions;
export {
    checkAuth,setActiveusers,
    reducer as authSlice,
}


// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const STATUSES = {
//     idle : "idle",
//     loading : "loading",
//     error : "error",
// }

// const AuthSlice = createSlice({
//     name:  "product",
//     initialState : {
//         data : [],
//         status : STATUSES,
//     },
//     extraReducers : (builder) => {
//         builder.addCase(fetchdata.pending , (state, action)=>{
//             state.status = STATUSES.loading
//         });
//         builder.addCase(fetchdata.fulfilled , (state, action)=>{
//             state.status = STATUSES.idle
//             state.data = action.payload
//         });
//         builder.addCase(fetchdata.rejected , (state, action)=>{
//             state.status = STATUSES.error
//         });
//     },
// })

// const {reducer} = AuthSlice
// export default reducer

// export const fetchdata = createAsyncThunk("datum/fetch", async ()=>{
//     const data = await fetch("https://extinct-wasp-buckle.cyclic.app/api/login")
//     const products = await data.json();
//     // console.log(products);
//     return products;    
// })