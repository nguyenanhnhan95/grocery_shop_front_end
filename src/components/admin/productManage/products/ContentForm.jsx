import { ErrorMessage, Field, Form, Formik, FieldArray } from "formik";
import "../../../../assets/css/admin/productManage/product/contentForm.css"
import * as yup from "yup";
import UploadImage from "./../../../composite/formik/UploadImg"
import "../../../../assets/css/admin/skeletonLoading/contentForm.css"
import { createActionURL, createHeader } from "../../../../utils/commonUtils";
import { CHILDREN, LOADING_CONTENT_FORM, PARENT, REQUEST_PARAM_ID, THIS_FIELD_CANNOT_EMPTY, THIS_FIELD_CODE_NUMBER_NOT_FORMAT, THIS_FILE_NOT_FORMAT, THIS_FILE_SIZE_TOO_LARGE, THIS_FILED_ENTER_LARGE, THIS_FILED_ENTER_SMALL, THIS_FILED_GREATER_THAN_THOUSAND, THIS_FILED_MONEY_TOO_LARGE, THIS_FILED_MUST_POSITIVE, THIS_FILED_SELECT_ITEM_CANNOT_EMPTY, THIS_UPLOAD_FILE_ITEM_CANNOT_EMPTY, TYPE_INPUT_TEXT, UNDER_STROKE, VND } from "../../../../utils/commonConstants";
import { CKEditorField } from "../../../composite/formik/CKEditorField";
import { SelectField } from "../../../composite/formik/SelectedField";
import { regex, validation } from "../../../../utils/validation";
import { useFetchData } from "../../../../hook/fetch/authenticated/useFetchData";
import "../../../../assets/css/admin/skeletonLoading/contentForm.css"
import { NumberFormatField } from "../../../composite/formik/NumberFormatField";
import { InputAdornment } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { memo, useCallback, useEffect, useRef } from "react";
import { onClickSaveAction } from "../../../../redux/slice/admin/action/actionAdmin";
import { useFetchByFiled } from "../../../../hook/fetch/authenticated/useFetchByFiled";
import { useFetchSave } from "../../../../hook/fetch/authenticated/useFetchSave";

