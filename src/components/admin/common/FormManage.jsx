import { memo, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createDataEdit, editDataAdmin, getDataByIdAdmin, onClickSaveAction, saveDataAdmin, saveFileDataAdmin } from "../../../redux/slice/admin/action/actionAdmin";
import { toastError, toastInformation } from "../../../config/toast";
import { validation } from "../../../utils/validation";

function FormManage({ Form }) {
    const { editForm, httpApi, httpNavigate, close } = useSelector((state) => state.actionAdmin)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const buttonRef = useRef(null);
    const { id } = useParams();
    const getDataEdit = useCallback(async () => {
        try {
            const response = await dispatch(getDataByIdAdmin({ http: httpApi, data: id * 1 })).unwrap();
            if (response.code === 200) {
                dispatch(createDataEdit(response.result))
            }
        } catch (error) {
            toastError("Dữ liệu đang lỗi!")
        }
    }, [httpApi, id, dispatch]);
    useEffect(() => {
        dispatch(onClickSaveAction({ buttonSave: buttonRef.current }))
        if (id !== undefined && validation.isNumber(id)) {
            getDataEdit()
        }
    }, [getDataEdit, id, dispatch])
    const handleSave = useCallback(async (value, setErrors) => {
        try {
            console.log(close)
            if (id !== undefined && validation.isNumber(id)) {
                await dispatch(editDataAdmin({ http: httpApi, id: id, data: value })).unwrap()
            } else {
                await dispatch(saveDataAdmin({ http: httpApi, data: value })).unwrap()
            }
            if (close) {
                navigate(httpNavigate)
            }
        } catch (error) {
            if (error.code === 4001 || error.code === 4002) {
                toastInformation(error.message)
            }
            setErrors(error.result)
        }

    }, [id, httpApi, close, dispatch, httpNavigate, navigate])
    const handleContainFileSave = useCallback(async (value, formData, setErrors) => {
        try {
            console.log(close)
            if (id !== undefined && validation.isNumber(id)) {
                await dispatch(editDataAdmin({ http: httpApi, id: id, formData: formData, data: value })).unwrap()
            } else {
                await dispatch(saveFileDataAdmin({ http: httpApi, formData: formData, data: value })).unwrap()
            }
            if (close) {
                navigate(httpNavigate)
            }
        } catch (error) {
            if (error.code === 4001 || error.code === 4002) {
                toastInformation(error.message)
            }
            setErrors(error.result)
        }

    }, [id, httpApi, close, dispatch, httpNavigate, navigate])
    return (
        <Form buttonRef={buttonRef} initialForm={editForm} handleContainFileSave={handleContainFileSave} handleSave={handleSave} />
    )
}
export default memo(FormManage);