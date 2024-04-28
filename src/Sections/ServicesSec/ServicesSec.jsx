import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { SectionWrapper } from '../../Components';
import './ServicesSec.css';

const ServicesSec = () => {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [error, setError] = useState(null);

    // Define video constraints for the back camera
    const videoConstraints = {
        width: 300,
        height: 200,
        facingMode: "environment", // 'user' for front and 'environment' for back camera
    };

    const capture = React.useCallback(() => {
        if(webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setImgSrc(imageSrc);
        } else {
            setError('No webcam found.');
        }
    }, [webcamRef, setImgSrc]);

    return (
        <>
            <div className="ServicesSec" id='Services'>
                <SectionWrapper>
                    <div className="takenPhotoWrapper">
                        <Webcam
                            audio={false}
                            height={videoConstraints.height}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={videoConstraints.width}
                            videoConstraints={videoConstraints}
                            onUserMediaError={() => setError('Webcam Access Denied!')}
                        />
                        <button onClick={capture}>Capture photo</button>
                        {error && <span style={{color:"red"}}>{error}</span>}
                    </div>

                    <div className="infoContainer">
                        <div className="partOneWrapper">
                            <div className="imgInfoWrapper">
                                {imgSrc && (
                                    <img
                                        className='webcamImg'
                                        src={imgSrc}
                                        alt="Captured"
                                        width={200}
                                    />
                                )}
                            </div>
                            <div className="name">
                                Chicken Bacon Ranch Pizza
                            </div>
                        </div>
                    </div>
                </SectionWrapper>
            </div>
        </>
    );
}

export default ServicesSec;
