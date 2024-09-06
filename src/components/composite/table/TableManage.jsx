
import "../../../assets/css/composite/table/tableManage.css"
import { memo } from "react";
import PageManage from "../paging/PageManage";
import { createActionURL } from "../../../utils/commonUtils";
import { useFetchSearch } from "../../../hook/fetch/authenticated/useFetchSearch";

function TableManage(props) {
  const { url, TBodyTable,nameColumn } = props;
  const { data: list, isPending: isPendingList } = useFetchSearch({ url: createActionURL(url).instant(), initialData: { result: [], total: 0 } });

  return (
    <div className="main-content-data pb-3">
      <div className="container-fluid container-content-data  ">
        <table className="table table-hover tscrolls">
          <thead className="table-thead sticky-header">
            <tr >
              {nameColumn.map((each, index) => (
                <th scope="col" style={each.style} key={index}>{each.name}</th>
              ))}
            </tr>
          </thead>
          <tbody style={{height:35*list.total}}>        
              <TBodyTable list={list} url={url} />
          </tbody>
        </table>
      </div>
      <PageManage list={list} isPendingList={isPendingList} />
    </div>
  )
}
export default memo(TableManage);