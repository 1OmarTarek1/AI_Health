import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { SectionWrapper } from '../../Components';
import { FaCamera, FaFireAlt } from "react-icons/fa";
import { FaDumbbell, FaRadiation, FaShieldHalved, FaUpload, FaVideoSlash, FaXmark } from 'react-icons/fa6';

import './ServicesSec.css';
import './Media.css';
import './Webcam.css';

const ServicesSec = () => {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [error, setError] = useState(null);
    const [uploadedImg, setUploadedImg] = useState(null);
    const [isWebcamActive, setIsWebcamActive] = useState(false);

    // mobile camera 
    const openNativeCameraApp = () => {
        // Redirect user to the mobile app with deep linking
        window.location.href = 'yourmobileapp://open-camera';
    };

    // Define video constraints for the back camera
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "environment",
    };

    const capture = React.useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setImgSrc(imageSrc);
            setUploadedImg(null); // Clear any existing uploaded image
            setIsWebcamActive(false); // Turn off the webcam after capturing the photo
        } else {
            setError('No webcam found.');
        }
    }, [webcamRef, setImgSrc, setIsWebcamActive]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0]; // Get the first file only
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImg(reader.result);
                setImgSrc(null); // Clear any existing captured image
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
                                            onUserMediaError={() => setError('Access Denied!')}
                                        />
                                        {error && <div className='webcamErr'>
                                            <span>
                                                {error}
                                            </span>
                                            <FaVideoSlash />
                                        </div>}
                                        <button className='screenBtn' onClick={capture}>
                                            <FaCamera />
                                        </button>
                                    </div>
                                </>
                            )}
                            <div className="WebBtnContainer">
                                <button className='mainWebcamBtn' onClick={toggleWebcam}>
                                    {
                                    isWebcamActive 
                                    ?<> <FaCamera /> <span>Off</span> </> 
                                    :<> <FaCamera /> <span>On</span>  </>
                                    }
                                </button>
                                <input className='upload' id='file-input' type="file" accept="image/*" onChange={handleImageUpload} />
                                <label id="uploadLabel" htmlFor="file-input">
                                    <FaUpload />
                                    <span>Upload</span>
                                </label>
                                <div>
                                    <button onClick={openNativeCameraApp}>Open Native Camera App</button>
                                </div>
                            </div>
                        </div>
                        <div className="infoContainer">
                            <div className="partOneWrapper">
                                <div className="imgInfoWrapper">
                                    {imgSrc && (
                                        <img
                                        className='webcamImg mainImg'
                                        src={imgSrc}
                                        alt="Captured"
                                        width={200}
                                        onError={() => setError('Failed to load the captured image.')}
                                        />
                                    )}
                                    {uploadedImg && (
                                        <img
                                        className='uploadedImg mainImg'
                                        src={uploadedImg}
                                        alt="Uploaded"
                                        width={100}
                                        onError={() => setError('Failed to load the uploaded image.')}
                                        />
                                    )}
                                </div>
                                <div className="textWrapper">
                                    <div className="foodName">
                                        Chicken Bacon Ranch Pizza
                                    </div>
                                    <div className="foodDis">
                                        Smokey bacon, pieces of chicken, 
                                        gooey melty cheese,
                                        and creamy ranch were the perfect 
                                        combo to pile on a chewy crust!
                                    </div>
                                </div>
                            </div>

                            <ul className="foodDetails">
                                <li className="detailItem">
                                    <div className="miniTitle">
                                        <FaFireAlt style={{color:"Red"}} />
                                        <span>Calories</span>
                                    </div>
                                    <div className="titleInfo">
                                        800cal
                                    </div>
                                </li>
                                <li className="detailItem">
                                    <div className="miniTitle">
                                        <FaDumbbell style={{color:"silver"}} />
                                        <span>Protein</span>
                                    </div>
                                    <div className="titleInfo">
                                        100gm
                                    </div>
                                </li>
                                <li className="detailItem">
                                    <div className="miniTitle">
                                        <FaRadiation style={{color:"yellow"}} /> 
                                        <span>Fats</span>
                                    </div>
                                    <div className="titleInfo">
                                        50gm
                                    </div>
                                </li>
                                <li className="detailItem">
                                    <div className="miniTitle">
                                        <FaShieldHalved style={{color:"lightGreen"}}/>
                                        <span>Healthy</span>
                                    </div>
                                    <div className="titleInfo">
                                        <FaXmark style={{color:"red"}}/>
                                    </div>
                                </li>
                            </ul>

                        </div>
                </SectionWrapper>
            </div>
        </>
    );
}

export default ServicesSec;



