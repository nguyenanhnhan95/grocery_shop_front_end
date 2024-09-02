import { Routes, Route } from "react-router-dom";

import { memo } from "react";

import { queryParameterInitial } from "./initialConfig";
import Manage from "./Manage";
import FormBasic from "./FormBasic";
function RouteStaff() {
    const path = "employee"
   
    return (
        <Routes>
            <Route path="/" element={<Manage queryParameterInitial={queryParameterInitial} url={path} />} />
            <Route path="/add" element={<FormBasic url={path} />} />
            <Route path="/edit/:id" element={<FormBasic url={path} />} />
        </Routes>
    );
}
export default memo(RouteStaff);