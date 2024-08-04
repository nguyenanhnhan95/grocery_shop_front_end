import { Route, Routes } from "react-router-dom";
import Manage from "./Manage";
import { useDispatch } from "react-redux";
import { memo, useEffect, useState } from "react";
import store from "../../../../store/store";
import { actionReducerStore, reducerSliceKey } from "../../../../utils/commonConstants";
import { fetchVariationSlice } from "../../../../redux/slice/product/variation";
import { queryParameterInitial } from "./initialConfig";
import FormBasic from "./FormBasic";
function RouteVariationOption() {
    const path = "products-variation-option"
    useEffect(()=>{
        store.injectReducer(actionReducerStore.add, reducerSliceKey.productVariation, fetchVariationSlice.reducer)
    },[])
    

    return (
        <Routes>
            <Route path="/" element={<Manage queryParameterInitial={queryParameterInitial} url={path} />} />
            <Route path="/add" element={<FormBasic url={path} />} />
            <Route path="/edit/:id" element={<FormBasic url={path} />} />
        </Routes>
    );
}
export default memo(RouteVariationOption);