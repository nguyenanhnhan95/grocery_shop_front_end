import { memo } from "react";
import { getScreenThem } from "../../../utils/commonUtils";
import { Modal } from "react-bootstrap";

function ImageModel(props){
    const { handleShow, show ,urlImage  } = props;
    return(
        <Modal show={show} className={`${getScreenThem()} modal-fullscreen`} onHide={() => handleShow(false)} >
            <Modal.Body>
                <img src={urlImage} alt=""/>
            </Modal.Body>
        </Modal>
    )
}
export default memo(ImageModel)