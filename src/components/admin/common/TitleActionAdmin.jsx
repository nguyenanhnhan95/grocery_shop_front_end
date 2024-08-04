import { memo } from "react"
import { useSelector } from "react-redux"

function TitleActionAdmin() {
    const { menu } = useSelector((state) => state.menuContentMain)
    return (
        <div className="row main-content-title m-0 pl-2 text-xl font-semibold dark:">
            <div className="col-12">
                {menu !== null ? menu.title : ""}
            </div>
        </div>
    )
}
export default memo(TitleActionAdmin);