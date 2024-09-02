import { Formik, Form, ErrorMessage, Field } from "formik";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import UploadImg from "../../../composite/formik/UploadImg";
import { InputPassword } from "../../../composite/formik/InputPassword";
import { regex, validation } from "../../../../utils/validation";
import { SelectField } from "../../../composite/formik/SelectedField";
import { useFetchGet } from "../../../../hook/fetch/authenticated/useFetchGet";
import { convertToJsonFile, createActionURL } from "../../../../utils/commonUtils";
import { LOADING_CONTENT_FORM, PLACE_HOLDER_CURRENT_RESIDENCE, PLACE_HOLDER_EMAIL, REQUEST_PARAM_ID, THIS_FIELD_BIRTH_OF_DATE_GREATER_THAN_18, THIS_FIELD_CANNOT_EMPTY, THIS_FIELD_CONFIRM_NOT_MATCH, THIS_FIELD_VALUE_NOT_FORMAT, THIS_FILE_NOT_FORMAT, THIS_FILE_SIZE_TOO_LARGE, THIS_FILED_ENTER_LARGE, THIS_FILED_ENTER_SMALL, THIS_FILED_SELECT_ITEM_CANNOT_EMPTY, THIS_UPLOAD_FILE_ITEM_CANNOT_EMPTY } from "../../../../utils/commonConstants";
import * as yup from "yup";
import { onClickSaveAction } from "../../../../redux/slice/admin/action/actionAdmin";
import { useFetchByFiled } from "../../../../hook/fetch/authenticated/useFetchByFiled";
import { useFetchPost } from "../../../../hook/fetch/authenticated/useFetchPost";
import { DatePickerField } from "../../../composite/formik/DatePickerField";
import { useFetchPatch } from "../../../../hook/fetch/authenticated/useFetchPatch";
import CustomField from "../../../composite/formik/CustomField";
import { toastSuccess } from "../../../../config/toast";
function ContentForm(props) {
    const dispatch = useDispatch();
    const { initialForm, url } = props;
    const { id } = useParams();
    const { close } = useSelector((state) => state.actionAdmin);
    const buttonRef = useRef(null);
    const navigate = useNavigate();
    const [codeProvince, setCodeProvince] = useState(initialForm.provinces)
    const [codeDistrict, setCodeDistrict] = useState("")
    
    const { fetchByField, data: initialEdit, isPending: isPendingInitialEdit, error: errorInitialEdit, code:codeInitialEdit } = useFetchByFiled();
    const { fetchGet: fetchProvinces, data: provinces, isPending: isPendingProvinces, code: codeProvinces } = useFetchGet();
    const { fetchGet: fetchDistricts, data: districts, isPending: isPendingDistricts } = useFetchGet();
    const { fetchGet: fetchWards, data: wards, isPending: isPendingWards } = useFetchGet();
    const { fetchGet: fetchStatusAccounts, data: statusAccounts, isPending: isPendingStatusAccounts } = useFetchGet();
    const { fetchGet: fetchRoles, data: isRoles, isPending: isPendingRoles } = useFetchGet();
    const { fetchPost, code: codeSave, isPending: isPendingSave, message: messageSave } = useFetchPost();
    const { fetchPatch, code: codeEdit, isPending: isPendingEdit, message: messageEdit } = useFetchPatch();
    useEffect(()=>{
        if(initialEdit && initialEdit?.districts !==null){
            setCodeDistrict(initialEdit?.districts)
        }
    },[initialEdit])
    useEffect(() => {
        dispatch(onClickSaveAction({ buttonSave: buttonRef.current }))
        if (id !== undefined && validation.isNumber(id)) {
            fetchByField(`${createActionURL(url).requestParam([{ key: "id", value: id }])}`)
        }
    }, [fetchByField, id, dispatch])
    useEffect(() => {
        fetchProvinces(createActionURL("address/provinces").instant())
    }, [fetchProvinces])
    useEffect(() => {
        if (codeProvince !== null && validation.isNotEmpty(codeProvince)) {
            fetchDistricts(createActionURL("address/district").requestParam([{ key: "code", value: codeProvince }]))
        }
    }, [codeProvince, fetchDistricts, setCodeDistrict])
    useEffect(() => {
        if (codeDistrict !== null && validation.isNotEmpty(codeDistrict)) {
            fetchWards(createActionURL("address/ward").requestParam([{ key: "code", value: codeDistrict }]))
        }
    }, [codeDistrict, fetchWards])
    useEffect(() => {
        const fetchAllData = async () => {
            await Promise.all([
                fetchStatusAccounts(createActionURL("profile/account-status").instant()),
                fetchRoles(createActionURL("role/employee").instant())
            ]);
        };
        fetchAllData();
    }, [fetchStatusAccounts])
    useEffect(() => {
        if (codeSave === 200) {
            if (close) {
                navigate(`/admin/${url}`);
                toastSuccess(messageSave);
            }
        }
    }, [codeSave, close, navigate, url]);
    const hanldeResetFieldDistrict = useCallback((province, setFieldValue) => {
        setCodeProvince(province);
        setFieldValue('districts', '');
        setFieldValue('wards', '')
    }, []);
    
    const handleDataSentToServer = useCallback((data, setErrors) => {
        const dataToServer = { ...data };
        if (isPendingSave !== true) {
            const multiPart = new FormData();
            const avatarFile = dataToServer?.avatar;
            if (validation.checkArrayNotEmpty(avatarFile) ) {
                if (avatarFile[0] instanceof File || avatarFile[0] instanceof Blob) {
                    multiPart.append("avatar",avatarFile[0]);
                    dataToServer.avatar=undefined;
                }
            }
            multiPart.append('employeeDto', convertToJsonFile(dataToServer));
            if (isPendingSave !== true && isPendingEdit !== true) {
                if (id !== undefined && validation.isNumber(id)) {
                    fetchPatch(`${createActionURL(url).requestParam([{ key: "id", value: id }])}`, multiPart, setErrors)
                } else {
                    fetchPost(createActionURL(url).instant(), multiPart, setErrors);
                }
            }
            
        }
    },[fetchPatch,fetchPost,id])
    return (
        <div className={isPendingStatusAccounts === true || isPendingRoles == true ? LOADING_CONTENT_FORM : ''}>
            <div className="main-content-form-staff main-content-form">
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        avatar: initialEdit?.avatar ?? initialForm.avatar,
                        name: initialEdit?.name ?? initialForm.name,
                        phone: initialEdit?.phone ?? initialForm.phone,
                        nameLogin: initialEdit?.nameLogin ?? initialForm.nameLogin,
                        email: initialEdit?.email ?? initialForm.email,
                        password: initialEdit?.password ?? initialForm.password,
                        confirmPassword: initialEdit?.password ?? initialForm.confirmPassword,
                        idIdentification: initialEdit?.idIdentification ?? initialForm.idIdentification,
                        birthOfDate: initialEdit?.startDate ?? initialForm.birthOfDate,
                        address: initialEdit?.address ?? initialForm.address,
                        provinces:  initialEdit?.provinces ?? codeProvinces === 200 ? initialForm.provinces : '',
                        districts: initialEdit?.districts ?? initialForm.districts,
                        wards: validation.checkArrayNotEmpty(wards) ? initialEdit?.wards:"" ?? initialForm.wards,
                        accountStatus: initialEdit?.accountStatus ?? initialForm.accountStatus,
                        roles: initialEdit?.roles ?? initialForm.roles,
                    }}
                    // validationSchema={yup.object().shape({
                    //     multipart: yup.mixed()
                    //         .nullable()
                    //         .test('fileSize', THIS_FILE_SIZE_TOO_LARGE, validation.checkFileSize)
                    //         .test('fileType', THIS_FILE_NOT_FORMAT, validation.checkFileTypeImage),
                    //     name: yup.string().trim().required(THIS_FIELD_CANNOT_EMPTY)
                    //         .matches(regex.fullName, THIS_FIELD_VALUE_NOT_FORMAT)
                    //         .max(100, THIS_FILED_ENTER_LARGE)
                    //         .min(4, THIS_FILED_ENTER_SMALL),
                    //     nameLogin: yup.string().trim().required(THIS_FIELD_CANNOT_EMPTY)
                    //         .matches(regex.characterNormal, THIS_FIELD_VALUE_NOT_FORMAT)
                    //         .max(70, THIS_FILED_ENTER_LARGE)
                    //         .min(6, THIS_FILED_ENTER_SMALL),
                    //     roles: yup.mixed()
                    //         .required(THIS_FILED_SELECT_ITEM_CANNOT_EMPTY)
                    //         .test('isNotEmptyArray', THIS_FILED_SELECT_ITEM_CANNOT_EMPTY, validation.checkArrayNotEmpty),
                    //     accountStatus: yup.string().required(THIS_FILED_SELECT_ITEM_CANNOT_EMPTY),
                    //     password: yup.string().trim().required(THIS_FIELD_CANNOT_EMPTY)
                    //         .max(70, THIS_FILED_ENTER_LARGE)
                    //         .min(6, THIS_FILED_ENTER_SMALL),
                    //     confirmPassword: yup.string().trim()
                    //         .required(THIS_FIELD_CANNOT_EMPTY)
                    //         .oneOf([yup.ref('password')], THIS_FIELD_CONFIRM_NOT_MATCH),
                    //     email: yup.string().trim()
                    //         .nullable()
                    //         .max(70, THIS_FILED_ENTER_LARGE)
                    //         .min(6, THIS_FILED_ENTER_SMALL)
                    //         .matches(regex.email, THIS_FIELD_VALUE_NOT_FORMAT),
                    //     phone: yup.string().trim()
                    //         .nullable()
                    //         .max(70, THIS_FILED_ENTER_LARGE)
                    //         .min(6, THIS_FILED_ENTER_SMALL)
                    //         .matches(regex.phone, THIS_FIELD_VALUE_NOT_FORMAT),
                    //     birthOfDate: yup.date()
                    //         .nullable()
                    //         .test("birthOfDate",THIS_FIELD_BIRTH_OF_DATE_GREATER_THAN_18,validation.checkBirthOfDate),
                    //     idCard: yup.string().trim()
                    //         .nullable()
                    //         .matches(regex.cccd, THIS_FIELD_VALUE_NOT_FORMAT),
                    //     address: yup.string().trim()
                    //         .nullable()
                    //         .matches(regex.address, THIS_FIELD_VALUE_NOT_FORMAT)
                    //         .max(150, THIS_FILED_ENTER_LARGE)
                    //         .min(10, THIS_FILED_ENTER_SMALL),
                    //     provinces: yup.string().trim()
                    //         .nullable(),
                    //     districts: yup.string()
                    //         .when('provinces', {
                    //             is: (provinces) => provinces && provinces.length > 0,
                    //             then: () => yup.string().required(THIS_FIELD_CANNOT_EMPTY),
                    //             otherwise: () => yup.string().nullable(),
                    //         }),
                    //     wards: yup.string()
                    //         .nullable()
                    //         .when('districts', {
                    //             is: (districts) => districts && districts.length > 0,
                    //             then: () => yup.string().required(THIS_FIELD_CANNOT_EMPTY),
                    //             otherwise: () => yup.string().nullable(),
                    //         }),

                    // })}
                    onSubmit={(data, { setErrors }) =>
                        handleDataSentToServer(data, setErrors)
                    }
                >
                    <Form>
                        <div className="card card-form-product ">
                            <div className="card-header">
                                <div className="card-header-title">
                                    Thông tin người dùng
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 ">
                                        <UploadImg name="avatar" multi={false} />
                                        <ErrorMessage className="form-text form-error" name='avatar' component='div' />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6 col-md-4 ">
                                        <div className="card-body-label">
                                            <label htmlFor="name">Họ và tên<span className="required">*</span> </label>
                                        </div>
                                        <div className="card-body-input"><CustomField name="name" autoComplete="off" className="form-control" placeholder="Nguyen Van A" type="text" />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='name' component='div' />
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 ">
                                        <div className="card-body-label">
                                            <label htmlFor="nameLogin">Tên đăng nhập<span className="required">*</span></label>
                                        </div>
                                        <div className="card-body-input">
                                            <CustomField name="nameLogin" autoComplete="off" placeholder="nguyenvana" className="form-control" type="text" />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='nameLogin' component='div' />
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 ">
                                        <div className="card-body-label">
                                            <label htmlFor="phone">Số điện thoại</label>
                                        </div>
                                        <div className="card-body-input">
                                            <CustomField name="phone" className="form-control" onKeyDown={(event) => validation.isNumberKey(event)} autoComplete="off" type="number" />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='phone' component='div' />
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 ">
                                        <div className="card-body-label">
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="card-body-input">
                                            <CustomField name="email" autoComplete="off" placeholder={PLACE_HOLDER_EMAIL} className="form-control" type="text" />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='email' component='div' />
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4">
                                        <div className="card-body-label">
                                            <label htmlFor="provinces">Trạng thái tài khoản<span className="required">*</span></label>
                                        </div>
                                        <div className="card-body-input">
                                            <SelectField
                                                name="accountStatus"
                                                className="form-control"
                                                options={statusAccounts}
                                                attribute='id'
                                                // errors={errors}
                                                multi={false}
                                                nameDefault="- Chọn giá trị -"
                                            />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='accountStatus' component='div' />
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4">
                                        <div className="card-body-label">
                                            <label htmlFor="roles">Vai trò<span className="required">*</span></label>
                                        </div>
                                        <div className="card-body-input">
                                            <SelectField
                                                name="roles"
                                                className="form-control"
                                                options={isRoles}
                                                attribute='id'
                                                // errors={errors}
                                                multi={true}
                                                nameDefault="- Chọn giá trị -"
                                            />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='roles' component='div' />
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 ">
                                        <div className="card-body-label">
                                            <label htmlFor="idIdentification">Căn cước công dân</label>
                                        </div>
                                        <div className="card-body-input">
                                            <CustomField name="idIdentification" className="form-control" onKeyDown={(event) => validation.isNumberKey(event)} autoComplete="off" type="number" />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='idIdentification' component='div' />
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 ">
                                        <div className="card-body-label">
                                            <label htmlFor="birthOfDate">Ngày Sinh</label>
                                        </div>
                                        <div className="card-body-input">
                                            <Field name="birthOfDate" title="Ngày sinh" component={DatePickerField} className="form-control" type="date" />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='birthOfDate' component='div' />
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-6 col-md-4 ">
                                            <div className="card-body-label">
                                                <label htmlFor="password">Mật khẩu<span className="required">*</span></label>
                                            </div>
                                            <div className="card-body-input ">
                                                <InputPassword
                                                    name="password"
                                                    className="form-control"
                                                />
                                            </div>
                                            <ErrorMessage className="form-text form-error" name='password' component='div' />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-6 col-md-4">
                                            <div className="card-body-label">
                                                <label htmlFor="confirmPassword">Xác nhận mật khẩu<span className="required">*</span></label>
                                            </div>
                                            <div className="card-body-input ">
                                                <InputPassword
                                                    name="confirmPassword"
                                                    className="form-control"
                                                />
                                            </div>
                                            <ErrorMessage className="form-text form-error" name='confirmPassword' component='div' />
                                        </div>
                                    </div>


                                    <hr />
                                    <div className="col-12  ">
                                        <div className="card-body-label">
                                            <label htmlFor="address">Nơi ở hiện tại</label>
                                        </div>
                                        <div className="card-body-input"><CustomField name="address" autoComplete="off" placeholder={PLACE_HOLDER_CURRENT_RESIDENCE} className="form-control" type="text" />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='address' component='div' />
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4">
                                        <div className="card-body-label">
                                            <label htmlFor="provinces">Tỉnh/Thành phố</label>
                                        </div>
                                        <div className="card-body-input">
                                            <SelectField
                                                name="provinces"
                                                className="form-control"
                                                options={provinces}
                                                attribute='code'
                                                // errors={errors}
                                                processField={hanldeResetFieldDistrict}
                                                multi={false}
                                                nameDefault="- Chọn thành phố -"
                                            />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='provinces' component='div' />
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4">
                                        <div className="card-body-label">
                                            <label htmlFor="districts">Quận/Huyện</label>
                                        </div>
                                        <div className="card-body-input">
                                            <SelectField
                                                name="districts"
                                                className="form-control"
                                                attribute='code'
                                                processField={setCodeDistrict}
                                                options={districts}
                                                multiple={false}
                                                nameDefault="- Chọn giá trị -"
                                            />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='districts' component='div' />
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4">
                                        <div className="card-body-label">
                                            <label htmlFor="wards">Phường/Xã</label>
                                        </div>
                                        <div className="card-body-input">
                                            <SelectField
                                                name="wards"
                                                className="form-control"
                                                attribute='code'
                                                options={wards}
                                                multiple={false}
                                                nameDefault="- Chọn giá trị -"
                                            />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='wards' component='div' />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <button type="submit" style={{ display: 'none' }} ref={buttonRef}></button>
                    </Form>
                </Formik>
            </div >
        </div >
    )
}
export default memo(ContentForm)    