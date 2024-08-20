import { Routes, Route } from "react-router-dom";

import { queryParameterInitial } from "./initialConfig";
import Manage from "./Manage";
import FormBasic from "./FormBasic";
function RouteProduct() {
    const path = "products"

    return (
        <Routes>
            <Route path="/" element={<Manage queryParameterInitial={queryParameterInitial} url={path} />} />
            <Route path="/add" element={<FormBasic url={path} />} />
            <Route path="/edit/:id" element={<FormBasic url={path} />} />
        </Routes>
    );
}
export default RouteProduct;