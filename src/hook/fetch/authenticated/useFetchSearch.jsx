import axios from "axios";
import { useEffect, useState } from "react";
import { REQUEST_PARAM_QUERY } from "../../../utils/commonConstants";
import {  useDispatch, useSelector } from "react-redux";
import { useAuthenticateTokenException } from "../../handler/useAuthenticateTokenException";
import { chaneProgressTop } from "../../../redux/slice/layout/loadingBarTop";

export const useFetchSearch = (props) => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const { url, initialData } = props;
    const { queryParameter } = useSelector(state => state.queryParameter)
    const [data, setData] = useState(initialData);
    const dispatch = useDispatch();
    const { handleAuthenticateException } = useAuthenticateTokenException();
    useEffect(() => {
        const fetchData = async () => {
            setIsPending(true);
            dispatch(chaneProgressTop(20))
            try {
                const encodedQuery = encodeURIComponent(JSON.stringify(queryParameter));
                const response = await axios.get(`${url}${REQUEST_PARAM_QUERY}${encodedQuery}`, {withCredentials:true});
                dispatch(chaneProgressTop(50))
                setIsPending(false)
                if(Array.isArray(response?.data?.result?.result)){
                    setData(response.data.result);
                } 
                setError(null);
            } catch (error) {
                dispatch(chaneProgressTop(50))
                handleAuthenticateException({error:error,code:error?.response?.data?.code,handleService: () => fetchData()})
                setData(initialData)
                setError(`${error} Could not Fetch Data `);                
            } finally{
                dispatch(chaneProgressTop(100))
                setIsPending(false);
            }
        };
        fetchData();
    }, [url,queryParameter]);
    return { data, isPending, error };
};