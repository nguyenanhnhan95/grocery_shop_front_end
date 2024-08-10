import { memo } from "react"
import ActionDropdown from "../../../composite/table/ActionDropdown"
import { useSelector } from "react-redux"
import { optionActions } from "./initialConfig"
import TDImageTable from "../../../composite/table/TDImageTable"

function TBodyTable({ list, url }) {
    const { queryParameter } = useSelector(state => state.queryParameter)
    return (
        <>
            {list && list.result.map((each, index) => (
                <tr key={index} className="tr-product-manage">
                    <td scope="row">{index + 1 + (queryParameter.size * queryParameter.page)}</td>
                    {/* <td>{each.images.length>0?each.images[0]:''}</td> */}
                    <td>{each.name}</td>
                    <td ><TDImageTable srcImage={each?.images[0]?.small} /></td>
                    <td>{each.brand}</td>
                    <td>{each.categoryName}</td>
                    <td >
                        <td>
                            <div dangerouslySetInnerHTML={{ __html: each.description }}></div>
                        </td>
                    </td>
                    <td className="table-action">
                        <ActionDropdown id={each.id} url={url} optionActions={optionActions} />
                    </td>
                </tr>
            ))}
        </>
    )
}
export default memo(TBodyTable)