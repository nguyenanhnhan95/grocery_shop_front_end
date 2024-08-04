import { memo, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "../../../utils/commonUtils";
import { handleQueryParameter } from "../../../redux/slice/common/queryParameter";
import { changeFiledQueryParameter } from "../../../redux/action/common/actionQueryParameter";
function SearchNameAdmin(props) {
    const { handleShowAdvanced, setSearchFiled, searchFiled,itemSearch } = props;
    const dispatch= useDispatch();
    const handelEnterData = useCallback((value) => {
        Object.keys(searchFiled).forEach(key => {
            if (value.hasOwnProperty(key)) {
                // Logs the key if it exists in both objects
                let copyQueryParameter = {      
                        ...searchFiled,            
                        [key]: value[key]
                };
                setSearchFiled(copyQueryParameter)
                // Logs the updated queryParameter object
            }
        })
    }, [setSearchFiled, searchFiled])
    const debouncedHandleEnterData = useMemo(() => debounce(handelEnterData, 500), [handelEnterData]);
    return (
        <div className="row container-content-search-head">
            <div className={itemSearch.searchAdvanced.style.display === 'none' ? 'col-12 col-md-9 col-xl-10 container-content-search-name' : 'col-12 col-md-9 col-xl-10 container-content-search-name'} >
                <input type="text" placeholder="Nhập tên " onChange={(event) => debouncedHandleEnterData({ name: event.target.value })} />
                <button type="button" onClick={() => dispatch(handleQueryParameter(changeFiledQueryParameter(searchFiled)))}>
                    <i className="fa-solid fa-magnifying-glass" />
                </button>
            </div>
            <div className="col-12 col-md-3 col-xl-2 container-content-option-advanced" style={{ display: itemSearch.searchAdvanced.style.display }} onClick={handleShowAdvanced} >
                <button type="button" >
                    Lọc nâng cao<i className="fa-solid fa-chevron-down " />
                </button>
            </div>
        </div>
    )
}
export default memo(SearchNameAdmin);