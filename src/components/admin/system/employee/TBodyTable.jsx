import { memo } from "react"
import ActionDropdown from "../../../composite/table/ActionDropdown"
import { useSelector } from "react-redux"
import { optionActions, statusAccount } from "./initialConfig"
import { convertDate } from "../../../../utils/commonUtils"
import TDImageTable from "../../../composite/table/TDImageTable"
function TBodyTable({ list, url }) {
    const { queryParameter } = useSelector(state => state.queryParameter)
    return (
        <>
            {list && list.result.map((each, index) => (
                <tr key={index} className="tr-product-manage">
                    <td scope="row">{index + 1 + (queryParameter.size * queryParameter.page)}</td>
                    <td>{each.name}</td>
                    <td>{each.nameLogin}</td>
                    <td>
                        <TDImageTable srcImage={each.avatar} />
                    </td>
                    <td>{each.email}</td>
                    <td >
                        <div className={`${statusAccount[each.accountStatus]}`}>{each.accountStatus}</div>
                    </td>
                    <td>{convertDate(each.createDate)}</td>
                    <td className="table-action">
                        <ActionDropdown id={each.id} url={url} optionActions={optionActions} />
                    </td>
                </tr>
            ))}
        </>
    )
}
export default memo(TBodyTable)