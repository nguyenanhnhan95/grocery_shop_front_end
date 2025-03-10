
import { useCallback, useState, useMemo } from "react";
import { getObjectAsFile } from "../../../config/S3Config";

export const useFetchFile = () => {
    const [state, setState] = useState({
        isPending: false,
        error: null,
        data: null,
    });

    const fetchFile = useCallback(async (keyName) => {
        setState({ isPending: true, error: null, data: null });
        try {
            const response = await getObjectAsFile(keyName);
            setState({ isPending: false, error: null, data: response });
        } catch (err) {
            setState({ isPending: false, error: `Could not fetch data: ${err.message || err}`, data: null });
        }
    }, []);

    const { isPending, error, data } = state;

    return useMemo(() => ({ fetchFile, isPending, error, data }), [fetchFile, isPending, error, data]);
};