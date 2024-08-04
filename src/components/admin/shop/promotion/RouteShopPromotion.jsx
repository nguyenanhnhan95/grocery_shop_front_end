
import FormBasic from "./FormBasic";
import { queryParameterInitial } from "./initialConfig";
import Manage from "./Manage";

import { Route, Routes } from "react-router-dom";



function RouteShopPromotion() {
    const path = "shop-promotion"


    return (
        <Routes>
            <Route path="/" element={<Manage queryParameterInitial={queryParameterInitial} url={path} />} />
            <Route path="/add" element={<FormBasic url={path} />} />
            <Route path="/edit/:id" element={<FormBasic url={path} />} />
        </Routes>
    );
}

export default RouteShopPromotion;