import axios from "axios";
import { useEffect, useState } from "react";
import { createHeader } from "../../../utils/commonUtils";

export const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const response = await axios.get(url, createHeader());
        setIsPending(false);
        setData(response.data.result);
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