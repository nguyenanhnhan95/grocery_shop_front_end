import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function SlideShow() {
  const scrollContainerRef = useRef(null);
  const handleNextButtonClick = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.style.scrollBehavior = 'smooth';
      scrollContainer.scrollLeft += scrollContainer.clientWidth;
    }
  };

  const handleBackButtonClick = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.style.scrollBehavior = 'smooth';
      scrollContainer.scrollLeft -= scrollContainer.clientWidth;
    }
  };
  if (window.location.pathname !== "/home") {
    console.log(window.location.pathname)
    return (
      <></>
    );
  }
  return (
    <>
      <div className="header__gallery-pc">
        <button id="backBth" className="header__gallery-button header__gallery-button__left" onClick={handleBackButtonClick}><i className="fa-solid fa-chevron-left" /></button>
        <div className="header__gallery-pc-img__wrap" ref={scrollContainerRef}>
          <div className="header__gallery-pc-img">
            <img src="https://thanhnien.mediacdn.vn/Uploaded/linhsan/2016_03_17/shopping_IGEJ.jpg" />
          </div>
          <div className="header__gallery-pc-img">
            <img src="https://o.rada.vn/data/image/2021/08/16/Mua-sam.jpg" />
          </div>
          <div className="header__gallery-pc-img">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJmTQAT8mKt7KT5GiBnwwTa1ksRAelT3g7dIWBJJ3W-2tXIR-RFxAYhru5UhDUhLFyYGg&usqp=CAU" />
          </div>
        </div>
        <button id="nextBth" className="header__gallery-button header__gallery-button__right" onClick={handleNextButtonClick}><i className="fa-solid fa-chevron-right" /></button>
      </div>
    </>
  )
}
export default SlideShow;