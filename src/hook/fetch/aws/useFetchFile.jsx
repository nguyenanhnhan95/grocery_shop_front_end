
import { useCallback, useState } from "react";
import { getObject } from "../../../config/S3Config";
export const useFetchFile = () => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    
    const fetchFile = useCallback(async (keyName) => {
        setIsPending(true);
        try {
            const response = await getObject(keyName);
            setData(response);
            setError(null);
        } catch (err) {
            setError(`${err} Could not fetch data`);
        } finally {
            setIsPending(false);
        }
    }, []);

    return { fetchFile, data, isPending, error };
};