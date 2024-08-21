import { Formik, Form, Field, ErrorMessage, } from "formik";
import * as yup from "yup";
import "../../../../assets/css/admin/productManage/variation/contentForm.css"
import { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onClickSaveAction } from "../../../../redux/slice/admin/action/actionAdmin";
import { useFetchByFiled } from "../../../../hook/fetch/authenticated/useFetchByFiled";
import { LOADING_CONTENT_FORM, REQUEST_PARAM_ID, THIS_FILED_ENTER_LARGE } from "../../../../utils/commonConstants";
import { useNavigate, useParams } from "react-router-dom";
import { validation } from "../../../../utils/validation";
import { createActionURL } from "../../../../utils/commonUtils";
import { useFetchPost } from "../../../../hook/fetch/authenticated/useFetchPost";
import { useFetchPatch } from "../../../../hook/fetch/authenticated/useFetchPatch";
import { toastSuccess } from "../../../../config/toast";


function ContentForm(props) {
    const dispatch = useDispatch();
    const { initialForm, url } = props;
    const { id } = useParams();
    const { close } = useSelector((state) => state.actionAdmin);
    const navigate = useNavigate();
    const { fetchByField, data: initialEdit, isPending: isPendingInitialEdit, error: errorInitialEdit } = useFetchByFiled();
    const { fetchPost, code: codeSave, isPending: isPendingSave ,message:messageSave } = useFetchPost();
    const { fetchPatch, code: codeEdit, isPending: isPendingEdit ,message:messageEdit } = useFetchPatch();
    const buttonRef = useRef(null);

    useEffect(() => {
        dispatch(onClickSaveAction({ buttonSave: buttonRef.current }))
        if (id !== undefined && validation.isNumber(id)) {
            fetchByField(`${createActionURL(url).instant()}${REQUEST_PARAM_ID}${id}`)
        }
    }, [fetchByField, id, dispatch])
    const handleDataToServer = (data, setErrors) => {
        if (isPendingSave !== true && isPendingEdit !== true) {
            if (id !== undefined && validation.isNumber(id)) {
                fetchPatch(`${createActionURL(url).instant()}${REQUEST_PARAM_ID}${id}`, data, setErrors)
            } else {
                fetchPost(createActionURL(url).instant(), data, setErrors)
            }
        }
    }
    useEffect(() => {
        const handleNavigationAndToast = (code, message) => {
            if (code === 200) {
                if(close){
                    navigate(`/admin/${url}`);
                }               
                toastSuccess(message);
            }
        };
    
        handleNavigationAndToast(codeSave, messageSave);
        handleNavigationAndToast(codeEdit, messageEdit);
    }, [codeSave, codeEdit, close, navigate, url]);
    return (
        <div className={isPendingInitialEdit && LOADING_CONTENT_FORM}>
            <div className="main-content-form-variation main-content-form" >
                <div className="card card-form-variation">
                    <div className="card-header">
                        <div className="card-header-title">
                            Thông tin tùy chọn sản phẩm
                        </div>
                    </div>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            name: initialEdit?.name ?? initialForm.name,
                            description: initialEdit?.description ?? initialForm.description,
                        }}
                        validationSchema={yup.object({
                            name: yup.string().trim().required("Chưa nhập tên :"),
                            description: yup.string().trim()
                                .max(250, THIS_FILED_ENTER_LARGE),
                        })}
                        onSubmit={(data, { setErrors }) =>
                            handleDataToServer(data, setErrors)
                        }
                    >
                        <Form>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="name">Tên</label>
                                        <Field name="name" className="form-control" type="text" autoComplete="off" />
                                        <ErrorMessage className="form-text form-error" name='name' component='div' />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="description">Mô tả</label>
                                        <Field name="description" className="form-control" as="textarea" />
                                    </div>
                                </div>
                                <button type="submit" style={{ display: 'none' }} ref={buttonRef}></button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}
export default memo(ContentForm);