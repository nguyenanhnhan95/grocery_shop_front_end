import { memo } from "react"
import ActionDropdown from "../../../composite/table/ActionDropdown"
import { convertDate} from "../../../../utils/commonUtils"
import { useSelector } from "react-redux"
import { optionActions } from "./initialConfig"

function TBodyTable({ list,url }) {
    const { queryParameter } = useSelector(state => state.queryParameter)
    return (
        <>
            {list && list.result.map((each, index) => (
                <tr key={index}>
                    <td scope="row">{index + 1 + (queryParameter.size * queryParameter.page)}</td>
                    <td>{each.name}</td>
                    <td>{each.description}</td>
                    <td>{each.code}</td>
                    <td>{each.startDate===null?'':convertDate(each.startDate)}</td>
                    <td>{each.endDate===null?'':convertDate(each.endDate)}</td>
                    <td className="table-action">
                        <ActionDropdown id={each.id} url={url} optionActions={optionActions} />
                    </td>
                </tr>
            ))}
        </>
    )
}
export default memo(TBodyTable)