import { useCallback, useState } from "react";
import { createHeader } from "../../../utils/commonUtils";
import axios from "axios";
import { toastSuccess } from "../../../config/toast";

export const useFetchSave = () => {
    const [isPending, setIsPending] = useState(false);
    const [code, setCode] = useState(null);
    const fetchSave = useCallback(async (url, data, setErrors) => {
        setIsPending(true);
        try {
            const response = await axios.post(url, data, createHeader());
            if (response.data?.code === 200) {
                toastSuccess(response.data.message)
            }
            setCode(response.data?.code)
            setIsPending(false);
            setErrors(null);
        } catch (error) {
            if (error.response.data.code === 4013) {
                setErrors(error.response.data.result);
            }

        } finally {
            setIsPending(false);
        }
    }, []);

    return { fetchSave, isPending, code };
};