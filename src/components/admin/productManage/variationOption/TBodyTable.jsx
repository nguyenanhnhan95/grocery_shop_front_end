import { memo } from "react";
import ActionDropdown from "../../../composite/table/ActionDropdown";
import { useSelector } from "react-redux";
import { optionActionVariationOption } from "./initialConfig";
function TBodyTable({ list, url }) {
    const { queryParameter } = useSelector(state => state.queryParameter)
    return (
        <>
            {list && list.result.map((each, index) => (
                <tr key={index}>
                    <td scope="row">{index + 1 + (queryParameter.size * queryParameter.page)}</td>
                    <td>{each.name}</td>
                    <td>{each.variation.name}</td>
                    <td className="table-action">
                        <ActionDropdown id={each.id} url={url} optionActions={optionActionVariationOption} />
                    </td>
                </tr>
            ))}
        </>
    )
}
export default memo(TBodyTable)