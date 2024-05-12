
import { useState } from 'react';
import      { FaArrowUp } from 'react-icons/fa';
import './ToTopBtn.css'




const ToTopBtn = () => {
    //START scroll to top page button
    const [visible, setVisible] = useState(false)
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if      ( scrolled > 700  ) { setVisible( true  )} 
        else if ( scrolled <= 700 ) { setVisible( false )}
        };
    const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }) };
    window.addEventListener('scroll', toggleVisible);
    //END scroll to top page button
    return (
        <>
            <button 
            className  =  'arrow-btn' 
            onClick    =  {scrollToTop} 
            style      =  {{bottom: visible ? '3%' : '-50px'}}>
                <FaArrowUp />
            </button>
        </>
    )
}

export default ToTopBtn