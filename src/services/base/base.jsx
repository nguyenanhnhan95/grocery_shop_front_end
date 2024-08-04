import axios from "axios";
const getAll = async (http) => {
    try {
        const response = await axios.get(http);
        return response.data;

    } catch (error) {
        return error;
    }
}
const findAll = async (http, queryParam) => {
    try {

        const response = await axios.get(http + `?query=${queryParam}`);
        console.log(response)
        return response.data;

    } catch (error) {
        console.log(error.response.data)
    }
}
const findByUser = async (http, headers) => {
    try {
        const response = await axios.get(http, headers);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
const findByID = async (http, id) => {
    try {
        const response = await axios.get(http + `/?id=${id}`);
        return response.data;
    } catch (error) {

    }
}
const update = async (id, data) => {
    // try {
    //     const response = await axios.put(http+""+id,data)
    //     return response.data
    // } catch (error){

    // }
}
const create = async (data) => {
    // try{
    //     const response = await axios.post(http,data)
    //     return response.data;
    // }catch (error){

    // }
}
const BaseService = {
    getAll,
    findAll,
    findByID,
    create,
    update,
    findByUser
};
export default BaseService;