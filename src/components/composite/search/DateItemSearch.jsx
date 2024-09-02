import { memo, useCallback} from "react";
import "../../../assets/css/composite/search/dateItemSearch.css"
import CustomDatePicker from "../custom/customDatePicker";

function DateItemSearch(props) {
    const { searchFiled, item, setSearchFiled } = props;
    const handleEnterDate = useCallback((value) => {
        const date = new Date(value)
        let newQueryParameter = null;
        if (date instanceof Date) {
            const newSearchName = { ...item.search };
            const firstKey = Object.keys(newSearchName)[0];
            newQueryParameter = {
                searchFiled,
                [firstKey]: date,
            }
        } else {
            const newSearchName = { ...item.search };
            const firstKey = Object.keys(newSearchName)[0];
            newQueryParameter = {
                searchFiled,
                [firstKey]: null,
            }
        }
        setSearchFiled(newQueryParameter)
    }, [setSearchFiled, item, searchFiled])
    return (
        <div className="col-12 col-md-6 col-xl-3 container-content-search-advanced-item"  >
            <CustomDatePicker onChange={(value) => handleEnterDate(value)} title={props?.title}/>
        </div>
    )
}
export default memo(DateItemSearch)