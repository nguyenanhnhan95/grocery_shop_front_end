import axios from "axios";

export const getRefreshToken=async (token)=>{
    try{
        const response = await axios.get(`http://localhost:8080/auth/refresh-token?token=${token}`);
        return response.data;       
    } catch (error){
        return error;
    }
}