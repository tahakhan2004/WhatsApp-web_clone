import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { BASE_URI } from "../Instance";

const STATUSES = {
    idle : "idle",
    loading : "loading",
    error : "error",
}

const ProductSlice = createSlice({
    name:  "product",
    initialState : {
        data : [],
        users:[],
        status : STATUSES,
        clickedUser:{},
        conversation:{},
        messages: [],
        newMesgflag: false,

    },
    reducers:{
        curUser(state , action){    
            state.clickedUser = action.payload  
    },
    setMessages(state , action){    
        state.messages.push(action.payload)  
},
setnewMesgflag(state, action){
    state.newMesgflag = action.payload
}
},
    extraReducers : (builder) => {
        builder.addCase(createUser.pending , (state, action)=>{
            state.status = STATUSES.loading
        });
        builder.addCase(createUser.fulfilled , (state, action)=>{
            state.status = STATUSES.idle
            state.data = action.payload
        });
        builder.addCase(createUser.rejected , (state, action)=>{
            state.status = STATUSES.error
        });


        builder.addCase(getallUsers.pending , (state, action)=>{
            state.status = STATUSES.loading
        });
        builder.addCase(getallUsers.fulfilled , (state, action)=>{
            state.status = STATUSES.idle
            state.users = action.payload
        });
        builder.addCase(getallUsers.rejected , (state, action)=>{
            state.status = STATUSES.error
        });


        builder.addCase(getConversationn.pending , (state, action)=>{
            state.status = STATUSES.loading
        });
        builder.addCase(getConversationn.fulfilled , (state, action)=>{
            state.status = STATUSES.idle
            state.conversation = action.payload
        });
        builder.addCase(getConversationn.rejected , (state, action)=>{
            state.status = STATUSES.error
        });


        builder.addCase(getallMessages.pending , (state, action)=>{
            state.status = STATUSES.loading
        });
        builder.addCase(getallMessages.fulfilled , (state, action)=>{
            state.status = STATUSES.idle
            state.messages = action.payload
        });
        builder.addCase(getallMessages.rejected , (state, action)=>{
            state.status = STATUSES.error
        });
    },
})

const {actions,reducer} = ProductSlice
const { curUser,setMessages,setnewMesgflag } = actions;
export {
    curUser,setMessages,setnewMesgflag,
    reducer as ProductSlice,
}

export const createUser = createAsyncThunk("products/createproduct",async (product)=>{
    const data = await fetch('https://extinct-wasp-buckle.cyclic.app/api/add',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      })
    // const data = await fetch(`${BASE_URI}get`)
    const products = await data.json();
    // console.log(products);
    return products;    
})

export const getallUsers = createAsyncThunk("products/getallUsers",async ()=>{
    const data = await fetch('https://extinct-wasp-buckle.cyclic.app/api/users')
    // const data = await fetch(`${BASE_URI}get`)
    const products = await data.json();
    // console.log(products);
    return products;    
})


export const setConversationn = createAsyncThunk("products/setConversation",async (cred)=>{
    const data = await fetch('https://extinct-wasp-buckle.cyclic.app/api/setconversation',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cred)
      }
    
    )
    // const data = await fetch(`${BASE_URI}get`)
    const products = await data.json();
    // console.log(products);
    return products;    
})

export const getConversationn = createAsyncThunk("products/getConversation",async (cred)=>{
    const data = await fetch('https://extinct-wasp-buckle.cyclic.app/api/getconversation',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cred)
      }
    
    )
    // const data = await fetch(`${BASE_URI}get`)
    const products = await data.json();
    // console.log(products);
    return products;    
})

export const newMessage = createAsyncThunk("products/newmessage",async (cred)=>{
    const data = await fetch('https://extinct-wasp-buckle.cyclic.app/api/newmessage',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cred)
      }
    
    )
    // const data = await fetch(`${BASE_URI}get`)
    const products = await data.json();
    // console.log(products);
    return products;    
})

export const getallMessages = createAsyncThunk("products/getallmessages",async (cred)=>{
    const data = await fetch(`https://extinct-wasp-buckle.cyclic.app/api/getmessage/${cred._id}`)
    // const data = await fetch(`${BASE_URI}get`)
    const products = await data.json();
    // console.log(products);
    return products;    
})