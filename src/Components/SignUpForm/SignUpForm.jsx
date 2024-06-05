import { useState } from 'react';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { FaFacebookSquare, FaGoogle, FaTrashAlt } from 'react-icons/fa';
import { FaRegEnvelope, FaRegEye, FaRegEyeSlash, FaRegUser } from 'react-icons/fa6';
import axios from 'axios';
import './SignUpForm.css';
import defImg from '../../Assets/Images/no_user.png'

const SignUpForm = ({ setAuthenticated, showPassword, setShowPassword, setProfilePictureUrl }) => {
    const [username, setUsername] = useState('');
    const [emailSignValue, setEmailSignValue] = useState('');
    const [passSignValue, setPassSignValue] = useState('');
    const [passConfValue, setPassConfValue] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setProfilePictureUrl(defImg)
        localStorage.setItem('profilePictureUrl', defImg);

        // Validation logic
        if (passSignValue !== passConfValue) {
            setErrors({ confirmPassword: 'Passwords do not match' });
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/getfit/register/', {
                username        : username,
                email           : emailSignValue,
                password        : passSignValue,
                confirmPassword : passConfValue
            });

            const userID = response.data.id;
            const usernameDB = response.data.username;
            localStorage.setItem('usernameDB', usernameDB);
            localStorage.setItem('userID', userID);
            
            setMessage('User registered successfully');
            setAuthenticated(true);
            setErrors({});
            navigate("/Profile");
        } catch (error) {
            if (error.response) {
                setErrors(error.response.data);
                localStorage.clear();
            } else {
                setMessage('Something went wrong. Please try again.');
                localStorage.clear();
            }
        }
        
    };

    return (
        <form className="mainForm signUpForm" onSubmit={handleSignUp}>
            <div className="formTitle">SignUp</div>

            <div style={{ position: "relative" }}>
                <MDBInput
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    label='Username'
                    className='mainInput'
                    id='UsernameSign'
                    type='text'
                    size="lg"
                />
                <label className="labelIcn" htmlFor="UsernameSign">
                    <FaRegUser />
                </label>
                {errors.username && <p className="error">{errors.username}</p>}
            </div>

            <div style={{ position: "relative" }}>
                <MDBInput
                    value={emailSignValue}
                    onChange={(e) => setEmailSignValue(e.target.value)}
                    label='Email Address'
                    className='mainInput'
                    id='emailSign'
                    type='email'
                    size="lg"
                />
                <label className="labelIcn" htmlFor="emailSign">
                    <FaRegEnvelope />
                </label>
                {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div style={{ position: "relative" }}>
                <MDBInput
                    value={passSignValue}
                    onChange={(e) => setPassSignValue(e.target.value)}
                    label='Password'
                    className='mainInput'
                    id='passSign'
                    type={showPassword ? 'text' : 'password'}
                    size="lg"
                />
                <label
                    className="labelIcn"
                    htmlFor="passSign"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </label>
                {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <div style={{ position: "relative" }}>
                <MDBInput
                    value={passConfValue}
                    onChange={(e) => setPassConfValue(e.target.value)}
                    label='Confirm Password'
                    className='mainInput'
                    id='passConfirmSign'
                    type={showPassword ? 'text' : 'password'}
                    size="lg"
                />
                <label
                    className="labelIcn"
                    htmlFor="passConfirmSign"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </label>
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </div>

            <div className="formItem">
                <div className="logWith d-flex justify-content-center gap-1">
                    <span className='formItem'>SignUp With :</span>
                    <div className="withFacebook">
                        <FaFacebookSquare />
                    </div>
                    -
                    <div className="withGmail">
                        <FaGoogle />
                    </div>
                </div>
                <MDBBtn
                    className=''
                    outline
                    tag={"button"}
                    type='reset'
                    value={"Reset"}
                    size="sm"
                    color='info'
                    style={{ border: "1px solid", borderRadius: "0px" }}
                > <FaTrashAlt /> </MDBBtn>
                {message && <p className="error" style={{margin:"0",position:"absolute",top:"100%",fontSize:"14px"}}>{message}</p>}
            </div>

            <MDBBtn
                className='mainButton'
                tag='button'
                type='submit'
                value='Submit'
                size="lg"
            > Submit </MDBBtn>

            <div
                className='d-flex justify-content-center align-items-center gap-2'
                style={{ flexDirection: "column" }}
            >
                <div className="formItem">
                    <span className="fromLink LoginLink">
                        Already Have One !
                    </span>
                </div>
            </div>
        </form>
    );
}

export default SignUpForm;
