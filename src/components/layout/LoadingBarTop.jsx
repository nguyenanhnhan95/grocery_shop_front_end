import { memo, useState } from "react";
import LoadingBar from 'react-top-loading-bar'
import { CSS0693e3 } from "../../utils/commonConstants";
import { useDispatch, useSelector } from "react-redux";
import { chaneProgressTop } from "../../redux/slice/layout/loadingBarTop";
function LoadingBarTop() {
    const dispatch = useDispatch();
    const {progress} = useSelector(state=>state.loadingBarTop)
    return (
        <div>
            <LoadingBar
                color={CSS0693e3}
                progress={progress}
                
                onLoaderFinished={() => dispatch(chaneProgressTop(0))}
            />
        </div>
    )
}
export default memo(LoadingBarTop)