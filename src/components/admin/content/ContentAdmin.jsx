import { Route, Routes} from "react-router-dom";
import "../../../assets/css/admin/content/contentAdmin.css"
import HeaderMain from "../header/HeaderAdmin";
import DashBoard from "../dashboard/DashBoard";
import RouteProduct from "../productManage/products/RouteProduct";
import RouteVariation from "../productManage/variation/RouteVariation";
import RouteShopPromotion from "../shop/promotion/RouteShopPromotion";
import RouteVariationOption from "../productManage/variationOption/RouteVariationOption";
import { memo } from "react";
import RouteRoles from "../system/roles/RouteRoles";
import RouteEmployee from "../system/employee/RouteEmployee";
import BackToTopScroll from "../../layout/BackToTopScroll";
function ContentAdmin() {
  return (
    <div className="main-content">
      <HeaderMain />
      <Routes>
        <Route path="/dash-board" element={<DashBoard />} />
        <Route path="/" element={<DashBoard />} />
        <Route path={'/products/*'} element={<RouteProduct />} />
        <Route path="/products-variation-option/*" element={<RouteVariationOption />} />
        <Route path="/products-variation/*" element={<RouteVariation />} />
        <Route path="/shop-promotion/*" element={<RouteShopPromotion/>} />
        <Route path="/employee/*" element={<RouteEmployee/>} />
        <Route path="/role/*" element={<RouteRoles/>} />
      </Routes>
      <BackToTopScroll/>
    </div>
  )
}
export default memo(ContentAdmin);