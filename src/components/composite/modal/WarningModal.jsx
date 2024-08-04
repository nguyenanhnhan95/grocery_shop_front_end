import { memo } from "react";
import { Button, Modal } from "react-bootstrap";
import { AGREE, VARIANT_OUTLINE_WANING } from "../../../utils/commonConstants";
import "../../../assets/css/composite/modal/warningModal.css"
import { getScreenThem } from "../../../utils/commonUtils";
function WarningModal(props){
    const { handleShow, show, informationModal  } = props;
    return (
        <Modal show={show} className={`${getScreenThem()} modal-warning`} onHide={() => handleShow(false)} >
            <Modal.Body>{informationModal}</Modal.Body>
            <Modal.Footer >
                <Button variant={VARIANT_OUTLINE_WANING} onClick={() => handleShow(false)}>
                    {AGREE}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default memo(WarningModal);