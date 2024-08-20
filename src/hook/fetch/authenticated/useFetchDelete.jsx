import axios from "axios";
import { useCallback, useState } from "react";
import { validation } from "../../../utils/validation";
import { toastSuccess } from "../../../config/toast";
import { useAuthenticateTokenException } from "../../handler/useAuthenticateTokenException";


export const useFetchDelete = (props) => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const { handleAuthenticateException } = useAuthenticateTokenException();
    const { url, handleReload } = props;
    const fetchDelete =useCallback( async () => {
        setIsPending(true);
        try {
            const response = await axios.delete(url, {withCredentials:true});
            if (response.data?.code===200 && validation.checkFunction(handleReload)) {               
                handleReload()
                toastSuccess(response.data?.message)
            }
            setIsPending(false);
            setError(null);
        } catch (error) {
            handleAuthenticateException({error:error,code:error?.response?.data?.status,handleService: () => fetchDelete()})
            setError(error);           
        }finally{
            setIsPending(false);
        }
    },[]);

    return { fetchDelete, isPending, error };
};