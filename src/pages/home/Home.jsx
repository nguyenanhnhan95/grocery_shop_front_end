import React, { lazy, memo, Suspense } from "react"
// import Header from "../../components/header/Header";
import "../../assets/css/home/home.css"
import HomeSlider from "../../components/composite/slider/HomeSlider";
import store from "../../store/store";
import LoadingHeader from "../../components/loading/home/LoadingHeader";
import { actionReducerStore,  reducerSliceKey } from "../../utils/commonConstants";
import { getAllCategoryMenus } from "../../redux/slice/product/productCategory";

const Header = lazy(() => import('../../components/header/Header').then((module) => {
    store.injectReducer(actionReducerStore.add, reducerSliceKey.productCategoryMenus, getAllCategoryMenus.reducer)
    return module;
}))

function Home() {
    return (
        <div className="container-home">
            <Suspense fallback={<LoadingHeader />}>               
                <Header/>
            </Suspense>

            <HomeSlider />
        </div>
    )
}
export default memo(Home);
