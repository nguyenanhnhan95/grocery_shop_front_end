import { memo } from "react";
import { useEffect, useRef, useState } from "react";
import "../../../../assets/css/admin/header/headerSearchAdmin/headerSearchAdminPC.css"
function SearchHeaderAdminPC() {
    const [isFocused, setIsFocused] = useState(false);
    const searchMainHeaderTotal = useRef(null)
    const searchMainHeader = useRef(null)
    const inputMainHeader = useRef(null)
    useEffect(() => {
        document.addEventListener('click', handleClickOutsideMainSearch);
        return () => {
            document.removeEventListener('click', handleClickOutsideMainSearch);
        };
    }, []);
    const handleMainSearchOnClick = () => {
        setIsFocused(!isFocused);
    };

    const handleClickOutsideMainSearch = (event) => {
        if (searchMainHeaderTotal.current && !searchMainHeaderTotal.current.contains(event.target)) {
            setIsFocused(false);
        }
    };
    return (
        <li className="main-content-search nav-item " ref={searchMainHeaderTotal}>
            <input type="text" className={`main-content-search-input ${isFocused ? 'focus' : ''}`} placeholder="Tìm kiếm" ref={inputMainHeader} />
            <i className="fa-solid fa-magnifying-glass" ref={searchMainHeader} onClick={handleMainSearchOnClick} />
        </li>
    )
}
export default memo(SearchHeaderAdminPC)