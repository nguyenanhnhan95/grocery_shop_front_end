import { ErrorMessage, Field, Form, Formik, FieldArray } from "formik";
import "../../../../assets/css/admin/productManage/product/contentForm.css"
import * as yup from "yup";
import UploadImage from "./../../../composite/formik/UploadImg"
import "../../../../assets/css/admin/skeletonLoading/contentForm.css"
import axios from "axios";
import {  createHeader } from "../../../../utils/commonUtils";
import { CHILDREN, PARENT, THIS_FIELD_CANNOT_EMPTY, THIS_FILE_NOT_FORMAT, THIS_FILE_SIZE_TOO_LARGE, THIS_FILED_ENTER_LARGE, THIS_FILED_ENTER_SMALL, THIS_FILED_MUST_POSITIVE, THIS_FILED_SELECT_ITEM_CANNOT_EMPTY, THIS_UPLOAD_FILE_ITEM_CANNOT_EMPTY, TYPE_INPUT_NUMBER, UNDER_STROKE, VND } from "../../../../utils/commonConstants";
import { CKEditorField } from "../../../composite/formik/CKEditorField";
import { SelectField } from "../../../composite/formik/SelectedField";
import { InputAdornmentField } from "../../../composite/formik/InputAdornmentField";
import { validation } from "../../../../utils/validation";


