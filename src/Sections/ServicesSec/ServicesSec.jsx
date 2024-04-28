import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { SectionWrapper } from '../../Components'
import pizza from '../../Assets/Images/Pizza.jpg'
import './ServicesSec.css'




const ServicesSec = () => {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [error, setError] = useState(null);

    const capture = React.useCallback(() => {
    if(webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    } else {
        setError('No webcam found.');
        console.log(error);
    }
    }, [webcamRef, setImgSrc, error]);
    return (
        <>
        <div className="ServicesSec" id='Services'>
            <SectionWrapper>
                <div className="takenPhotoWrapper">
                    <Webcam
                    className='webcam'
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    onUserMediaError={() => setError('Webcam Access Denied!')}
                    />
                    <button onClick={capture}>Capture photo</button>
                    {error && <span style={{color:"red"}}>{error}</span>}
                    {imgSrc && (
                        <img
                        src={imgSrc}
                        alt="Captured"
                        />
                    )}
                </div>

                <div className="infoContainer">
                    <div className="partOneWrapper">
                        <div className="imgInfoWrapper">
                            <img 
                            src={pizza} 
                            alt="Chicken Bacon Ranch Pizza" 
                            width={200}
                            />
                        </div>
                        <div className="name">
                            Chicken Bacon Ranch Pizza
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </div>
        </>
    )
}

export default ServicesSec