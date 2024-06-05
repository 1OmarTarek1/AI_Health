import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { SectionWrapper } from '../../Components';
import { FaCamera, FaFireAlt, FaTrashAlt } from "react-icons/fa";
import { FaDumbbell, FaRadiation, FaShieldHalved, FaVideo, FaVideoSlash, FaXmark, FaUpload  } from 'react-icons/fa6';

import './ServicesSec.css';
import './Media.css';
import './Webcam.css';

const ServicesSec = () => {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [error, setError] = useState(null);
    const [uploadedImg, setUploadedImg] = useState(null);
    const [isWebcamActive, setIsWebcamActive] = useState(false);
    const [predictions, setPredictions] = useState(false);


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


    // const updateImage = async () => {
    //     if (uploadedImg) { // Check if uploadedImg exists
    //         const formData = new FormData();

    //         const response = await fetch(uploadedImg);
    //         const blob = await response.blob();
    //         formData.append('file', blob, 'image.png');


    //         // formData.append('file', uploadedImg); // Append the uploaded image directly
    
    //         // Log the FormData content
    //         console.log('FormData Content:', formData.get('file'));
    
    //         try {
    //             // Log the uploaded image before sending the request
    //             console.log('Uploaded Image:', uploadedImg);
    
    //             const response = await fetch('http://localhost:5000/predict', {
    //                 method: 'POST',
    //                 body: formData
    //             });
    //             const data = await response.json();
    //             console.log(data);
    //             // Handle the predictions received from Flask
    //         } catch (error) {
    //             console.error('Error:', error);
    //         }
    //     } else {
    //         setError('No image available to update.');
    //     }
    // };
    

    const updateImage = async () => {
        let imageToUse = uploadedImg || imgSrc;
    
        if (!imageToUse) {
            // Capture a new photo if neither uploadedImg nor imgSrc is available
            capture();
            return; // Exit the function and wait for the new photo to be captured
        }
    
        const formData = new FormData();
    
        // Convert the data URL to a Blob
        const blob = await fetch(imageToUse).then((res) => res.blob());
        formData.append('file', blob, 'image.png');
    
        // Log the FormData content
        console.log('FormData Content:', formData.get('file'));
    
        try {
            // Log the image before sending the request
            console.log('Image to Use:', imageToUse);
    
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            console.log(data);
            // Handle the predictions received from Flask
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    
    

    
    const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };
    

    const clearData = () => {
        setImgSrc(null);
        setUploadedImg(null);
        setError(null);
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
                            <button onClick={updateImage}>Update</button>
                            <button className='mainWebcamBtn' onClick={toggleWebcam}>
                                { isWebcamActive ? <FaVideoSlash />  : <FaVideo /> }
                                <span>WebCam</span>
                            </button>

                            <input 
                            className='upload' 
                            id='file-input' 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageUpload} 
                            />
                            <label id="uploadLabel" htmlFor="file-input">
                                <FaCamera /> | <FaUpload />    
                            </label>

                            {(imgSrc || uploadedImg) && (
                                <button className="clearBtn" onClick={clearData} style={{width:"fit-content", height:"30.8px"}}>
                                    <FaTrashAlt />
                                </button>
                            )}
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



