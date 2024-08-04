import { useCallback, useState } from "react";
import { createHeader } from "../../../utils/commonUtils";
import axios from "axios";
import { toastSuccess } from "../../../config/toast";

export const useFetchEdit = () => {
    const [isPending, setIsPending] = useState(false);
    const [code, setCode] = useState(null);
    const fetchEdit = useCallback(async (url, data, setErrors) => {
        setIsPending(true);
        try {
            console.log(data)
            const response = await axios.patch(url, data, createHeader());
            console.log(response)
            if (response.data?.code === 200) {
                toastSuccess(response.data.message)
            }
            setCode(response.data?.code)
            setIsPending(false);
        } catch (error) {
            if (error.response.data.code === 4013) {
                setErrors(error.response.data.result);
            }

        } finally {
            setIsPending(false);
        }
    }, []);

    return { fetchEdit, isPending, code };
};