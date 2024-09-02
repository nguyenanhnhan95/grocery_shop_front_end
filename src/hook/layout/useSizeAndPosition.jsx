import { memo, useEffect, useState } from "react";

const useSizeAndPosition = (ref) => {
    const [sizeAndPosition, setSizeAndPosition] = useState({
        top: 0,
        left: 0,
        height: 0,
        width: 0,
    });
    useEffect(() => {
        if (ref.current) {
            const updateSizeAndPosition = () => {
                setSizeAndPosition({
                    top: ref.current.offsetTop,
                    left: ref.current.offsetLeft,
                    height: ref.current.clientHeight,
                    width: ref.current.clientWidth,
                });
            }
            updateSizeAndPosition();
            window.addEventListener('resize', updateSizeAndPosition);

            return () => {
                window.removeEventListener('resize', updateSizeAndPosition);
            };
        }

    }, [ref]);

    return sizeAndPosition;
}
export default useSizeAndPosition;