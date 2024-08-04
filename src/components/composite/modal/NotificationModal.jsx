import { memo, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { getScreenThem } from "../../../utils/commonUtils";
import { AGREE, NOTIFICATION, VARIANT_OUTLINE_WANING } from "../../../utils/commonConstants";
import "../../../assets/css/composite/modal/commonModal.css"
import "../../../assets/css/composite/modal/notificationModal.css"
import { useDispatch, useSelector } from "react-redux";
import { actionCloseNotificationModal } from "../../../redux/action/modal/actionNotificationModal";
import { handleNotificationModal } from "../../../redux/slice/modal/notificationModal";
function NotificationModal() {
    const dispatch = useDispatch();
    const {show,message} = useSelector((state)=>state.notificationModal)
    const { screenMode } = useSelector((state) => state.profile)
    const handleRedirectBefore=()=>{
        dispatch(handleNotificationModal(actionCloseNotificationModal()))
        window.history.back();
    }

    return (
        <Modal show={show} className={`${getScreenThem(screenMode)} notification-modal`}  >
            <Modal.Header closeButton={false}  >
                <Modal.Title >{NOTIFICATION}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer >
                <Button variant={VARIANT_OUTLINE_WANING} onClick={()=>handleRedirectBefore()}>
                    {AGREE}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default memo(NotificationModal)