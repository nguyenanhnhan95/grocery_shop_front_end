import { useCallback, useState } from "react";
import axios from "axios";
import { toastSuccess } from "../../../config/toast";
import { validation } from "../../../utils/validation";
import { useAuthenticateTokenException } from "../../handler/useAuthenticateTokenException";


export const useFetchSave = () => {
    const [isPending, setIsPending] = useState(false);
    const [code, setCode] = useState(null);
    const { handleAuthenticateException } = useAuthenticateTokenException();
    const fetchSave = useCallback(async (url, data, setErrors,handleErrorsMessage) => {
        setIsPending(true);
        try {
            const response = await axios.post(url, data, {withCredentials:true});
            if (response.data?.code === 200) {
                toastSuccess(response.data.message)
            }
            setCode(response.data?.code)
            setIsPending(false);
            setErrors(null);
        } catch (error) {
            console.log(error)
            if (error.response.data.code === 4013) {
                if(validation.checkFunction(handleErrorsMessage)){
                    handleErrorsMessage(error.response.data.result,setErrors);
                }else{
                    setErrors(error.response.data.result)
                }
                
            }
            handleAuthenticateException({error:error,code:error?.response?.data?.status,handleService: () => fetchSave(url, data, setErrors,handleErrorsMessage)})
        } finally {
            setIsPending(false);
        }
    }, []);

    return { fetchSave, isPending, code };
};