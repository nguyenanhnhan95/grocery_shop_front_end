import { useNavigate } from "react-router-dom";
import "../../../assets/css/admin/common/saveAction.css"
import { useDispatch, useSelector } from "react-redux";
import { actionSave } from "../../../redux/slice/admin/action/actionAdmin";
import { memo } from "react";
function SaveAction(props) {
  const { onClickAction } = useSelector((state) => state.actionAdmin)
  const {url} = props;
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleSaveClose = (close) => {
    onClickAction.buttonSave.click()
    dispatch(actionSave({ close: close }))
  }
  const handleClose = () => {
    navigate(`/admin/${url}`)
  }
  return (
    <>
      <div className="main-content-action-save">
        <div className="container-fluid container-content-action-save">
          <div className="d-flex justify-content-start align-items-center">
            <button type="button" className="content-action-save-button"
              onClick={() => handleSaveClose(false)}><i className="fa-solid fa-floppy-disk" />Lưu</button>
            <button type="button" className="content-action-save-button" onClick={() => handleSaveClose(true)}>
              <i className="fa-solid fa-floppy-disk" />Lưu và Đóng</button>
            <button type="button" className="content-action-save-button" onClick={handleClose}>
              <i className="fa-solid fa-xmark" />Đóng</button>
          </div>
        </div>
      </div>
    </>
  )
}
export default memo(SaveAction);