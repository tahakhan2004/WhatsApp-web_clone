import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URI } from "../Instance";

export const addUser = async (data) =>{
    try{
      return await axios.post(`${BASE_URI}add`, data)  
    }catch(err){
        console.log("Error in calling addUser api" , err);
    }
}



export const Editorr = async (id) =>{
  try{
    return await axios.get(`${BASE_URI}${id}`)
  }catch(err){
    console.log("Error in calling editUser api" , err);
  }
}

export const Editoring = async (edits, id) =>{
  try{
    return await axios.put(`${BASE_URI}${id}`, edits)
  }catch(err){
    console.log("Error in calling editUser api" , err);
  }
}


export const Deletor = async (id) =>{
  try{
    return await axios.delete(`${BASE_URI}${id}`)
  }catch(err){
    console.log("Error in calling editUser api" , err);
  }
}





export const getMessages = async (id) => {
  try {
      let response = await axios.get(`https://extinct-wasp-buckle.cyclic.app/api/getmessage/${id}`);
      return response.data
  } catch (error) {
      console.log('Error while calling getMessages API ', error);
  }
}

