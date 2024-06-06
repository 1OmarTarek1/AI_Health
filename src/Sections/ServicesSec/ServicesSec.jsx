import axios from 'axios';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import { SectionWrapper } from '../../Components';
import { FaCamera, FaVideo, FaVideoSlash, FaUpload, FaShieldHalved } from 'react-icons/fa6';
import { FaFireAlt, FaDumbbell, FaRadiation  } from 'react-icons/fa';

import './ServicesSec.css';
import './Media.css';
import './Webcam.css';

const ServicesSec = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [error, setError] = useState(null);
    const [isWebcamActive, setIsWebcamActive] = useState(false);
    const [predictions, setPredictions] = useState([]);
    const [foodName, setFoodName] = useState("...");
    const [uploadedImage, setUploadedImage] = useState(null);
    const [resultImage, setResultImage] = useState(null);
    const [foodData, setFoodData] = useState({});


    // Define video constraints for the back camera
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "environment",
    };

    const predictImage = async (imageSrc) => {
        const formData = new FormData();
        const blob = await fetch(imageSrc).then((res) => res.blob());
        formData.append('file', blob, 'image.png');
    
        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            const { predictions } = data;
            setPredictions(predictions);
            const foodClassName = predictions[0].class; // Get the class from predictions
            setFoodName(foodClassName); // Set the food name (class) in the state
    
            // Make a request to your API with Axios
            axios.get(`http://127.0.0.1:8000/getfit/get-food-by-name/${foodClassName}/`)
                .then(response => {
                    // Handle API response data
                    console.log(response.data);
                    // Update state with the received food data
                    setFoodData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching food data:', error);
                });
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    
    

    const captureAndPredict = useCallback(async () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                await predictImage(imageSrc);
            }
        } else {
            setError('No webcam found.');
        }
    }, [webcamRef]);

    const handleImageUploadAndPredict = async (imageSrc) => {
        setUploadedImage(imageSrc);
        const img = new Image();
        img.onload = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                canvas.width = img.width;
                canvas.height = img.height;
                const context = canvas.getContext('2d');
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, 0, 0, img.width, img.height);
                drawBoxes(context); // Draw boxes after drawing the image
                const resultImageURL = canvas.toDataURL('image/png');
                setResultImage(resultImageURL);
            }
            predictImage(imageSrc);
        };
        img.src = imageSrc;
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleImageUploadAndPredict(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        let intervalId;
        if (isWebcamActive) {
            intervalId = setInterval(captureAndPredict, 1000); // Capture every second
        } else {
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
    }, [isWebcamActive, captureAndPredict]);

    const toggleWebcam = () => {
        setIsWebcamActive(!isWebcamActive);
    };

    const drawBoundingBoxes = () => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const context = canvas.getContext('2d');
        const video = webcamRef.current && webcamRef.current.video;
        const image = uploadedImage ? new Image() : null;

        if (!context || (!video && !image)) {
            return;
        }

        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (uploadedImage && image) {
            image.onload = () => {
                context.drawImage(image, 0, 0, canvas.width, canvas.height);
                drawBoxes(context);
                const resultImageURL = canvas.toDataURL('image/png');
                setResultImage(resultImageURL);
            };
            image.src = uploadedImage;
        } else if (video) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            drawBoxes(context);
            const resultImageURL = canvas.toDataURL('image/png');
            setResultImage(resultImageURL);
        }
    };


    const drawBoxes = (context) => {
        predictions.forEach(prediction => {
            const { x, y, w, h, class: className, confidence } = prediction;
    
            // Draw bounding box
            context.beginPath();
    
            // Translate the context
            const translateX = x - 0.5 * w;
            const translateY = y - 0.5 * h;
            context.translate(translateX, translateY);
    
            context.rect(0, 0, w, h);
            context.lineWidth = 7;
            context.strokeStyle = '#8b92ee';
            context.fillStyle = '#8b92ee';
            context.stroke();
             // Set font size
            context.font = '20px Arial';
            context.fillText(`${className} (${(confidence * 100).toFixed(2)}%)`, 0, -5);
    
            // Reset the transformation
            context.setTransform(1, 0, 0, 1, 0, 0);
        });
    }; 
    
    

    useEffect(() => {
        drawBoundingBoxes();
    }, [predictions, uploadedImage]);

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
                                    {/* <canvas ref={canvasRef} className="boundingBoxCanvas img-fluid" /> */}
                                    {error && <div className='webcamErr'>
                                        <span>
                                            {error}
                                        </span>
                                        <FaVideoSlash />
                                    </div>}
                                </div>
                            </>
                        )}
                        <div className="WebBtnContainer">
                            <button className='mainWebcamBtn' onClick={toggleWebcam}>
                                {isWebcamActive ? <FaVideoSlash /> : <FaVideo />}
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
                        </div>
                    </div>
                    <div className="infoContainer">
                        <div className="partOneWrapper">
                            <div className="imgInfoWrapper">
                            {uploadedImage && (
                                <>
                                    {resultImage ? 
                                        <img src={resultImage} alt="Result" className="resultImage" />
                                        :
                                        <img src={uploadedImage} alt="Uploaded" className="uploadedImage" />
                                    }
                                    <canvas ref={canvasRef} className="boundingBoxCanvas" style={{ display: 'none' }} />
                                </>
                            )}
                            </div>
                            <div className="textWrapper">
                                <div className="foodName">
                                    {foodData.FoodName}
                                </div>
                                <div className="foodDis">
                                    {foodData.TheDescription}
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
                                    {foodData.Calories}
                                </div>
                            </li>
                            <li className="detailItem">
                                <div className="miniTitle">
                                    <FaDumbbell style={{color:"silver"}} />
                                    <span>Protein</span>
                                </div>
                                <div className="titleInfo">
                                    {foodData.Protein}
                                </div>
                            </li>
                            <li className="detailItem">
                                <div className="miniTitle">
                                    <FaRadiation style={{color:"yellow"}} /> 
                                    <span>Fats</span>
                                </div>
                                <div className="titleInfo">
                                    {foodData.Fats}
                                </div>
                            </li>
                            <li className="detailItem">
                                <div className="miniTitle">
                                    <FaShieldHalved style={{color:"lightGreen"}}/>
                                    <span>Carbs</span>
                                </div>
                                <div className="titleInfo">
                                    {foodData.Carbs}
                                </div>
                            </li>
                            <li className="detailItem">
                                <div className="miniTitle">
                                    <span>Link</span>
                                </div>
                                <div className="titleInfo">
                                    <a href={foodData.YoutubeLink}>Watch video</a>
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
