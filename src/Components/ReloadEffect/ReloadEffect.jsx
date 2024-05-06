import './ReloadEffect.css'
import { useEffect } from "react";
import { useLocation } from "react-router-dom";




const ReloadEffect = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        let effect = document.querySelector(".ReloadEffect");
        if (effect) {
            effect.classList.add("animate");
            // Optionally, remove the class after animation ends
            const animationDuration = 2000; // Assuming 1 second animation
            setTimeout(() => {
                effect.classList.remove("animate");
            }, animationDuration);
        }
    }, [pathname]);
    return (
        <>
            <div className="ReloadEffect">
                <div className="part top-part"></div>
                <div className="part bottom-part"></div>
                <div className="logo-animation"></div>
            </div>
        </>
    )
}

export default ReloadEffect