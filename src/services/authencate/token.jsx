import axios from "axios";

export const getRefreshToken=async ()=>{
    try{
        const response = await axios.get(`http://localhost:8080/auth/refresh-token`,{withCredentials:true});
        return response.data;       
    } catch (error){
        return error;
    }
}