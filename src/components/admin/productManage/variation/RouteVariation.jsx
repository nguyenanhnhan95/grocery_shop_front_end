import { Routes, Route } from "react-router-dom";
import Manage from "./Manage";
import FormBasic from "./FormBasic";
import { queryParameterInitial } from "./initialConfig";


function RouteVariation() {
    const path = "products-variation"
    return (
        <Routes>
            <Route path="/" element={<Manage queryParameterInitial={queryParameterInitial} url={path} />} />
            <Route path="/add" element={<FormBasic url={path} />} />
            <Route path="/edit/:id" element={<FormBasic url={path}/>} />
        </Routes>
    );
}

export default RouteVariation;