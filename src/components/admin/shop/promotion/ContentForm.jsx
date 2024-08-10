import { Formik, Form, ErrorMessage, Field } from "formik";
import "../../../../assets/css/admin/shop/promotion/contentForm.css"
import "../../../../assets/css/admin/skeletonLoading/contentForm.css"
import { memo, useEffect, useRef } from "react";
import * as yup from "yup";
import { DatePickerField } from "../../../composite/formik/DatePickerField";
import { LOADING_CONTENT_FORM, PERCENT_STRING, REQUEST_PARAM_ID, THIS_FIELD_CANNOT_EMPTY_2, THIS_FIELD_DATE_GREATER_EQUAL_DATE_CURRENT, THIS_FIELD_VALUE_NOT_FORMAT, THIS_FILED_ENTER_LARGE, THIS_FILED_ENTER_SMALL, TYPE_INPUT_NUMBER, TYPE_INPUT_TEXT } from "../../../../utils/commonConstants";
import { InputAdornmentField } from "../../../composite/formik/InputAdornmentField";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchByFiled } from "../../../../hook/fetch/authenticated/useFetchByFiled";
import { useFetchSave } from "../../../../hook/fetch/authenticated/useFetchSave";
import { useFetchEdit } from "../../../../hook/fetch/authenticated/useFetchEdit";
import { onClickSaveAction } from "../../../../redux/slice/admin/action/actionAdmin";
import { createActionURL } from "../../../../utils/commonUtils";
import { regex, validation } from "../../../../utils/validation";
function ContentForm(props) {
    const dispatch = useDispatch();
    const { initialForm, url } = props;
    const { id } = useParams();
    const { close } = useSelector((state) => state.actionAdmin);
    const navigate = useNavigate();
    const buttonRef = useRef(null);
    const { fetchByField, data: initialEdit, isPending: isPendingInitialEdit, error: errorInitialEdit } = useFetchByFiled();
    const { fetchSave, code: codeSave, isPending: isPendingSave } = useFetchSave();
    const { fetchEdit, code: codeEdit, isPending: isPendingEdit } = useFetchEdit();
    useEffect(() => {
        dispatch(onClickSaveAction({ buttonSave: buttonRef.current }))
        if (id !== undefined && validation.isNumber(id)) {
            fetchByField(`${createActionURL(url).instant()}${REQUEST_PARAM_ID}${id}`)
        }
    }, [fetchByField, id, dispatch])
    const handleDataToServer = (data, setErrors) => {
        if (isPendingSave !== true && isPendingEdit !== true) {
            if (id !== undefined && validation.isNumber(id)) {
                fetchEdit(`${createActionURL(url).instant()}${REQUEST_PARAM_ID}${id}`, data, setErrors)
            } else {
                fetchSave(createActionURL(url).instant(), data, setErrors)
            }
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
        <div className={isPendingInitialEdit && LOADING_CONTENT_FORM}>
            <div className="main-content-form-promotion main-content-form" >
                <div className="card card-form-promotion">
                    <div className="card-header">
                        <div className="card-header-title">
                            Thông tin mã giảm giá
                        </div>
                    </div>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            name: initialEdit?.name ?? initialForm.name,
                            code: initialEdit?.code ?? initialForm.code,
                            description: initialEdit?.description ?? initialForm.description,
                            discountRate: initialEdit?.discountRate ?? initialForm.discountRate,
                            startDate: initialEdit?.startDate ? new Date(initialEdit.startDate) : new Date(initialForm.startDate),
                            endDate: initialEdit?.endDate ? new Date(initialEdit.endDate) : null,
                        }}
                        validationSchema={yup.object({
                            name: yup.string().required("Chưa nhập tên :")
                                .min(3, THIS_FILED_ENTER_SMALL)
                                .max(100, THIS_FILED_ENTER_LARGE)
                                .matches(regex.string, THIS_FIELD_VALUE_NOT_FORMAT),
                            code: yup.string().required("Chưa nhập mã code :")
                                .min(6, THIS_FILED_ENTER_SMALL)
                                .max(15, THIS_FILED_ENTER_LARGE)
                                .matches(regex.number, "Nhập mã code không phù hợp: ex :012345678"),
                            description: yup.string()
                                .nullable()
                                .matches(regex.string, THIS_FIELD_VALUE_NOT_FORMAT)
                                .min(3, THIS_FILED_ENTER_SMALL)
                                .max(300, THIS_FILED_ENTER_LARGE),
                            discountRate: yup.number()
                                .typeError(THIS_FIELD_VALUE_NOT_FORMAT)
                                .nullable()
                                .min(1, 'Gía trị nhỏ nhất 1')
                                .max(100, 'Gía trị lớn nhất 100'),
                            startDate: yup.date()
                                .required(THIS_FIELD_CANNOT_EMPTY_2)
                                .nonNullable()
                                .test("startDateGreaterDateCurrent", THIS_FIELD_DATE_GREATER_EQUAL_DATE_CURRENT, validation.checkDateGraterThenDateCurrent),
                            endDate: yup.date()
                                .nullable()  // Cho phép để trống
                                .notRequired()
                                .min(yup.ref('startDate'), "Ngày kết thúc phải lớn hơn ngày bắt đầu ."),
                        })}
                        onSubmit={(data, { setErrors }) =>
                            handleDataToServer(data, setErrors)
                        }
                    >
                        <Form>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 col-md-4">
                                        <div className="card-body-label">
                                            <label htmlFor="name">Tên</label>
                                        </div>
                                        <div className="card-body-input">
                                            <Field name="name" className="form-control" autoComplete="off" type="text" />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='name' component='div' />
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div className="card-body-label">
                                            <label htmlFor="code">Mã code</label>
                                        </div>
                                        <div className="card-body-input">
                                            <Field name="code" className="form-control" onKeyDown={(event) => validation.isNumberKey(event)} autoComplete="off" type="number" />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='code' component='div' />
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div className="card-body-label">
                                            <label htmlFor="discountRate">Phần trăm giảm giá</label>
                                        </div>
                                        <div className="card-body-input">
                                            <Field name="discountRate" type={TYPE_INPUT_NUMBER} onKeyDown={(event) => validation.isNumberKey(event)} className="form-control" autoComplete="off" adornment={PERCENT_STRING} component={InputAdornmentField} />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='discountRate' component='div' />
                                    </div>
                                    <div className="col-12 col-md-4  mt-2">
                                        <div className="card-body-label">
                                            <label htmlFor="description">Mô tả</label>
                                        </div>
                                        <div className="card-body-input">
                                            <Field name="description" className="form-control" as="textarea" />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='description' component='div' />
                                    </div>
                                    <div className="col-12 col-md-4  mt-2">
                                        <div className="card-body-label">
                                            <label htmlFor="startDate">Ngày bắt đầu</label>
                                        </div>
                                        <div className="card-body-input">
                                            <Field name="startDate" component={DatePickerField} className="form-control" type="date" />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='startDate' component='div' />
                                    </div>
                                    <div className="col-12 col-md-4  mt-2">
                                        <div className="card-body-label">
                                            <label htmlFor="endDate">Ngày kết thúc</label>
                                        </div>
                                        <div className="card-body-input">
                                            <Field name="endDate" component={DatePickerField} className="form-control" type="date" />
                                            <ErrorMessage className="form-text form-error" name='endDate' component='div' />
                                        </div>
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