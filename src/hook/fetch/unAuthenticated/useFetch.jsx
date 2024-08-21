import axios from "axios";
import { useState } from "react";

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        setIsPending(true);
        try {
          const response = await axios.get(url);
          setIsPending(false);
          setData(response.data);
          setError(null);
        } catch (error) {
          setError(`${error} Could not Fetch Data `);
          setIsPending(false);
        }
      };
      fetchData();
    }, [url]);
    return { data, isPending, error };
  };