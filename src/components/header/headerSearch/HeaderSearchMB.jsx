import { memo } from "react"
import "../../../assets/css/header/headerSearch/headerSearchMB.css"
function HeaderSearchMB() {
    return (
        <div className="header-search-mob">
            <div className="header-search-input d-flex align-items-center">
                <input className="header-search-input-enter form-control" />
                <div className="header-search-input-press">
                    <i className="fa-solid fa-magnifying-glass" />
                </div>
            </div>
        </div>
    )
}
export default memo(HeaderSearchMB)