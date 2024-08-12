import { useNavigate } from "react-router-dom";
import "../../../assets/css/composite/table/actionDropdown.css"
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "../modal/ConfirmModal";
import { CONFIRM, NOTIFY_DELETE, REQUEST_PARAM_ID } from "../../../utils/commonConstants";
import { useFetchDelete } from "../../../hook/fetch/authenticated/useFetchDelete";
import { createActionURL } from "../../../utils/commonUtils";
import { createQueryParameter } from "../../../redux/slice/common/queryParameter";


function ActionDropdown(props) {
    const { id, url,optionActions } = props;
    const { initialQueryParameter } = useSelector(state => state.queryParameter)
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleReload = useCallback(() => {
        dispatch(createQueryParameter(JSON.parse(JSON.stringify(initialQueryParameter))))
    }, [])
    const { fetchDelete, isPending, error } = useFetchDelete({ url: `${createActionURL(url).instant()}${REQUEST_PARAM_ID}${id}`, handleReload: handleReload });
    const handleShowModal = useCallback((show) => {
        setShowModal(show)
    }, [])
    const handleAction = useCallback((action) => {
        switch (action.action) {
            case 'edit':
                setShowModal(false)
                navigate(`/admin/${url}/edit/${id}`);
                break;
            case 'delete':
                console.log("ádasd")
                handleShowModal(true)
                break;
            default:
                return;
        }
    }, [ id, handleShowModal, navigate])
    const handleDelete = useCallback(() => {
        fetchDelete()
        handleShowModal(false);
    }, [ id, handleShowModal])
    return (
        <div className="dropdown">
            <i className="fa-solid fa-ellipsis-vertical" data-bs-toggle="dropdown" aria-expanded="false" />
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-action" style={{height:Array.isArray(optionActions) ? 35*optionActions.length:'auto'}}>
                {optionActions.map((action, aIndex) => (
                    <div onClick={() => handleAction(action)} key={aIndex}><li className="dropdown-item"><i className={action.icon}></i>{action.name}</li></div>
                ))}

            </ul>
            <ConfirmModal handleAction={handleDelete} show={showModal} informationTitle={CONFIRM} informationModal={NOTIFY_DELETE} handleShow={handleShowModal} />
        </div>

    )
}
export default ActionDropdown;