function ContentForm(props) {
    const { handleContainFileSave, initialForm, buttonRef,variations,variationOptions, productCategories,promotions} = props;
    console.log(variations)
    console.log(variations)
    const handleSaveData = async (formData, data, setErrors) => {
        try {
            console.log(formData)
            const response = await axios.post(`http://localhost:8080/products`, formData, data, createHeader());
            console.log(response)
        } catch (error) {
            setErrors(error);
        }
    }
    const initialValues = {
        images: [],
        name: '',
        brand: '',
        productCategory: '',
        variation: '',
        description: '',
        productItem: [{
            images: [],
            price: 0,
            qtyInStock: 0,
            promotions: [],
            variationOptions: []
        }]
    };
    const handleDataSentToServer = (data, setErrors) => {
        const multiPart = new FormData();

        data.images.forEach(image => {
            multiPart.append(PARENT, image);
        });

        data.productItem.forEach((productItem, productIndex) => {
            productItem.images.forEach((image, imageIndex) => {
                multiPart.append(`${CHILDREN}${UNDER_STROKE}${productIndex}`, image);
            });
            delete productItem.images;
        });

        delete data.images;
        handleContainFileSave(data, multiPart, setErrors);
    }
    return (
        <div className="main-content-form-product main-content-form">

            <Formik
                enableReinitialize={true}
                initialValues={initialValues
                }
                validationSchema={yup.object().shape({
                    images: yup.mixed().required(THIS_UPLOAD_FILE_ITEM_CANNOT_EMPTY)
                        .test('isNotEmptyArray', THIS_UPLOAD_FILE_ITEM_CANNOT_EMPTY, validation.checkArrayEmpty)
                        .test('fileSize', THIS_FILE_SIZE_TOO_LARGE, validation.checkFileSize)
                        .test('fileType', THIS_FILE_NOT_FORMAT, validation.checkFileTypeImage),
                    name: yup.string().required(THIS_FIELD_CANNOT_EMPTY)
                        .max(100, THIS_FILED_ENTER_LARGE)
                        .min(4, THIS_FILED_ENTER_SMALL),
                    brand: yup.string().required(THIS_FIELD_CANNOT_EMPTY)
                        .max(100, THIS_FILED_ENTER_LARGE)
                        .min(4, THIS_FILED_ENTER_SMALL),
                    productCategory: yup.string().required(THIS_FILED_SELECT_ITEM_CANNOT_EMPTY),
                    variation: yup.string().required(THIS_FILED_SELECT_ITEM_CANNOT_EMPTY),
                    productItem: yup.array().of(
                        yup.object().shape({
                            images: yup.mixed().required(THIS_UPLOAD_FILE_ITEM_CANNOT_EMPTY)
                                .test('isNotEmptyArray', THIS_UPLOAD_FILE_ITEM_CANNOT_EMPTY, validation.checkArrayEmpty)
                                .test('fileSize', THIS_FILE_SIZE_TOO_LARGE, validation.checkFileSize)
                                .test('fileType', THIS_FILE_NOT_FORMAT, validation.checkFileTypeImage),
                            price: yup.number().required(THIS_FIELD_CANNOT_EMPTY).min(0, THIS_FILED_MUST_POSITIVE),
                            qtyInStock: yup.number().required(THIS_FIELD_CANNOT_EMPTY).min(0, THIS_FILED_MUST_POSITIVE),
                            promotions: yup.array(), // Add more validation for promotions if needed
                            variationOptions: yup.array(), // Add more validation for variationOptions if needed
                        })
                    )
                })}
                onSubmit={(data, { setErrors }) =>
                    handleDataSentToServer(data, setErrors)
                    // handleSaveData(data.images, setErrors)
                }
            >
                {({ values }) => (
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
                                        <UploadImage name="images" multi={true} />
                                        <ErrorMessage className="form-text form-error" name='images' component='div' />
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
                                            <label htmlFor="productCategory">Loại Sản Phẩm</label>
                                        </div>
                                        <div className="card-body-input">
                                            <SelectField
                                                name="productCategory"
                                                className="form-control"
                                                options={productCategories}
                                                multi={false}
                                                nameDefault="- Chọn loại sản phẩm -"
                                            />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='productCategory' component='div' />
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6">
                                        <div className="card-body-label">
                                            <label htmlFor="variation">Giá trị tùy chọn</label>
                                        </div>
                                        <div className="card-body-input">
                                            <SelectField
                                                name="variation"
                                                className="form-control"
                                                options={variations}
                                                multi={false}
                                                nameDefault="- Chọn giá trị -"
                                            />
                                        </div>
                                        <ErrorMessage className="form-text form-error" name='variation' component='div' />
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12">
                                        <div className="card-body-label">
                                            <label htmlFor="variation">Mô tả sản phẩm</label>
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
                                    {values.productItem.map((item, index) => (
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
                                                        <UploadImage name={`productItem.${index}.images`} multi={false} />
                                                        <ErrorMessage className="form-text form-error" name={`productItem.${index}.images`} component="div" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12 col-sm-6 col-md-6">
                                                        <div className="card-body-label">
                                                            <label htmlFor={`productItem.${index}.price`}>Giá</label>
                                                        </div>
                                                        <div className="card-body-input">
                                                            <Field name={`productItem.${index}.price`} type={TYPE_INPUT_NUMBER} className="form-control" adornment={VND} component={InputAdornmentField} />
                                                        </div>
                                                        <ErrorMessage className="form-text form-error" name={`productItem.${index}.price`} component="div" />
                                                    </div>
                                                    <div className="col-12 col-sm-6 col-md-6">
                                                        <div className="card-body-label">
                                                            <label htmlFor={`productItem.${index}.qtyInStock`}>Số Lượng Sản Phẩm</label>
                                                        </div>
                                                        <div className="card-body-input">
                                                            <Field name={`productItem.${index}.qtyInStock`} className="form-control" type="number" />
                                                        </div>
                                                        <ErrorMessage className="form-text form-error" name={`productItem.${index}.qtyInStock`} component="div" />
                                                    </div>
                                                    <div className="col-12 col-sm-6 col-md-6">
                                                        <div className="card-body-label">
                                                            <label htmlFor={`productItem.${index}.promotions`}>Mã giảm giá</label>
                                                        </div>
                                                        <div className="card-body-input">
                                                            <SelectField
                                                                name={`productItem.${index}.promotions`}
                                                                className="form-control"
                                                                options={promotions}
                                                                multi={true}
                                                                nameDefault="- Chọn mã giảm giá -"
                                                            />
                                                        </div>
                                                        <ErrorMessage className="form-text form-error" name={`productItem.${index}.promotions`} component="div" />
                                                    </div>
                                                    <div className="col-12 col-sm-6 col-md-6">
                                                        <div className="card-body-label">
                                                            <label htmlFor={`productItem.${index}.promotions`}>Mã giảm giá</label>
                                                        </div>
                                                        <div className="card-body-input">
                                                            <SelectField
                                                                name={`productItem.${index}.variationOptions`}
                                                                className="form-control"
                                                                options={variationOptions}
                                                                multi={true}
                                                                nameDefault="- Chọn giá trị tùy chọn -"
                                                            />
                                                        </div>
                                                        <ErrorMessage className="form-text form-error" name={`productItem.${index}.variationOptions`} component="div" />
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
    )
}
export default ContentForm;