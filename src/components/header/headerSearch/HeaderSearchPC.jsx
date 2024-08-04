import { memo, useEffect, useRef, useState } from "react";
import "../../../assets/css/header/headerSearch/headerSearchPC.css"
function HeaderSearchPC() {
  const [isModalSearchVisible, setIsModalSearchVisible] = useState(false);
  const searchHeaderRef = useRef(null);
  const searchHeaderModalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchHeaderRef.current && !searchHeaderRef.current.contains(event.target)) {
        setIsModalSearchVisible(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSearchHeaderClick = () => {
    if (isModalSearchVisible) {
      searchHeaderModalRef.current.style.display = 'none';
      setIsModalSearchVisible(false);
    } else {
      searchHeaderModalRef.current.style.display = 'block';
      setIsModalSearchVisible(true);
    }
  };
  return (
      <li className="header-search nav-item " ref={searchHeaderRef}>
        <i className="header-search-show fa-solid fa-magnifying-glass  " onClick={handleSearchHeaderClick} />
        <div className="header-search-input   align-items-center" style={{ display: isModalSearchVisible ? 'block' : 'none' }} ref={searchHeaderModalRef}>
          {/* <div className="d-flex align-items-center">
            <input className="header-search-input-enter form-control " />
            <div className="header-search-input-press ">
              <i className="fa-solid fa-magnifying-glass fa-lg" />
            </div>
          </div> */}
          <div className="input-group mb-3">
            <input type="text" className="header-search-input-enter form-control" placeholder="Nhập tên sản phẩm" aria-label="Recipient's username" aria-describedby="basic-addon2" />
            <div className="input-group-append ">
              <button className="header-search-input-press" type="button">
                <i className="fa-solid fa-magnifying-glass fa-lg" />
              </button>
            </div>
          </div>
        </div>
      </li>
  )
}
export default memo(HeaderSearchPC);