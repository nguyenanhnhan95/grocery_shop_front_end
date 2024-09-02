import axios from "axios";
import { useCallback, useState } from "react";
import { useAuthenticateTokenException } from "../../handler/useAuthenticateTokenException";

export const useFetchByFiled = () => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [code,setCode]=useState(null);
    const { handleAuthenticateException } = useAuthenticateTokenException();
    const fetchByField = useCallback(async (url) => {
        setIsPending(true);
        try {
            const response = await axios.get(url, {withCredentials:true});
            setData(response.data.result);
            setCode(200)
            setError(null);
        } catch (err) {
            console.log(err)
            setError(err);
        } finally {
            setIsPending(false);
        }
    }, []);

    return { fetchByField, data, isPending, error,code };
};