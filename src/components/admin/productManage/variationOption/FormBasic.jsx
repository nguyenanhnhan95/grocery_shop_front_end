
import { memo } from "react";
import SaveAction from "../../common/SaveAction";
import ContentForm from "./ContentForm"
import { initialForm } from "./initialConfig";

function FormBasic(props) {
    const {url} = props;
    return (
        <>
            <SaveAction url={url} />
            {/* <ContentForm /> */}
            <ContentForm initialForm={initialForm} url={url} />
        </>
    )
}
export default memo(FormBasic)