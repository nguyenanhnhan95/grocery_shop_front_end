import { Routes, Route } from "react-router-dom";

import { useEffect, } from "react";

import store from "../../../../store/store";
import { actionReducerStore, reducerSliceKey } from "../../../../utils/commonConstants";
import { fetchVariationSlice } from "../../../../redux/slice/product/variation";
import { fetchPromotionSlice } from "../../../../redux/slice/shop/promotion";
import { fetchVariationOptionSlice } from "../../../../redux/slice/product/variationOption";
import { queryParameterInitial } from "./initialConfig";
import Manage from "./Manage";
import FormBasic from "./FormBasic";
function RouteProduct() {
    const path = "products"
    useEffect(() => {
        store.injectReducer(actionReducerStore.remove, reducerSliceKey.productVariation, fetchVariationSlice.reducer)
        store.injectReducer(actionReducerStore.remove, reducerSliceKey.shopPromotion, fetchPromotionSlice.reducer)
        store.injectReducer(actionReducerStore.remove, reducerSliceKey.productVariationOption, fetchVariationOptionSlice.reducer)
        store.injectReducer(actionReducerStore.add, reducerSliceKey.productVariation, fetchVariationSlice.reducer)
        store.injectReducer(actionReducerStore.add, reducerSliceKey.shopPromotion, fetchPromotionSlice.reducer)
        store.injectReducer(actionReducerStore.add, reducerSliceKey.productVariationOption, fetchVariationOptionSlice.reducer)

    }, []);

    return (
        <Routes>
            <Route path="/" element={<Manage queryParameterInitial={queryParameterInitial} url={path} />} />
            <Route path="/add" element={<FormBasic url={path} />} />
            <Route path="/edit/:id" element={<FormBasic url={path} />} />
        </Routes>
    );
}
export default RouteProduct;