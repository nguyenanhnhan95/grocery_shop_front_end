import { memo, useCallback, useEffect, useRef } from "react"
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchByFiled } from "../../../../hook/fetch/authenticated/useFetchByFiled";
import { useFetchPost } from "../../../../hook/fetch/authenticated/useFetchPost";
import { useFetchPatch } from "../../../../hook/fetch/authenticated/useFetchPatch";
import { onClickSaveAction } from "../../../../redux/slice/admin/action/actionAdmin";
import { validation } from "../../../../utils/validation";
import { createActionURL } from "../../../../utils/commonUtils";
import { LOADING_CONTENT_FORM, REQUEST_PARAM_ID, THIS_FIELD_CANNOT_EMPTY, THIS_FIELD_VALUE_NOT_FORMAT, THIS_FILE_ENTER_FAIL, THIS_FILED_ENTER_LARGE, THIS_FILED_ENTER_SMALL, THIS_FILED_SELECT_ITEM_CANNOT_EMPTY } from "../../../../utils/commonConstants";
import { Form, ErrorMessage, Field, Formik } from "formik";
import * as yup from "yup";
import "../../../../assets/css/admin/system/role/contentForm.css"
import { useFetchGet } from "../../../../hook/fetch/authenticated/useFetchGet";

import { CheckBoxPermisson } from "./CheckBoxPermisson";
import CustomField from "../../../composite/formik/CustomField";
import SelectField from "../../../composite/formik/SelectField";
import { useFetchPut } from "../../../../hook/fetch/authenticated/useFetchPut";
function ContentForm(props) {
    const dispatch = useDispatch();
    const { initialForm, url } = props;
    const { id } = useParams();
    const { close } = useSelector((state) => state.actionAdmin);
    const navigate = useNavigate();
    const buttonRef = useRef(null);
    const { fetchByField, data: initialEdit, isPending: isPendingInitialEdit, error: errorInitialEdit } = useFetchByFiled();
    const { fetchPost, code: codeSave, isPending: isPendingSave } = useFetchPost();
    const { fetchPut, code: codeEdit, isPending: isPendingEdit } = useFetchPut();
    const { fetchGet: fetchPermission, data: listPermissions, isPending: isPendingListPermissions } = useFetchGet();
    const { fetchGet: fetchRoleAlias, data: listRoleAlias, isPending: isPendingRoleAlias } = useFetchGet();
    useEffect(() => {
        const fetchAllData = async () => {
            await Promise.all([
                fetchPermission(createActionURL("role/permissions").instant()),
                fetchRoleAlias(createActionURL("role/alias").instant()),
            ]);
        };
        fetchAllData();
    }, [fetchPermission, fetchRoleAlias])
    useEffect(() => {
        dispatch(onClickSaveAction({ buttonSave: buttonRef.current }))
        if (id !== undefined && validation.isNumber(id)) {
            fetchByField(`${createActionURL(url).instant()}${REQUEST_PARAM_ID}${id}`)
        }
    }, [fetchByField, id, dispatch])
    const handleDataToServer =useCallback( (data, setErrors) => {
        if (isPendingSave !== true && isPendingEdit !== true) {
            if (id !== undefined && validation.isNumber(id)) {
                fetchPut(`${createActionURL(url).instant()}${REQUEST_PARAM_ID}${id}`, data, setErrors)
            } else {
                fetchPost(createActionURL(url).instant(), data, setErrors)
            }
        }
    },[fetchPost,fetchPut,url,id])
    useEffect(() => {
        if (codeSave === 200 || codeEdit === 200) {
            if (close) {
                navigate(`/admin/${url}`);
            }
        }
    }, [codeSave, codeEdit, close, navigate, url]);
    const handleSuitablePermission = (permisson) => {
        if (validation.isArrayEmpty(permisson)) {
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
    useEffect(() => {
        fetchPermission(createActionURL("role/permissions").instant())
    }, [fetchPermission])
    return (
        <div className={isPendingInitialEdit || isPendingListPermissions || isPendingRoleAlias ? LOADING_CONTENT_FORM : ''}>
            <div className="main-content-form-role main-content-form " >
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        name: initialEdit?.name ?? initialForm.name,
                        alias: initialEdit?.alias ?? initialForm.alias,
                        description: initialEdit?.description ?? initialForm.description,
                        permissions: initialEdit?.permissions ?? initialForm.permissions,
                    }}
                    validationSchema={yup.object().shape({
                        name: yup.string().trim()
                            .required(THIS_FIELD_CANNOT_EMPTY)
                            .max(50, THIS_FILED_ENTER_LARGE)
                            .min(4, THIS_FILED_ENTER_SMALL),
                        alias: yup.string().required(THIS_FILED_SELECT_ITEM_CANNOT_EMPTY)
                            .test('existRoleAlias', THIS_FIELD_VALUE_NOT_FORMAT, (value) => {
                                if (!validation.checkArrayNotEmpty(listRoleAlias)) return false
                                return listRoleAlias.some(alias => value === alias?.id)
                            }),
                        description: yup.string().trim()
                            .nullable()
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
                                        <div className="col-6">
                                            <div className="card-body-label">
                                                <label htmlFor="name">Tên<span className="required">*</span></label>
                                            </div>
                                            <div className="card-body-input">
                                                <CustomField name="name" className="form-control" type="text" autoComplete="off" />
                                            </div>
                                            <ErrorMessage className="form-text form-error" name='name' component='div' />
                                        </div>
                                        <div className="col-6">
                                            <div className="card-body-label">
                                                <label htmlFor="alias">Vai trò<span className="required">*</span></label>
                                            </div>
                                            <div className="card-body-input">
                                                <SelectField
                                                    name="alias"
                                                    className="form-control"
                                                    options={listRoleAlias}
                                                    attribute='id'
                                                    // errors={errors}
                                                    multi={false}
                                                    nameDefault="- Chọn vai trò -"
                                                />

                                            </div>
                                            <ErrorMessage className="form-text form-error" name='alias' component='div' />
                                        </div>
                                        <div className="col-12 ">
                                            <div className="card-body-label">
                                                <label htmlFor="description">Mô tả</label>
                                            </div>
                                            <div className="card-body-input">
                                                <CustomField name="description" className="form-control" as="textarea" />
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