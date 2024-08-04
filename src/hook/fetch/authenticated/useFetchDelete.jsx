import axios from "axios";
import { useCallback, useState } from "react";
import { createHeader } from "../../../utils/commonUtils";
import { validation } from "../../../utils/validation";
import { toastSuccess } from "../../../config/toast";

export const useFetchDelete = (props) => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const { url, handleReload } = props;
    const fetchDelete =useCallback( async () => {
        setIsPending(true);
        try {
            const response = await axios.delete(url, createHeader());
            if (response.data?.code===200 && validation.checkFunction(handleReload)) {               
                handleReload()
                toastSuccess(response.data?.message)
            }
            setIsPending(false);
            setError(null);
        } catch (error) {
            setError(`${error} Could not Fetch Data`);           
        }finally{
            setIsPending(false);
        }
    },[]);

    return { fetchDelete, isPending, error };
};