import { memo, useCallback, useEffect, useRef, useState } from "react"
import "./../../assets/css/layout/backToTopScroll.css"
function BackToTopScroll() {
    const [showButtonBack, setShowButtonBack] = useState(false)
    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    useEffect(() => {
        const handleScroll = () => {
            setShowButtonBack(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup sự kiện khi component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <button className="back-to-top-scroll  translate-middle badge rounded-pill"
            style={{ display: showButtonBack === true ? 'block' : 'none' }} onClick={() => scrollUp()}>
            <i className="fa-solid fa-chevron-up"></i>
        </button>
    )
}
export default memo(BackToTopScroll)