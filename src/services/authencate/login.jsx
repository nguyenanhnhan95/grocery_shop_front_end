import axios from "axios";
import { linkUser } from "../../utils/commonConstants";
export const loginAuth = async (account) => {
    try {
        const response = await axios.post(linkUser.linkLogin, account );
        return response.data;

    } catch (error) {
        console.log(error)
        return error.response;
    }
}