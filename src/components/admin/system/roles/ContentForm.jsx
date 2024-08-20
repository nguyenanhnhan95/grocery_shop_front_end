import { memo, useEffect, useRef } from "react"
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchByFiled } from "../../../../hook/fetch/authenticated/useFetchByFiled";
import { useFetchSave } from "../../../../hook/fetch/authenticated/useFetchSave";
import { useFetchEdit } from "../../../../hook/fetch/authenticated/useFetchEdit";
import { onClickSaveAction } from "../../../../redux/slice/admin/action/actionAdmin";
import { validation } from "../../../../utils/validation";
import { createActionURL } from "../../../../utils/commonUtils";
import { LOADING_CONTENT_FORM, REQUEST_PARAM_ID, THIS_FIELD_CANNOT_EMPTY, THIS_FILE_ENTER_FAIL, THIS_FILED_ENTER_LARGE, THIS_FILED_ENTER_SMALL } from "../../../../utils/commonConstants";
import { Form, ErrorMessage, Field, Formik } from "formik";
import * as yup from "yup";
import "../../../../assets/css/admin/system/role/contentForm.css"
import { useFetchData } from "../../../../hook/fetch/authenticated/useFetchData";

import { CheckBoxPermisson } from "./CheckBoxPermisson";
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
    const { data: listPermissions, isPending: isPendingListPermissions } = useFetchData(createActionURL("role/permissions").instant());
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
    const handleSuitablePermission = (permisson) => {
        if(validation.isArrayEmpty(permisson)){
            return true;
        }
        if (Array.isArray(permisson) && Array.isArray(listPermissions)) {
            return listPermissions.some(each =>
                each.scopes.some(scope =>
                    permisson.includes(scope?.id)
                )
            );
        }
    }
    return (
        <div className={isPendingInitialEdit || isPendingListPermissions ? LOADING_CONTENT_FORM : ''}>
            <div className="main-content-form-role main-content-form " >
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        name: initialEdit?.name ?? initialForm.name,
                        description: initialEdit?.description ?? initialForm.description,
                        permissions: initialEdit?.permissions ?? initialForm.permissions,
                    }}
                    validationSchema={yup.object().shape({
                        name: yup.string().trim()
                            .required(THIS_FIELD_CANNOT_EMPTY)
                            .max(50, THIS_FILED_ENTER_LARGE)
                            .min(4, THIS_FILED_ENTER_SMALL),
                            description: yup.string().trim()
                            .max(250, THIS_FILED_ENTER_LARGE),
                        permissions: yup.mixed()
                            .test('isSuitable', THIS_FILE_ENTER_FAIL, handleSuitablePermission)
                    })}
                    onSubmit={(data, { setErrors }) =>
                        handleDataToServer(data, setErrors)
                    }
                >
                    <Form className="row">
                        <div className="col-12 col-md-7">
                            <div className="card card-update-role ">
                                <div className="card-header">
                                    <div className="card-header-title">
                                        Cập nhập vai trò
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card-body-label">
                                                <label htmlFor="name">Tên</label>
                                            </div>
                                            <div className="card-body-input">
                                                <Field name="name" className="form-control" type="text" autoComplete="off" />
                                            </div>
                                            <ErrorMessage className="form-text form-error" name='name' component='div' />
                                        </div>
                                        <div className="col-12 ">
                                            <div className="card-body-label">
                                                <label htmlFor="description">Mô tả</label>
                                            </div>
                                            <div className="card-body-input">
                                                <Field name="description" className="form-control" as="textarea" />
                                            </div>
                                            <ErrorMessage className="form-text form-error" name='description' component='div' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-5">
                            <div className="card card card-update-permission">
                                <div className="card-header">
                                    <div className="card-header-title">
                                        Phân quyền
                                    </div>
                                </div>
                                <div className="card-body">
                                    <ErrorMessage className="form-text form-error" name='permissions' component='div' />
                                    <table className="table table-hover">
                                        <thead className="table-thead sticky-header">
                                            <tr >
                                                <th scope="col">Quyền</th>
                                                <th scope="col permission-scope-check">Chọn</th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {
                                                listPermissions && listPermissions.map((permissons, index) => (
                                                    <React.Fragment key={index} >
                                                        <tr className="name-permisson" >
                                                            <td >
                                                                {permissons.name}
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                        {
                                                            permissons.scopes && permissons.scopes.map((scope, zIndex) => (
                                                                <tr key={zIndex}>
                                                                    <td className="permission-scope">{scope.name}</td>
                                                                    <td className="permission-scope permission-scope-check">
                                                                        <Field
                                                                            name="permissions"
                                                                            permisson={scope?.id}
                                                                            options={listPermissions}
                                                                            className="form-check-input"
                                                                            type="checkbox"
                                                                            component={CheckBoxPermisson}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </React.Fragment>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                        <button type="submit" style={{ display: 'none' }} ref={buttonRef}></button>
                    </Form>
                </Formik>
            </div>
        </div >
    )
}
export default memo(ContentForm)