import { useEffect, useRef, useState } from "react";
import "../../../assets/css/header/headerNotification/headerNotification.css"
function HeaderNotification() {
    const [isModalNotificationVisible, setIsModalNotificationVisible] = useState(false);
    const notifyHeaderRef = useRef(null);
    const notifyHeaderModalRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (notifyHeaderRef.current && !notifyHeaderRef.current.contains(event.target)) {
                setIsModalNotificationVisible(false);
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const handleNotificationHeaderClick = () => {
        if (isModalNotificationVisible) {
            notifyHeaderModalRef.current.style.display = 'none';
            setIsModalNotificationVisible(false);
        } else {
            notifyHeaderModalRef.current.style.display = 'block';
            setIsModalNotificationVisible(true);
        }
        console.log(isModalNotificationVisible)
    };
    return (
        <li className="nav-item  header-notification" ref={notifyHeaderRef} >
            <i className="fa-regular fa-bell  " onClick={handleNotificationHeaderClick} />
            <div className="header-notification-numbers  translate-middle badge rounded-circle">15</div>
            
            <div className="header-notification-modal" style={{ display: isModalNotificationVisible ? 'block' : 'none' }} ref={notifyHeaderModalRef}>
                <div className="d-flex justify-content-between header-notification-modal-header">
                    <div className="header-notification-modal-title">Thông báo</div>
                    <div className="header-notification-modal-read">Đánh dâu đã đọc tất cả</div>
                </div>
                <hr />
                <div className="card card-notification">
                    <div className="card-header container-header-notification">
                        <div className="card-title">5 ngày trước</div>
                    </div>
                    <div className="card-body card-body-notification-content">
                        <div className="card-body-notification-content-title">
                            Giảm giá
                        </div>
                        <div className="card-body-notification-content-description">
                            xin thông báo hiện Shop KHÔNG có chương trình tri ân khách hàng nào bằng việc tặng
                            nước hoa,
                            quà.
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="card card-notification">
                    <div className="card-header container-header-notification">
                        <div className="card-title">5 ngày trước</div>
                    </div>
                    <div className="card-body card-body-notification-content">
                        <div className="card-body-notification-content-title">
                            Giảm giá
                        </div>
                        <div className="card-body-notification-content-description">
                            xin thông báo hiện Shop KHÔNG có chương trình tri ân khách hàng nào bằng việc tặng
                            nước hoa,
                            quà.
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="card-notification-seen-all d-flex justify-content-center">
                    Xem tất cả thông báo !
                </div>
            </div>
        </li>
    )
}
export default HeaderNotification;