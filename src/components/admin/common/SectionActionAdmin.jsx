import "../../../assets/css/admin/common/sectionActionAdmin.css"
import { Link, useLocation } from "react-router-dom";
import { memo, } from "react";
function SectionActionAdmin(props) {
  const {itemAction} = props;
  const location = useLocation();
  return (
    <>
      <div className="main-content-action">
        <div className="container-fluid container-content-action">
          <div className="row">
            <div className="col-6 col-md-6 d-flex justify-content-start ">
              <Link to={`${location.pathname}/add`}  style={{ display: itemAction.add.style.display }}><button type="button"><i className={itemAction.add.icon} />{itemAction.add.name}</button>
              </Link>
            </div>
            <div className="col-6 col-md-6 d-flex justify-content-end">
              <button type="button" style={{ display: itemAction.excel.style.display }}><i className={itemAction.excel.icon} />{itemAction.excel.name}</button>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
export default memo(SectionActionAdmin);