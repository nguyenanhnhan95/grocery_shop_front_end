import axios from "axios";
import { useCallback, useState } from "react";
import { createHeader } from "../../../utils/commonUtils";

export const useFetchByFiled = () => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    
    const fetchByField = useCallback(async (url) => {
        setIsPending(true);
        try {
            const response = await axios.get(url, createHeader());
            setData(response.data.result);
            setError(null);
        } catch (err) {
            setError(`${err} Could not fetch data`);
        } finally {
            setIsPending(false);
        }
    }, []);

    return { fetchByField, data, isPending, error };
};