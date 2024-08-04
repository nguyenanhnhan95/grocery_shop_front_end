import { useDispatch, useSelector } from "react-redux";
import { memo, useCallback, useEffect } from "react";
import { getToken } from "../../utils/commonUtils";
import LoadingPage from "../loading/LoadingPage";
import { fetchProfileSlice } from "../../redux/slice/person/profile";
import { FETCH_PROFILE } from "../../redux/action/person/person";


function InitialHome({ children }) {
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.profile)
  useEffect(() => {
    if (getToken() && status === FETCH_PROFILE.FETCH_PROFILE_INITIAL) {
      dispatch(fetchProfileSlice());
    }
  }, [status, dispatch])
  const completeApi = useCallback(() => {
    return status === FETCH_PROFILE.FETCH_PROFILE_SUCCESS || !getToken();
  }, [status]);
  console.log(status)
  return (
    <>
      {status === FETCH_PROFILE.FETCH_PROFILE_LOADING && <LoadingPage />}
      {completeApi() && <>{children}</>}
    </>
  )
}
export default memo(InitialHome);