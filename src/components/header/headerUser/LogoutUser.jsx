import { memo, useEffect } from "react";
import { useFetchData } from "../../../hook/fetch/authenticated/useFetchData";
import { createActionURL } from "../../../utils/commonUtils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutProfile } from "../../../redux/slice/person/profile";

function LogoutUser(props){
    const { fetchData, isPending, error, code } = useFetchData();
    const {handleCloseHeaderModel} = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        if (!isPending) {
            fetchData(createActionURL("auth/logout").instant());
        }
    };

    useEffect(() => {
        if (code === 200) {
            dispatch(logoutProfile())
            handleCloseHeaderModel()
            navigate("/");
        }
    }, [code, navigate]);

    useEffect(() => {
        if (error !== null) {
            navigate(`?error=${encodeURIComponent(error)}`);
        }
    }, [error, navigate]);
    return(
        <div className="header-user-modal-item" onClick={handleLogout}><i className="fa-solid fa-power-off"></i>Đăng xuất</div>
    )
}
export default memo(LogoutUser)