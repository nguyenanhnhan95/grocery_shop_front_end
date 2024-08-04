import { memo } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../../../assets/css/composite/modal/confirmModal.css"
import { AGREE, CLOSE } from '../../../utils/commonConstants';
import { getScreenThem } from '../../../utils/commonUtils';
function ConfirmModal(props) {
    const { handleShow, show, informationModal, handleAction, informationTitle } = props;
    return (
        <Modal show={show} onHide={() => handleShow(false)} className={`${getScreenThem()}`}>
            <Modal.Header closeButton>
                <Modal.Title>{informationTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{informationModal}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleShow(false)}>
                    {CLOSE}
                </Button>
                <Button variant="primary" onClick={handleAction}>
                    {AGREE}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default memo(ConfirmModal);