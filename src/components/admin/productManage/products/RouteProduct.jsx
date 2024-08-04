import { Routes, Route } from "react-router-dom";
import Manage from "./Manage";
import FormBasic from "./FormBasic";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setActionModel } from "../../../../redux/slice/admin/action/actionAdmin";
import { columnProducts, dataActions, initialForm, productsAction, productsHttp, productsSearch, queryParameter } from "./initialConfig";
import TBodyTable from "./TBodyTable";
import store from "../../../../store/store";
import { actionReducerStore, reducerSliceKey } from "../../../../utils/commonConstants";
import { fetchVariationSlice } from "../../../../redux/slice/product/variation";
import LoadingPage from "../../../loading/LoadingPage";
import { fetchPromotionSlice } from "../../../../redux/slice/shop/promotion";
import { fetchVariationOptionSlice } from "../../../../redux/slice/product/variationOption";
function RouteProduct() {
    const dispatch = useDispatch();
    const [initialized, setInitialized] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0, 'smooth')
        store.injectReducer(actionReducerStore.remove, reducerSliceKey.productVariation, fetchVariationSlice.reducer)
        store.injectReducer(actionReducerStore.remove, reducerSliceKey.shopPromotion, fetchPromotionSlice.reducer)
        store.injectReducer(actionReducerStore.remove,reducerSliceKey.productVariationOption,fetchVariationOptionSlice.reducer)
        store.injectReducer(actionReducerStore.add, reducerSliceKey.productVariation, fetchVariationSlice.reducer)
        store.injectReducer(actionReducerStore.add, reducerSliceKey.shopPromotion, fetchPromotionSlice.reducer)
        store.injectReducer(actionReducerStore.add,reducerSliceKey.productVariationOption,fetchVariationOptionSlice.reducer)
        const initializeState = async () => {
            try {

                await dispatch(setActionModel({
                    httpNavigate: productsHttp.productionNavigate,
                    httpApi: productsHttp.actionURL.instant(),
                    itemAction: productsAction,
                    itemSearch: productsSearch,
                    queryParameter: queryParameter,
                    nameColumn: columnProducts,
                    dataActions: dataActions,
                    initialForm: initialForm,
                    TBodyTable: TBodyTable
                }));
                setInitialized(true);
            } catch (error) {
                console.error("Error initializing state:", error);
                // Xử lý lỗi nếu cần thiết
            }
        };

        initializeState();
    }, [dispatch]);

    if (!initialized) {
        return <LoadingPage />; // Hoặc bất kỳ component nào khác bạn muốn hiển thị trong khi khởi tạo
    }

    return (
        <Routes>
            <Route path="/" element={<Manage />} />
            <Route path="/add" element={<FormBasic />} />
            <Route path="/edit/:id" element={<FormBasic />} />
        </Routes>
    );
}
export default RouteProduct;