import { useEffect, useRef, useState } from "react";
import "../../../assets/css/header/headerCart/headerCart.css"
function HeaderCart() {
    const [isModalCartVisible, setIsModalCartVisible] = useState(false);
    const cartHeaderRef = useRef(null);
    const cartHeaderModalRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (cartHeaderRef.current && !cartHeaderRef.current.contains(event.target)) {
                setIsModalCartVisible(false);
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleCartHeaderClick = () => {
        if (isModalCartVisible) {
            cartHeaderModalRef.current.style.display = 'none';
            setIsModalCartVisible(false);
        } else {
            cartHeaderModalRef.current.style.display = 'block';
            setIsModalCartVisible(true);
        }
    };
    return (
            <li className="nav-item  header-cart " ref={cartHeaderRef}>
                <i className="fa-solid fa-cart-shopping " onClick={handleCartHeaderClick} />
                <div className="header-cart-numbers  translate-middle badge rounded-circle">15</div>
                <div className="header-cart-modal" style={{ display: isModalCartVisible ? 'block' : 'none' }} ref={cartHeaderModalRef}>
                    <div className="row header-cart-modal-head">
                        <div className="col-4">Sản phẩm</div>
                        <div className="col-4">Số lượng</div>
                        <div className="col-4">Số tiền</div>
                    </div>
                    <hr />
                    <div className="card card-cart">
                        <div className="row card-cart-item">
                            <div className="col-4">
                                <img src="logo-sky.png" alt="" />
                            </div>
                            <div className="col-4 d-flex align-items-center justify-content-center">x2</div>
                            <div className="col-4 d-flex align-items-center justify-content-center">790.000VNĐ</div>
                        </div>
                    </div>
                    <div className="card card-cart">
                        <div className="row card-cart-item">
                            <div className="col-4">
                                <img src="logo-sky.png" alt="" />
                            </div>
                            <div className="col-4 d-flex align-items-center justify-content-center">x2</div>
                            <div className="col-4 d-flex align-items-center justify-content-center">790.000VNĐ</div>
                        </div>
                    </div>
                    <div className="row header-cart-modal-total-money py-2">
                        <div className="col-4 text-center fw-500">Tổng tiền</div>
                        <div className="col-4" />
                        <div className="col-4 text-center">79.000.000VNĐ</div>
                    </div>
                    <hr />
                    <div className="card-cart-seen-all d-flex align-items-center justify-content-center ">
                        Xem tất cả !
                    </div>
                </div>
            </li>
    )
}
export default HeaderCart;