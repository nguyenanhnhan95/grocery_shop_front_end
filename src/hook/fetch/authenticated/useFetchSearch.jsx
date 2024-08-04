import axios from "axios";
import { useEffect, useState } from "react";
import { createHeader } from "../../../utils/commonUtils";
import { REQUEST_PARAM_QUERY } from "../../../utils/commonConstants";
import { useSelector } from "react-redux";

export const useFetchSearch = (props) => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const { url, initialData } = props;
    const { queryParameter } = useSelector(state => state.queryParameter)
    const [data, setData] = useState(initialData);
    useEffect(() => {
        const fetchData = async () => {
            setIsPending(true);
            try {
                const encodedQuery = encodeURIComponent(JSON.stringify(queryParameter));
                const response = await axios.get(`${url}${REQUEST_PARAM_QUERY}${encodedQuery}`, createHeader());
                setIsPending(false)
                setData(response.data.result);
                setError(null);
            } catch (error) {
                setError(`${error} Could not Fetch Data `);
                setIsPending(false);
            }
        };
        fetchData();
    }, [url,queryParameter]);
    return { data, isPending, error };
};