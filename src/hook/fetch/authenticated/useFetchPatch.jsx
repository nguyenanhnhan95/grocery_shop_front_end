import { useCallback, useState } from "react";
import axios from "axios";
import { toastError} from "../../../config/toast";
import { useAuthenticateTokenException } from "../../handler/useAuthenticateTokenException";


export const useFetchPatch = () => {
    const [isPending, setIsPending] = useState(false);
    const [code, setCode] = useState(null);
    const [message,setMessage] = useState(null);
    const { handleAuthenticateException } = useAuthenticateTokenException();
    const fetchPatch = useCallback(async (url, data, setErrors) => {
        setIsPending(true);
        try {
            const response = await axios.patch(url, data, { withCredentials: true });
            console.log(response)
            if (response.data?.code === 200) {
                setMessage(response.data.message)
            }
            setCode(response.data?.code)
            setIsPending(false);
        } catch (error) {
            if (error?.response?.data?.code === 4013) {
                if ("notification" in error.response.data?.result) {
                    toastError(error.response.data.result?.notification)
                } else {
                    setErrors(error.response.data.result);
                }
            }
            handleAuthenticateException({ error: error, code: error?.response?.data?.status, handleService: () => fetchPatch(url, data, setErrors) })
        } finally {
            setIsPending(false);
        }
    }, []);

    return {  fetchPatch, isPending, code,message };
};