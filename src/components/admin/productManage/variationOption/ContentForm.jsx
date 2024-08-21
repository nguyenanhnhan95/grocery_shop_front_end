import { Formik, Form, Field, ErrorMessage, } from "formik";
import * as yup from "yup";
import "../../../../assets/css/admin/productManage/variationOption/contentForm.css"
import "../../../../assets/css/admin/skeletonLoading/contentForm.css"
import { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectField } from "../../../composite/formik/SelectedField";
import { LOADING_CONTENT_FORM, REQUEST_PARAM_ID, THIS_FILED_ENTER_LARGE } from "../../../../utils/commonConstants";
import { useFetchGet } from "../../../../hook/fetch/authenticated/useFetchGet";
import { createActionURL } from "../../../../utils/commonUtils";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchByFiled } from "../../../../hook/fetch/authenticated/useFetchByFiled";
import { useFetchPost } from "../../../../hook/fetch/authenticated/useFetchPost";
import { useFetchPatch } from "../../../../hook/fetch/authenticated/useFetchPatch";
import { onClickSaveAction } from "../../../../redux/slice/admin/action/actionAdmin";
import { validation } from "../../../../utils/validation";
import { toastSuccess } from "../../../../config/toast";

function ContentForm(props) {
    const dispatch = useDispatch();
    const { initialForm, url } = props;
    const { id } = useParams();
    const { close } = useSelector((state) => state.actionAdmin);
    const navigate = useNavigate();
    const { fetchGet: fetchDataVariations, data: variations, isPending: isPendingVariations } = useFetchGet();
    const { fetchByField, data: initialEdit, isPending: isPendingInitialEdit, error: errorInitialEdit } = useFetchByFiled();
    const { fetchPost, code: codeSave, isPending: isPendingSave ,messageSave } = useFetchPost();
    const { fetchPatch, code: codeEdit, isPending: isPendingEdit,messageEdit } = useFetchPatch();
    const buttonRef = useRef(null);
    useEffect(() => {
        fetchDataVariations(createActionURL("products-variation").instant())
    }, [fetchDataVariations])
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
        <div className={isPendingVariations || isPendingInitialEdit && LOADING_CONTENT_FORM}>
            <div className="main-content-form-variation main-content-form " >
                <div className="card card-form-variation">
                    <div className="card-header">
                        <div className="card-header-title">
                            Thông tin giá trị tùy chọn
                        </div>
                    </div>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            name: initialEdit?.name ?? initialForm.name,
                            description: initialEdit?.description ?? initialForm.description,
                            idVariation: initialEdit?.variation?.id ?? initialForm.variation.id,
                        }}
                        validationSchema={yup.object().shape({
                            name: yup.string().trim().required("Chưa nhập tên :"),
                            description: yup.string().trim()
                                .max(250, THIS_FILED_ENTER_LARGE),
                            idVariation: yup.string().required("Chưa nhập Option :")
                                .matches(/^\d+\.?\d*$/, "Hệ thống dữ liệu nhập sai :")
                        })}
                        onSubmit={(data, { setErrors }) =>
                            handleDataToServer(data, setErrors)
                        }
                    >
                        <Form>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <div className="card-body-label">
                                            <label htmlFor="name">Tên</label>
                                        </div>
                                        <div className="card-body-input">
                                            <Field name="name" className="form-control" type="text" autoComplete="off" />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='name' component='div' />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="card-body-label">
                                            <label htmlFor="description">Mô tả</label>
                                        </div>
                                        <div className="card-body-input">
                                            <Field name="description" className="form-control" as="textarea" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="card-body-label">
                                            <label htmlFor="idVariation">Option</label>
                                        </div>
                                        <div className="card-body-input">
                                            <SelectField
                                                name="idVariation"
                                                className="form-control"
                                                options={variations}
                                                nameDefault="- Chọn giá trị -"
                                            />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='idVariation' component='div' />
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