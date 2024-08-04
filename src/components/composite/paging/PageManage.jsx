import { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux"
import "../../../assets/css/composite/paging/pageManage.css"
import { validation } from "../../../utils/validation";
import { handleQueryParameter } from "../../../redux/slice/common/queryParameter";
import { changePageQueryParameter, changeSizeQueryParameter } from "../../../redux/action/common/actionQueryParameter";
function PageManage(props) {
    const { list,isPendingList } = props;
    const { queryParameter } = useSelector(state => state.queryParameter)
    const dispatch = useDispatch();
    const handleSelectSize =useCallback( (size) => {
        if (validation.isNumber(size) && size >= 0 && size !== queryParameter.size && !isPendingList) {
            dispatch(handleQueryParameter(changeSizeQueryParameter(size)))
        }
    },[dispatch,queryParameter])
    const handleChoicePage = useCallback((page) => {
        if (validation.isNumber(page) && page >= 0 && page !== queryParameter.page && !isPendingList) {
            dispatch(handleQueryParameter(changePageQueryParameter(page)))
        }
    }, [queryParameter])
    const listPage = useMemo(() => {
        const listPage = [];
        for (let i = 0; i < list.total / queryParameter.size; ++i) {
            listPage.push(
                <li className={i === queryParameter.page ? 'selected' : ''} onClick={() => handleChoicePage(i)} key={i}>{i}</li>
            );
        }
        return listPage;
    }, [queryParameter.size, queryParameter.page, list, handleChoicePage])
    return (
        <div className="container-content-data-page row ">
            <div className="col-12 d-flex justify-content-end align-items-center">
                <div className="dataTables_info  container-content-data-page-item">
                    [
                    <span>{list.total === 0 ? 0 : (queryParameter.page) * queryParameter.size + 1}</span>-
                    <span>{((queryParameter.page + 1) * queryParameter.size) > list.total ? list.total : ((queryParameter.page + 1) * queryParameter.size)}</span>/
                    <span>{list.total}</span>]
                </div>
                <div className="table-selection-page container-content-data-page-item">
                    <label>
                        <select defaultValue={queryParameter.size} onChange={(event) => handleSelectSize(event.target.value * 1)}>
                            <option >5</option>
                            <option>10</option>
                            <option>15</option>
                            <option>20</option>
                        </select>
                    </label>
                </div>
                <div className="table-items-page container-content-data-page-item">
                    <ul>
                        {listPage.length === 1 ? '' : listPage}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default memo(PageManage);