import { useCallback, useState } from "react";
import axios from "axios";
import { toastError} from "../../../config/toast";
import { useAuthenticateTokenException } from "../../handler/useAuthenticateTokenException";
import { useDispatch } from "react-redux";
import { chaneProgressTop } from "../../../redux/slice/layout/loadingBarTop";


export const useFetchPut = () => {
    const [isPending, setIsPending] = useState(false);
    const [code, setCode] = useState(null);
    const [message,setMessage] = useState(null);
    const dispatch = useDispatch();
    const { handleAuthenticateException } = useAuthenticateTokenException();
    const fetchPut = useCallback(async (url, data, setErrors) => {
        setIsPending(true);
        dispatch(chaneProgressTop(20))
        try {
            const response = await axios.put(url, data, { withCredentials: true });
            dispatch(chaneProgressTop(50))
            if (response.data?.code === 200) {
                setMessage(response.data.message)
            }
            setCode(response.data?.code)
            setIsPending(false);
        } catch (error) {
            dispatch(chaneProgressTop(50))
            if (error?.response?.data?.code === 4013) {
                if ("notification" in error.response.data?.result) {
                    toastError(error.response.data.result?.notification)
                } else {
                    setErrors(error.response.data.result);
                }
            }
            handleAuthenticateException({ error: error, code: error?.response?.data?.code, handleService: () => fetchPut(url, data, setErrors) })
        } finally {
            dispatch(chaneProgressTop(100))
            setIsPending(false);
        }
    }, []);

    return {  fetchPut, isPending, code,message };
};