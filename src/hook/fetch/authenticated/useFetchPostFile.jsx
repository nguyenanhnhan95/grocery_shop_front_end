import { useCallback, useState } from "react";
import axios from "axios";
import { useAuthenticateTokenException } from "../../handler/useAuthenticateTokenException";

export const useFetchPostFile = () => {
    const [isPending, setIsPending] = useState(false);
    const [code, setCode] = useState(null);
    const { handleAuthenticateException } = useAuthenticateTokenException();
    const [message,setMessage] = useState(null);
    const fetchPostFile = useCallback(async (url,formData, data, setErrors) => {
        setIsPending(true);
        try {
            console.log(url)
            console.log(formData)
            const response = await axios.post(url,formData, data, {withCredentials:true});
            console.log(response)
            if (response.data?.code === 200) {
                setMessage(response.data.message)
            }
            setCode(response.data?.code)
            setIsPending(false);
            setErrors(null);
        } catch (error) {
            console.log(error)
            if (error.response.data.code === 4013) {
                setErrors(error.response.data.result);
            }
            handleAuthenticateException({error:error,code:error?.response?.data?.status,handleService: () => fetchPostFile(url,formData, data, setErrors)})
        } finally {
            setIsPending(false);
        }
    }, []);

    return { fetchPostFile, isPending, code,message};
};