import { memo, useCallback, useEffect, useRef, useState } from "react";
import "../../../assets/css/composite/formik/uploadImg.css"
import { ALLOW_IMAGES_File, FILE_STORE_AWS_PATH } from "../../../utils/commonConstants";
import { useField, useFormikContext } from "formik";
import { createUrlImage } from "../../../utils/commonUtils";
import ImageModal from "../modal/ImageModal";
import { validation } from "../../../utils/validation";
import { getObjectAsFile } from "../../../config/S3Config";
function UploadImg({ ...props }) {
    const [files, setFiles] = useState([]);
    const { setFieldValue } = useFormikContext();
    const fileUploadRef = useRef(null);
    const multi = props?.multi
    const [field] = useField(props);
    const [show, setShow] = useState(false);
    const [urlImage, setUrlImage] = useState('');
    const initialFilesNotMulti = useCallback( async(keyValue)=>{
        try{
            const response = await getObjectAsFile(keyValue)
            setFiles([response])
        }catch(err){
            setFiles([]);
        }
    },[getObjectAsFile])
    useEffect(() => {
        if (!multi && validation.isString(field.value) && field.value.includes(FILE_STORE_AWS_PATH.IMAGE)) {
            initialFilesNotMulti(field.value);
        }
    }, [field.value, initialFilesNotMulti, multi]);
    const handleFileUpload = () => {
        fileUploadRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file instanceof File) {
            if (multi) {
                if (files.indexOf(file)) {
                    const newFiles = [...files, file]
                    setFiles(newFiles)
                }
            } else {
                setFiles([file])
            }

        }

    }
    const handleShowImage = (url) => {
        setUrlImage(url)
        setShow(true)
    }
    const handleDeleteImage = (index) => {
        if (validation.isNumber(index)) {
            const newFiles = files.filter((_, i) => i !== index);
            setFiles(newFiles)
        }

    }
    useEffect(() => {
        setFieldValue(field.name, files);
    }, [files])



    return (
        <div className="card-upload-images">
            <div className="col-12 card-upload-tile">
                <div className="card-body-label">
                    <label>Hình ảnh</label>
                </div>
                <input type="file" id="file" style={{ display: 'none' }} ref={fileUploadRef} onChange={handleFileChange} accept={ALLOW_IMAGES_File} />
                <div className="card-body-button-upload">
                    <button type="button" className="card-upload-button" value="Upload" onClick={handleFileUpload}><i className="fa-solid fa-upload" />Chọn hình ảnh</button>
                </div>
            </div>
            <div className="card-body card-show-images row">
                {files && files.map((file, index) => (
                    <div className="col-3 col-sm-6 col-md-4 col-xl-2 card-show-images-item" key={index}>

                        <img src={validation.isFile(file) ? createUrlImage(file) : file} alt="" onClick={() => handleShowImage(createUrlImage(file))} />
                        <div className="delete-images-item" onClick={() => handleDeleteImage(index)}>
                            <i className="fa-solid fa-xmark"></i>
                        </div>

                    </div>
                ))}
                <ImageModal show={show} urlImage={urlImage} handleShow={setShow} />
            </div>
        </div>
    )
}
export default memo(UploadImg);