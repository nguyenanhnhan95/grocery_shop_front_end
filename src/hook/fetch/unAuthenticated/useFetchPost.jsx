import { useCallback, useState } from "react";
import axios from "axios";
import { validation } from "../../../utils/validation";


export const useFetchPost = () => {
    const [isPending, setIsPending] = useState(false);
    const [code, setCode] = useState(null);
    const fetchPost = useCallback(async (url, data, setErrors, handleErrorsMessage) => {
        setIsPending(true);
        try {
            const response = await axios.post(url, data);
            console.log(response)         
            setCode(response.data?.code)
            setErrors(null);
            return response.data
        } catch (error) {
            console.log(error)
            if (error?.response?.data?.code === 4013) {
                if (validation.checkFunction(handleErrorsMessage)) {
                    handleErrorsMessage(error.response.data.result, setErrors);
                } else {
                    setErrors(error.response.data.result)
                }

            }
        } finally {
            setIsPending(false);
        }
    }, []);

    return { fetchPost, isPending, code };
};