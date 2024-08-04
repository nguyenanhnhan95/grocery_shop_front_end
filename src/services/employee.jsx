// import axios from "axios";

// const http='http://localhost:8080/employees';
// const getAll=async (name)=>{
//     try{
//         const response = await axios.get(http+`/?name=${name}`);
//         return response.data;
        
//     } catch (error){

//     }
// }
// const findByID=async(id)=>{
//     try{
//         const response = await axios.get(http+`/?id=${id}`);
//         return response.data;
//     } catch (error){

//     }
// }
// const update=async(id,data)=>{
//     try {
//         const response = await axios.put(http+""+id,data)
//         return response.data
//     } catch (error){

//     }
// }
// const create=async(data)=>{
//     try{
//         const response = await axios.post(http,data)
//         return response.data;
//     }catch (error){

//     }
// }
// const EmployeeService = {
//     getAll,
//     findByID,
//     create,
//     update,
// };
// export default EmployeeService;