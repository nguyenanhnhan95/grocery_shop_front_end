
import { useCallback, useState, useMemo } from "react";
import { getObjectUrlImage } from "../../../config/S3Config";

export const useFetchUrlImage = () => {
    const [state, setState] = useState({
        isPending: false,
        error: null,
        data: null,
    });

    const fetchUrlImage = useCallback(async (keyName) => {
        setState({ isPending: true, error: null, data: null });
        try {
            const response = await getObjectUrlImage(keyName);
            setState({ isPending: false, error: null, data: response });
        } catch (err) {
            setState({ isPending: false, error: `Could not fetch data: ${err.message || err}`, data: null });
        }
    }, []);

    const { isPending, error, data } = state;

    return useMemo(() => ({ fetchUrlImage, isPending, error, data }), [fetchUrlImage, isPending, error, data]);
};