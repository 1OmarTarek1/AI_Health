import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { SectionWrapper } from '../../Components';
import { FaCamera } from "react-icons/fa";
import './ServicesSec.css';

const ServicesSec = () => {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [error, setError] = useState(null);
    const [uploadedImg, setUploadedImg] = useState(null);
    const [isWebcamActive, setIsWebcamActive] = useState(false);

    // Define video constraints for the back camera
    const videoConstraints = {
        width: "100%",
        height: "300px",
        facingMode: "environment",
    };

    const capture = React.useCallback(() => {
        if(webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setImgSrc(imageSrc);
        } else {
            setError('No webcam found.');
        }
    }, [webcamRef, setImgSrc]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImg(reader.result);
            };
            reader.onerror = () => {
                setError('Failed to load the image.');
            };
            reader.readAsDataURL(file);
        } else {
            setError('No file selected.');
        }
    };

    const toggleWebcam = () => {
        setIsWebcamActive(!isWebcamActive);
    };

    return (
        <>
            <div className="ServicesSec" id='Services'>
                <SectionWrapper>
                    <div className="takenPhotoWrapper">
                        {isWebcamActive && (
                            <>
                                <div className="webcamContainer">
                                    <Webcam
                                        className='webcam'
                                        audio={false}
                                        height={videoConstraints.height}
                                        ref={webcamRef}
                                        screenshotFormat="image/jpeg"
                                        width={videoConstraints.width}
                                        videoConstraints={videoConstraints}
                                        onUserMediaError={() => setError('Webcam Access Denied!')}
                                    />
                                    <button className='screenBtn' onClick={capture}>
                                        <FaCamera />
                                    </button>
                                </div>
                            </>
                        )}
                        <button onClick={toggleWebcam}>
                            {isWebcamActive ? 'Turn off camera' : 'Turn on camera'}
                        </button>
                        <input type="file" accept="image/*" onChange={handleImageUpload} />
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
                                    onError={() => setError('Failed to load the captured image.')}
                                    />
                                )}
                                {uploadedImg && (
                                    <img
                                    className='uploadedImg'
                                    src={uploadedImg}
                                    alt="Uploaded"
                                    width={100}
                                    onError={() => setError('Failed to load the uploaded image.')}
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



// facingMode: "user", // 'user' for front and 'environment' for back camera