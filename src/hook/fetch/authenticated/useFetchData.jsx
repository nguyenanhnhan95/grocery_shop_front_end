import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { useAuthenticateTokenException } from "../../handler/useAuthenticateTokenException";

export const useFetchData = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [code, setCode] = useState(null);
  const { handleAuthenticateException } = useAuthenticateTokenException();
  const fetchData = useCallback(async (url) => {
    setIsPending(true);
    try {
      const response = await axios.get(url, {withCredentials:true});
      setCode(response.data?.code)
      setData(response.data?.result);
      setError(null);
    } catch (error) {
      setError(error);
      // if(error?.payload?.response?.data?.status===4008){

      // }
      handleAuthenticateException({error:error,code:error?.response?.data?.status,handleService: () => fetchData(url)})
    } finally {
      setIsPending(false);
    }
  }, []);
  return useMemo(() => ({
    fetchData,
    data,
    isPending,
    error,
    code,
  }), [data, isPending, error, code,fetchData]);
};