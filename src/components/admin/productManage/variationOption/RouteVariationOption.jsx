import { Route, Routes } from "react-router-dom";
import Manage from "./Manage";
import { memo } from "react";

import { queryParameterInitial } from "./initialConfig";
import FormBasic from "./FormBasic";
function RouteVariationOption() {
    const path = "products-variation-option"

    

    return (
        <Routes>
            <Route path="/" element={<Manage queryParameterInitial={queryParameterInitial} url={path} />} />
            <Route path="/add" element={<FormBasic url={path} />} />
            <Route path="/edit/:id" element={<FormBasic url={path} />} />
        </Routes>
    );
}
export default memo(RouteVariationOption);