import { memo } from "react";
import "../../../assets/css/admin/dashBoard/dashBoard.css"
function DashBoard() {
  return (
    // <div className="container-fluid container-body-admin container-dashboard">
    //   <div className="row dashboard-section">
    //     <div className="col-12 col-sm-6 col-md-3 ">
    //       <div className="card">
    //         <div className="card-body d-flex ">
    //           <div className="dashboard-avatar-content bg-purple">
    //             <i className="fa-solid fa-star" />
    //           </div>
    //           <div className="dashboard-title-content">
    //             <div className="dashboard-title-content-head">
    //               57 Đơn mới
    //             </div>
    //             <div className="dashboard-title-content-bottom">
    //               Đang chờ xử lý
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-12 col-sm-6 col-md-3">
    //       <div className="card">
    //         <div className="card-body d-flex ">
    //           <div className="dashboard-avatar-content bg-blue">
    //             <i className="fa-solid fa-stop" />
    //           </div>
    //           <div className="dashboard-title-content">
    //             <div className="dashboard-title-content-head">
    //               57 Đơn
    //             </div>
    //             <div className="dashboard-title-content-bottom">
    //               Tạm dừng
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-12 col-sm-6 col-md-3">
    //       <div className="card">
    //         <div className="card-body d-flex ">
    //           <div className="dashboard-avatar-content bg-orange">
    //             <i className="fa-solid fa-dumpster-fire" />
    //           </div>
    //           <div className="dashboard-title-content">
    //             <div className="dashboard-title-content-head">
    //               57 Sản phẩm
    //             </div>
    //             <div className="dashboard-title-content-bottom">
    //               Đã hết hàng
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-12 col-sm-6 col-md-3">
    //       <div className="card">
    //         <div className="card-body d-flex ">
    //           <div className="dashboard-avatar-content bg-green">
    //             <i className="fa-solid fa-arrow-trend-down" />
    //           </div>
    //           <div className="dashboard-title-content">
    //             <div className="dashboard-title-content-head">
    //               57 Sản phảm
    //             </div>
    //             <div className="dashboard-title-content-bottom">
    //               Đang giảm giá
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="row dashboard-statistic ">
    //     <div className="col-12 col-sm-12 col-md-6">
    //       <div className="card">
    //         <div className="card-header d-flex justify-content-between">
    //           <div className="dashboard-statistic-total-sale-title">
    //             Tổng số đơn hàng đã bán
    //           </div>
    //           <div className="dashboard-statistic-total-sale-date">
    //             <input type="date" />
    //           </div>
    //         </div>
    //         <div className="card-body">
    //           <img style={{ width: '100%', height: '250px' }} alt="" src="https://viqualita.com/wp-content/uploads/2019/01/image-27-425x270-1.png" />
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-12 col-sm-6  col-md-3">
    //       <div className="card">
    //         <div className="card-header d-flex justify-content-between">
    //           <div className="dashboard-item-total-sale-title">
    //             Tổng số đơn hàng
    //           </div>
    //           <div className="dashboard-item-total-sale-date">
    //             <input type="date" />
    //           </div>
    //         </div>
    //         <div className="card-body">
    //           <img style={{ width: '100%', height: '250px' }} alt="" src="https://viqualita.com/wp-content/uploads/2019/01/image-27-425x270-1.png" />
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-12 col-sm-6  col-md-3">
    //       <div className="card">
    //         <div className="card-header d-flex justify-content-between">
    //           <div className="dashboard-item-total-sale-title">
    //             Khách hàng mới
    //           </div>
    //           <div className="dashboard-item-total-sale-date">
    //             <input type="date" />
    //           </div>
    //         </div>
    //         <div className="card-body">
    //           <img style={{ width: '100%', height: '250px' }} alt="" src="https://viqualita.com/wp-content/uploads/2019/01/image-27-425x270-1.png" />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="row dashboard-feedback-customer">
    //     <div className="col-12 col-md-6">
    //       <div className="card">
    //         <div className="card-header ">
    //           Phản hồi mới nhất
    //         </div>
    //         <div className="card-body">
    //           <table className="table">
    //             <thead>
    //               <tr>
    //                 <th scope="col">First</th>
    //                 <th scope="col">Last</th>
    //                 <th scope="col">Handle</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               <tr>
    //                 <td>Mark</td>
    //                 <td>Otto</td>
    //                 <td>@mdo</td>
    //               </tr>
    //               <tr>
    //                 <td>Jacob</td>
    //                 <td>Thornton</td>
    //                 <td>@fat</td>
    //               </tr>
    //               <tr>
    //                 <td colSpan={2}>Larry the Bird</td>
    //                 <td>@twitter</td>
    //               </tr>
    //             </tbody>
    //           </table>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-12 col-md-6">
    //       <div className="card">
    //         <div className="card-header ">
    //           Xử lý phản hồi sản phẩm
    //         </div>
    //         <div className="card-body">
    //           <table className="table">
    //             <thead>
    //               <tr>
    //                 <th scope="col">First</th>
    //                 <th scope="col">Last</th>
    //                 <th scope="col">Handle</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               <tr>
    //                 <td>Mark</td>
    //                 <td>Otto</td>
    //                 <td>@mdo</td>
    //               </tr>
    //               <tr>
    //                 <td>Jacob</td>
    //                 <td>Thornton</td>
    //                 <td>@fat</td>
    //               </tr>
    //               <tr>
    //                 <td colSpan={2}>Larry the Bird</td>
    //                 <td>@twitter</td>
    //               </tr>
    //             </tbody>
    //           </table>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <></>
  )
}
export default memo(DashBoard);