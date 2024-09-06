import { memo, useEffect } from "react"
import "../../../assets/css/composite/table/tdImageTable.css"
import imageError from "../../../assets/img/error/image-error.jpg"
import { useFetchUrlImage } from "../../../hook/fetch/aws/useFetchUrlImage"
import { FILE_STORE_AWS_PATH } from "../../../utils/commonConstants"
function TDImageTable(props) {
    const { fetchUrlImage, data, isPending, error } = useFetchUrlImage()
    useEffect(() => {
        if (props?.srcImage && props?.srcImage.includes(FILE_STORE_AWS_PATH.IMAGE)) {
            fetchUrlImage(props.srcImage)
        }
    }, [props?.srcImage])
    return (
        <div className={isPending ? `loading-td-image` : ''}>
            <div className="contain-td-image">
                {props?.srcImage  ? (
                    <img
                        src={error ? imageError : data}
                        alt=""
                        onError={(e) => e.target.src = imageError} // Thay thế hình ảnh khi lỗi
                    />
                ) : null}
            </div>
        </div>
    )
}
export default memo(TDImageTable)