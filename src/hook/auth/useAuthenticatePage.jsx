
import { useFetchGet } from "../fetch/authenticated/useFetchGet";
import { useEffect, useState } from "react";
import { createActionURL } from "../../utils/commonUtils";
import LoadingPage from "../../components/loading/LoadingPage";

export const useAuthenticatePage = () => {
    const { fetchGet, isPending, error, code } = useFetchGet();
    const [checkAuthenticate, setCheckAuthenticate] = useState(false)
    const [authenticate, setAuthenticate] = useState(false);
    useEffect(() => {
        fetchGet(createActionURL("auth/check-auth").instant())
    }, [fetchGet])
    useEffect(() => {
        if (error !== null || code !== null) {
            if (code === 200) {
                setAuthenticate(true)
            }
            setCheckAuthenticate(true)
        }
    }, [error, code])
    if (isPending || !checkAuthenticate) {
        return <LoadingPage />
    }
    if (checkAuthenticate) {
        return { authenticate, checkAuthenticate }
    }
}