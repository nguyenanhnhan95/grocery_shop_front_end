import { memo, useCallback, useEffect, useRef, useState } from "react";
import "../../../assets/css/composite/formik/uploadImg.css"
import { checkFile } from "../../../config/S3Config";
import { ALLOW_IMAGES_File, FILE_IMAGE } from "../../../utils/commonConstants";
import { useField, useFormikContext } from "formik";
import { createUrlImage } from "../../../utils/commonUtils";
import ImageModal from "../modal/ImageModal";
import { validation } from "../../../utils/validation";
function UploadImg({ ...props }) {
    const [files, setFiles] = useState([]);
    const { setFieldValue } = useFormikContext();
    const fileUploadRef = useRef(null);
    const multi = props?.multi
    const [field] = useField(props);
    const [show, setShow] = useState(false);
    const [urlImage, setUrlImage] = useState('');
    useEffect(() => {
        initialFileImages();
    }, [])
    console.log(field)
    console.log(files)
    const initialFileImages = useCallback(() => {
        // try {
        //     if (field?.value?.length > 0) {
        //         const formData = new FormData();
        //         formData.append(NO, fileInput.files[0]);
        //         // Tạo một mảng mới kết hợp các phần tử từ `files` và `field.value`
        //         const updatedFiles = [...files, ...field.value];
        //         // Cập nhật state với mảng mới
        //         setFiles(updatedFiles);
        //     }
        // } catch (error) {
        //     console.error(error)
        // }
    }, [])
    const handleFileUpload = () => {
        fileUploadRef.current.click();
    };
   
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file instanceof File) {
            if(multi){
                if(files.indexOf(file)){
                    const newFiles = [...files,file]
                    setFiles(newFiles)
                }
            }else{
                setFiles([file])
            }
            
        }

    }
    const handleShowImage = (url) => {
        setUrlImage(url)
        setShow(true)
    }
    const handleDeleteImage = (index) => {
        if(validation.isNumber(index)){
            const newFiles = files.filter((_, i) => i !== index);
            setFiles(newFiles)
        }
        
    }
    useEffect(() => {
        setFieldValue(field.name,files );
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
                    <div className="col-6 col-sm-6 col-md-4 col-xl-2 card-show-images-item" key={index}>

                        <img src={createUrlImage(file)} alt="" onClick={() => handleShowImage(createUrlImage(file))} />
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