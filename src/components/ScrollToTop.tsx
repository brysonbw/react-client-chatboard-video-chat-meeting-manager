import React, { useState, useEffect } from "react";
import { HiArrowCircleUp } from "react-icons/hi";


const ScrollToTop = () => {
    const [showBtn, setShowBtn] = useState(false);

    // listen when scroll
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                setShowBtn(true);
            } else {
                setShowBtn(false);
            }
        });
    }, []);

    // scroll to top function
    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    return (
        <div className="top-to-btm">
            {" "}
            {showBtn && (
                
                     <HiArrowCircleUp
                    className="icon-position icon-style"
                    onClick={scrollUp}
                />
            )}{" "}
        </div>
    );
};
export default ScrollToTop;