function ContentForm(props) {
    const dispatch = useDispatch();
    const { initialForm, url } = props;
    const { id } = useParams();
    const { close } = useSelector((state) => state.actionAdmin);
    const navigate = useNavigate();
    const buttonRef = useRef(null);
    const { fetchByField, data: initialEdit, isPending: isPendingInitialEdit, error: errorInitialEdit } = useFetchByFiled();
    const { fetchSave, code: codeSave, isPending: isPendingSave } = useFetchSave();
    const { data: variations, isPending: isPendingVariations } = useFetchData(createActionURL("products-variation").instant());
    const { data: variationOptions, isPending: isPendingVariationOptions } = useFetchData(createActionURL("products-variation-option").instant());
    const { data: productCategories, isPending: isPendingProductCategories } = useFetchData(createActionURL("product-category/children").instant());
    const { data: promotions, isPending: isPendingPromotions } = useFetchData(createActionURL("shop-promotion").instant());
    useEffect(() => {
        dispatch(onClickSaveAction({ buttonSave: buttonRef.current }))
        if (id !== undefined && validation.isNumber(id)) {
            fetchByField(`${createActionURL(url).instant()}${REQUEST_PARAM_ID}${id}`)
        }
    }, [fetchByField, id, dispatch])
    const handleErrorsMessage = useCallback((errors, setErrors) => {
        try {
            const message = Object.keys(errors).reduce((acc, key) => {
                console.log(acc)
                console.log(key)
                if (key.startsWith("productItem[")) {
                    const index = parseInt(key.charAt(12), 10);
                    if (!isNaN(index)) {
                        const name = key.substring(15);
                        const errorMessage = { [name]: errors[key] }; // Lấy giá trị từ errors
                        acc.productItem[index] = errorMessage; // Gán vào message
                    }
                } else {
                    return { ...acc, [key]: errors[key] }
                }
                return acc;
            }, { productItem: [] }); // Khởi tạo message với productItem
            console.log(message)
            setErrors(message); //
        } catch (error) {
            console.error(error);
        }
    }, []);
    const handleDataSentToServer = (data, setErrors) => {
        console.log(data)
        const dataToServer = structuredClone(data);
        console.log(dataToServer)
        if (isPendingSave !== true) {
            const multiPart = new FormData();
            if (Array.isArray(data.multipart) && data.multipart.length > 0) {
                console.log("ádasd")
                data.multipart.forEach(image => {
                    console.log("ádasd")
                    multiPart.append("product", image);
                });
            } else {
                multiPart.append("product", null);
            }

            data.productItem.forEach((productItem, productIndex) => {
                if (Array.isArray(productItem.multipart) && productItem.multipart.length > 0) {
                    productItem.multipart.forEach((image, imageIndex) => {
                        multiPart.append(`productItem`, image);
                    });
                } else {
                    multiPart.append(`productItem`, null);
                }

            });
            console.log(data)
            console.log(dataToServer)
            delete dataToServer.multipart;
            dataToServer.productItem.forEach((productItem, productIndex) => {
                delete productItem.multipart
            });
            const json = JSON.stringify(dataToServer);
            const blob = new Blob([json], {
                type: 'application/json'
            });
            // multiPart.append("data", blob);
            multiPart.append('productDto', blob)
            console.log(dataToServer)
            fetchSave(createActionURL(url).instant(), multiPart, setErrors, handleErrorsMessage);
        }
    }

    return (
        <div className={isPendingProductCategories || isPendingPromotions || isPendingVariationOptions || isPendingVariations || isPendingInitialEdit ? LOADING_CONTENT_FORM : ''}>
            <div className="main-content-form-product main-content-form">
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        multipart: [],
                        name: '',
                        brand: '',
                        idProductCategory: '',
                        idVariation: '',
                        description: '',
                        productItem: [{
                            multipart: [],
                            price: undefined,
                            qtyInStock: undefined,
                            sky: "",
                            idPromotions: [],
                            idVariationOptions: []
                        }]
                    }}
                    validationSchema={yup.object().shape({
                        multipart: yup.mixed().required(THIS_UPLOAD_FILE_ITEM_CANNOT_EMPTY)
                            .test('isNotEmptyArray', THIS_UPLOAD_FILE_ITEM_CANNOT_EMPTY, validation.checkArrayEmpty)
                            .test('fileSize', THIS_FILE_SIZE_TOO_LARGE, validation.checkFileSize)
                            .test('fileType', THIS_FILE_NOT_FORMAT, validation.checkFileTypeImage),
                        name: yup.string().required(THIS_FIELD_CANNOT_EMPTY)
                            .max(100, THIS_FILED_ENTER_LARGE)
                            .min(4, THIS_FILED_ENTER_SMALL),
                        brand: yup.string().required(THIS_FIELD_CANNOT_EMPTY)
                            .max(100, THIS_FILED_ENTER_LARGE)
                            .min(4, THIS_FILED_ENTER_SMALL),
                        idProductCategory: yup.string().required(THIS_FILED_SELECT_ITEM_CANNOT_EMPTY),
                        idVariation: yup.string().required(THIS_FILED_SELECT_ITEM_CANNOT_EMPTY),
                        productItem: yup.array().of(
                            yup.object().shape({
                                multipart: yup.mixed().required(THIS_UPLOAD_FILE_ITEM_CANNOT_EMPTY)
                                    .test('isNotEmptyArray', THIS_UPLOAD_FILE_ITEM_CANNOT_EMPTY, validation.checkArrayEmpty)
                                    .test('fileSize', THIS_FILE_SIZE_TOO_LARGE, validation.checkFileSize)
                                    .test('fileType', THIS_FILE_NOT_FORMAT, validation.checkFileTypeImage),
                                price: yup.number().required(THIS_FIELD_CANNOT_EMPTY)
                                    .min(1000, THIS_FILED_GREATER_THAN_THOUSAND)
                                    .max(1000000000000, THIS_FILED_MONEY_TOO_LARGE),
                                sky: yup.string().required("Chưa nhập mã code :")
                                    .required(THIS_FIELD_CANNOT_EMPTY)
                                    .min(6, THIS_FILED_ENTER_SMALL)
                                    .max(15, THIS_FILED_ENTER_LARGE)
                                    .matches(regex.number, THIS_FIELD_CODE_NUMBER_NOT_FORMAT),
                                qtyInStock: yup.number().required(THIS_FIELD_CANNOT_EMPTY).min(0, THIS_FILED_MUST_POSITIVE),
                                idPromotions: yup.array(), // Add more validation for promotions if needed
                                idVariationOptions: yup.array(), // Add more validation for variationOptions if needed
                            })
                        )
                    })}
                    onSubmit={(data, { setErrors }) =>
                        handleDataSentToServer(data, setErrors)
                        // handleSaveData(data.images, setErrors)
                        // console.log(data)
                    }
                >
                    {({ values, errors }) => (
                        <Form>
                            <div className="card card-form-product ">
                                <div className="card-header">
                                    <div className="card-header-title">
                                        Thông tin sản phẩm

                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12 ">
                                            <UploadImage name="multipart" multi={true} />
                                            <ErrorMessage className="form-text form-error" name='multipart' component='div' />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-6 col-md-6">
                                            <div className="card-body-label">
                                                <label htmlFor="name">Tên</label>
                                            </div>
                                            <div className="card-body-input"><Field name="name" autoComplete="off" className="form-control" type="text" />
                                            </div>
                                            <ErrorMessage className="form-text form-error" name='name' component='div' />
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-6">
                                            <div className="card-body-label">
                                                <label htmlFor="brand">Thương hiệu</label>
                                            </div>
                                            <div className="card-body-input">
                                                <Field name="brand" className="form-control" autoComplete="off" type="text" />
                                            </div>
                                            <ErrorMessage className="form-text form-error" name='brand' component='div' />
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-6">
                                            <div className="card-body-label">
                                                <label htmlFor="idProductCategory">Loại Sản Phẩm</label>
                                            </div>
                                            <div className="card-body-input">
                                                <SelectField
                                                    name="idProductCategory"
                                                    className="form-control"
                                                    options={productCategories}
                                                    errors={errors}
                                                    multi={false}
                                                    nameDefault="- Chọn loại sản phẩm -"
                                                />
                                            </div>
                                            <ErrorMessage className="form-text form-error" name='idProductCategory' component='div' />
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-6">
                                            <div className="card-body-label">
                                                <label htmlFor="idVariation">Giá trị tùy chọn</label>
                                            </div>
                                            <div className="card-body-input">
                                                <SelectField
                                                    name="idVariation"
                                                    className="form-control"
                                                    options={variations}
                                                    multi={false}
                                                    nameDefault="- Chọn giá trị -"
                                                />
                                            </div>
                                            <ErrorMessage className="form-text form-error" name='idVariation' component='div' />
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12">
                                            <div className="card-body-label">
                                                <label htmlFor="description">Mô tả sản phẩm</label>
                                            </div>
                                            <div className="card-body-input">
                                                <CKEditorField name="description" />
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <FieldArray name="productItem">
                                {({ remove, push }) => (
                                    <>
                                        {values.productItem.map((_, index) => (
                                            <div key={index} className="card card-form-item">
                                                <div className="card-header card-header-item">
                                                    <div className="card-header-title">
                                                        Thông tin mặt hàng
                                                    </div>
                                                    {index !== 0 && (
                                                        <button
                                                            type="button"
                                                            className="delete-array-item"
                                                            onClick={() => remove(index)}
                                                        >
                                                            <i className="fa-solid fa-xmark"></i>
                                                        </button>
                                                    )}

                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <UploadImage name={`productItem[${index}].multipart`} multi={false} />
                                                            <ErrorMessage className="form-text form-error" name={`productItem[${index}].multipart`} component="div" />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 col-sm-4 col-md-4">
                                                            <div className="card-body-label">
                                                                <label htmlFor={`productItem[${index}].sky`}>Mã code</label>
                                                            </div>
                                                            <div className="card-body-input"><Field name={`productItem[${index}].sky`} autoComplete="off" className="form-control" type="text" />
                                                            </div>
                                                            <ErrorMessage className="form-text form-error" name={`productItem[${index}].sky`} component="div" />
                                                        </div>
                                                        <div className="col-12 col-sm-4 col-md-4">
                                                            <div className="card-body-label">
                                                                <label htmlFor={`productItem[${index}].price`}>Giá</label>
                                                            </div>
                                                            <div className="card-body-input">
                                                                <Field name={`productItem[${index}].price`} type={TYPE_INPUT_TEXT} autoComplete="off"
                                                                    thousandSeparator="," className="form-control" component={NumberFormatField}
                                                                    allowNegative={false}
                                                                    InputProps={{
                                                                        endAdornment: <InputAdornment position="end">{VND}</InputAdornment>,
                                                                    }} />
                                                            </div>
                                                            <ErrorMessage className="form-text form-error" name={`productItem[${index}].price`} component="div" />
                                                        </div>
                                                        <div className="col-12 col-sm-4 col-md-4">
                                                            <div className="card-body-label">
                                                                <label htmlFor={`productItem[${index}].qtyInStock`}>Số Lượng Sản Phẩm</label>
                                                            </div>
                                                            <div className="card-body-input">
                                                                <Field name={`productItem[${index}].qtyInStock`} onKeyDown={(event) => validation.isNumberKey(event)} className="form-control" type="number" />
                                                            </div>
                                                            <ErrorMessage className="form-text form-error" name={`productItem[${index}].qtyInStock`} component="div" />
                                                        </div>
                                                        <div className="col-12 col-sm-6 col-md-6">
                                                            <div className="card-body-label">
                                                                <label htmlFor={`productItem[${index}].idPromotions`}>Mã giảm giá</label>
                                                            </div>
                                                            <div className="card-body-input">
                                                                <SelectField
                                                                    name={`productItem[${index}].idPromotions`}
                                                                    className="form-control"
                                                                    options={promotions}
                                                                    multi={true}
                                                                    nameDefault="- Chọn mã giảm giá -"
                                                                />
                                                            </div>
                                                            <ErrorMessage className="form-text form-error" name={`productItem[${index}].idPromotions`} component="div" />
                                                        </div>
                                                        <div className="col-12 col-sm-6 col-md-6">
                                                            <div className="card-body-label">
                                                                <label htmlFor={`productItem[${index}].idVariationOptions`}>Mã giảm giá</label>
                                                            </div>
                                                            <div className="card-body-input">
                                                                <SelectField
                                                                    name={`productItem[${index}].idVariationOptions`}
                                                                    className="form-control"
                                                                    options={variationOptions}
                                                                    multi={true}
                                                                    nameDefault="- Chọn giá trị tùy chọn -"
                                                                />
                                                            </div>
                                                            <ErrorMessage className="form-text form-error" name={`productItem[${index}].idVariationOptions`} component="div" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => push({
                                                images: [],
                                                price: 0,
                                                qtyInStock: 0,
                                                promotions: [],
                                                variationOptions: []
                                            })}
                                            className="push-array-item"
                                        >
                                            <i className="fa-solid fa-plus"></i>
                                        </button>
                                    </>
                                )}
                            </FieldArray>
                            <button type="submit" style={{ display: 'none' }} ref={buttonRef}></button>
                        </Form>
                    )}
                </Formik>
            </div >
        </div>
    )
}
export default memo(ContentForm);