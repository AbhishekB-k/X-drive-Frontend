import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import { useSelector } from "react-redux";
import useGenerateNewOtp from "../../hooks/useGenerateNewOtp";
import useVerifyOtp from "../../hooks/useVerifyOtp";
import { MuiOtpInput } from "mui-one-time-password-input";
import "./otp.css";

const OtpPage = () => {
    const { email } = useSelector((state) => state.auth);
    const [otp, setOtp] = useState("");
    const { generateNewOtp } = useGenerateNewOtp();
    const { verifyOtp } = useVerifyOtp();

    const handleSubmit = () => {
        if (otp.length < 4) {
            alert("Invalid OTP");
        } else {
            const num = parseInt(otp);
            if (num >= 1000 && num <= 9999) {
                verifyOtp(num);
            } else {
                alert("Invalid OTP. OTP must be a number");
            }
        }
    };

    const handleChange = (value) => {
        setOtp(value);
    };
  
    return (
        <>
            <Navbar />
            <div className="otp-page-container">
                <div className="otp-main">
                    <div className="otp-div-img">
                        <img
                            src="https://img.freepik.com/free-vector/hand-holding-phone-with-screen-lock-flat-vector-illustration-person-entering-pin-code-password-smartphone-safety-security-protection-concept-banner-website-design-landing-web-page_74855-24655.jpg?w=900&t=st=1721897402~exp=1721898002~hmac=ac7f1556b39a5ad3ed1d13ca801817e26c53580400591f83570ac23b99a73fe7"
                            alt="OTP Illustration"
                            className="otp-img"
                        />
                    </div>
                    <div className="otp-verify">
                        <p>Verification</p>
                        <span>Thank you for registering with us.</span>
                        <span>Please write the OTP as shared on your email:</span>
                        <span>{email}</span>
                    </div>
                    <div className="otp-input-container">
                        <MuiOtpInput
                            sx={{
                                maxWidth: "300px",
                                '& input': {
                                    width: '60px',  // Adjust width of each input box
                                    height: '40px', 
                                    border: '4px solid #088395', // Border color
                                    borderRadius: '5px', // Optional: add border-radius for rounded corners
                                },
                            }}
                            value={otp}
                            onChange={handleChange}
                            length={4}
                        />
                    </div>
                    <div className="otp-button">
                        <button onClick={handleSubmit}>Verify</button>
                    </div>
                    <div className="otp-text">
                        <text className="text-acc">Didn't Get Otp?<span> </span><span className="login-click" onClick={() => generateNewOtp()}>Resend</span></text>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OtpPage;
