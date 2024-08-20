import { memo } from "react"
import ActionDropdown from "../../../composite/table/ActionDropdown"
import { useSelector } from "react-redux"
import { optionActions } from "./initialConfig"
function TBodyTable({ list, url }) {
    const { queryParameter } = useSelector(state => state.queryParameter)
    return (
        <>
            {list && list.result.map((each, index) => (
                <tr key={index} className="tr-product-manage">
                    <td scope="row">{index + 1 + (queryParameter.size * queryParameter.page)}</td>
                    <td>{each.name}</td>
                    <td>{each.nameLogin}</td>
                    <td>{each.images.length>0?each.images[0]:''}</td>
                    <td>{each.description}</td>
                    <td className="table-action">
                        <ActionDropdown id={each.id} url={url} optionActions={optionActions} />
                    </td>
                </tr>
            ))}
        </>
    )
}
export default memo(TBodyTable)