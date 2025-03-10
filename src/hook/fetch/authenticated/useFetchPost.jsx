import { useCallback, useState } from "react";
import axios from "axios";
import { validation } from "../../../utils/validation";
import { useAuthenticateTokenException } from "../../handler/useAuthenticateTokenException";
import { useDispatch } from "react-redux";
import { chaneProgressTop } from "../../../redux/slice/layout/loadingBarTop";



export const useFetchPost = () => {
    const [isPending, setIsPending] = useState(false);
    const [code, setCode] = useState(null);
    const [message,setMessage] = useState(null);
    const { handleAuthenticateException } = useAuthenticateTokenException();
    const dispatch = useDispatch();
    const fetchPost = useCallback(async (url, data, setErrors, handleErrorsMessage) => {
        setIsPending(true);
        dispatch(chaneProgressTop(20))
        try {
            const response = await axios.post(url, data, { withCredentials: true });
            dispatch(chaneProgressTop(50))
            if (response.data?.code === 200) {
                setMessage(response.data.message)
            }
            setCode(response.data?.code)
            setIsPending(false);
            setErrors(null);
        } catch (error) {
            dispatch(chaneProgressTop(50))
            console.log(error)
            if (error.response.data.code === 4013) {
                if (validation.checkFunction(handleErrorsMessage)) {
                    handleErrorsMessage(error.response.data.result, setErrors);
                } else {
                    setErrors(error.response.data.result)
                }

            }
            handleAuthenticateException({ error: error, code: error?.response?.data?.code, handleService: () => fetchPost(url, data, setErrors, handleErrorsMessage) })
        } finally {
            dispatch(chaneProgressTop(100))
            setIsPending(false);
        }
    }, []);

    return { fetchPost, isPending, code ,message};
};