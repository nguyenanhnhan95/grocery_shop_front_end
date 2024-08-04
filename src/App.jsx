import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import store from "./store/store";
import LoadingPage from "./components/loading/LoadingPage";
import { actionReducerStore, reducerSliceKey } from "./utils/commonConstants";
import { ErrorBoundary } from "react-error-boundary";
import ErrorSystem from "./pages/error/ErrorSystem";
import "./assets/css/composite/modal/commonModal.css"
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
import NotFound from "./components/error/NotFound";
import { loginFormSlice } from "./redux/slice/login/login.jsx";
import menuContentMainSlice from "./redux/slice/admin/sidebar/menuContentMain.jsx";
import overPlayMenuMainSlice from "./redux/slice/admin/sidebar/overPlayMenu.jsx";
import { actionAdminSlice } from "./redux/slice/admin/action/actionAdmin.jsx";
import { getAllCategoryMenus } from "./redux/slice/product/productCategory.jsx";
import InitialAdmin from "./components/wrapper/InitialAdmin.jsx";
import Home from "./pages/home/Home.jsx";
import { getScreenThem } from "./utils/commonUtils.jsx";
import OAuth2RedirectHandler from "./components/oauth2/OAuth2RedirectHandler.jsx";
import NotificationModal from "./components/composite/modal/NotificationModal.jsx";
import { useScreenMode } from "./hook/auth/useScreenMode.jsx";

const Login = lazy(() => import('./pages/login/Login').then((module) => {
    store.injectReducer(actionReducerStore.clear, '', '')
    store.injectReducer(actionReducerStore.add, reducerSliceKey.loginForm, loginFormSlice.reducer)
    return module;
}))
const Admin = lazy(() => import('./pages/admin/Admin').then((module) => {
    store.injectReducer(actionReducerStore.clear, '')
    store.injectReducer(actionReducerStore.add, reducerSliceKey.menuContentMain, menuContentMainSlice.reducer)
    store.injectReducer(actionReducerStore.add, reducerSliceKey.overPlayMenuMain, overPlayMenuMainSlice.reducer)
    store.injectReducer(actionReducerStore.add, reducerSliceKey.actionAdmin, actionAdminSlice.reducer)
    store.injectReducer(actionReducerStore.add, reducerSliceKey.productCategoryMenus, getAllCategoryMenus.reducer)
    return module;
}))
const InitialHome = lazy(() => import('./components/wrapper/InitialHome').then((module) => {
    return module;
}))
function App() {
    const { screenMode } = useScreenMode()
    return (
        <Suspense fallback={<LoadingPage />}>
            <ErrorBoundary fallback={<ErrorSystem />} >
                <div className={`${getScreenThem(screenMode)}`}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<InitialHome><Home /></InitialHome>} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/admin/*" element={<InitialAdmin><Admin /></InitialAdmin>} />
                            <Route path={'/oauth2/redirect'} element={<OAuth2RedirectHandler />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                    <NotificationModal />
                </div>
            </ErrorBoundary>
        </Suspense>
    );
}

export default App;
