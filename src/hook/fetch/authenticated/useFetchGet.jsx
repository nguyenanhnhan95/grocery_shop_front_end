import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { useAuthenticateTokenException } from "../../handler/useAuthenticateTokenException";

export const useFetchGet = () => {
  const [data, setData] = useState();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [code, setCode] = useState(null);
  const { handleAuthenticateException } = useAuthenticateTokenException();
  const fetchGet = useCallback(async (url) => {
    setIsPending(true);
    try {
      const response = await axios.get(url, { withCredentials: true });
      setCode(response.data?.code)
      setData(response.data?.result);
      setError(null);
    } catch (error) {
      setError(error);
      console.log(error)
      // if(error?.payload?.response?.data?.status===4008){

      // }
      handleAuthenticateException({ error: error, code: error?.response?.data?.code, handleService: () => fetchGet(url) })
    } finally {
      setIsPending(false);
    }
  }, []);
  return useMemo(() => ({
    fetchGet,
    data,
    isPending,
    error,
    code,
  }), [data, isPending, error, code, fetchGet]);
};