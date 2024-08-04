import { Formik, Form, Field, ErrorMessage, } from "formik";
import * as yup from "yup";
import "../../../../assets/css/admin/productManage/variationOption/contentForm.css"
import { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectField } from "../../../composite/formik/SelectedField";
import { LOADING_CONTENT_FORM, REQUEST_PARAM_ID } from "../../../../utils/commonConstants";
import { useFetchData } from "../../../../hook/fetch/authenticated/useFetchData";
import { createActionURL } from "../../../../utils/commonUtils";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchByFiled } from "../../../../hook/fetch/authenticated/useFetchByFiled";
import { useFetchSave } from "../../../../hook/fetch/authenticated/useFetchSave";
import { useFetchEdit } from "../../../../hook/fetch/authenticated/useFetchEdit";
import { onClickSaveAction } from "../../../../redux/slice/admin/action/actionAdmin";
import { validation } from "../../../../utils/validation";

function ContentForm(props) {
    const dispatch = useDispatch();
    const { initialForm, url } = props;
    const { id } = useParams();
    const { close } = useSelector((state) => state.actionAdmin);
    const navigate = useNavigate();
    const { data: variations, isPending: isPendingVariations, error: errorVariations } = useFetchData(createActionURL("products-variation").instant());
    const { fetchByField, data: initialEdit, isPending: isPendingInitialEdit, error: errorInitialEdit } = useFetchByFiled();
    const { fetchSave, code: codeSave, isPending: isPendingSave } = useFetchSave();
    const { fetchEdit, code: codeEdit, isPending: isPendingEdit } = useFetchEdit();
    const buttonRef = useRef(null);

    useEffect(() => {
        dispatch(onClickSaveAction({ buttonSave: buttonRef.current }))
        if (id !== undefined && validation.isNumber(id)) {
            fetchByField(`${createActionURL(url).instant()}${REQUEST_PARAM_ID}${id}`)
        }
    }, [fetchByField, id, dispatch])
    const handleDataToServer = (data, setErrors) => {
        console.log(data)
        if (id !== undefined && validation.isNumber(id)) {
            fetchEdit(`${createActionURL(url).instant()}${REQUEST_PARAM_ID}${id}`, data, setErrors)
        } else {
            console.log(data)
            fetchSave(createActionURL(url).instant(), data, setErrors)
        }
    }
    useEffect(() => {
        if (codeSave === 200 || codeEdit === 200) {
            if (close) {
                navigate(`/admin/${url}`);
            }
        }
    }, [codeSave, codeEdit, close, navigate, url]);
    return (
        <div className={isPendingVariations && LOADING_CONTENT_FORM}>
            <div className="main-content-form-variation main-content-form " >
                <div className="card card-form-variation">
                    <div className="card-header">
                        Thông tin giá trị tùy chọn
                    </div>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            name: initialEdit?.name ?? initialForm.name,
                            description:initialEdit?.description ?? initialForm.description,
                            idVariation: initialEdit?.variation?.id ?? initialForm.variation.id,
                        }}
                        validationSchema={yup.object({
                            name: yup.string().required("Chưa nhập tên :"),
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
                                            <Field name="name" className="form-control" type="text" autoComplete="off"/>
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