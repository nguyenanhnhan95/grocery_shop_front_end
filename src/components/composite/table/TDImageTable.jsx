import { memo, useEffect } from "react"
import { useFetchFile } from "../../../hook/fetch/aws/useFetchFile"
import "../../../assets/css/composite/table/tdImageTable.css"
import imageError from "../../../assets/img/error/image-error.jpg"
function TDImageTable(props) {
    const {fetchFile ,data, isPending,error }=useFetchFile()
    useEffect(()=>{
        if(props?.srcImage){
            fetchFile(props.srcImage)            
        }
    },[props?.srcImage])
    return (
        <div className={isPending?`loading-td-image`:''}>
            <div className="contain-td-image">
                <img src={error===null ? data : imageError}/>
            </div>
        </div>
    )
}
export default memo(TDImageTable)