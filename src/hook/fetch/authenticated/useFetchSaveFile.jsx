import { useCallback, useState } from "react";
import { createHeader } from "../../../utils/commonUtils";
import axios from "axios";
import { toastSuccess } from "../../../config/toast";

export const useFetchSaveFile = () => {
    const [isPending, setIsPending] = useState(false);
    const [code, setCode] = useState(null);
    const fetchSaveFile = useCallback(async (url,formData, data, setErrors) => {
        setIsPending(true);
        try {
            console.log(url)
            console.log(formData)
            const response = await axios.post(url,formData, data, createHeader());
            console.log(response)
            if (response.data?.code === 200) {
                toastSuccess(response.data.message)
            }
            setCode(response.data?.code)
            setIsPending(false);
            setErrors(null);
        } catch (error) {
            console.log(error)
            if (error.response.data.code === 4013) {
                setErrors(error.response.data.result);
            }

        } finally {
            setIsPending(false);
        }
    }, []);

    return { fetchSaveFile, isPending, code };
};