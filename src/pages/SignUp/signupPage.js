import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import "./signuppage.css"
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup } = useSignup();
    const navigate = useNavigate();

    const handleSubmit = () => {
        const validation = true;
        if (validation) {
            signup({ email, password });
        } else {
            alert("Validation Failed");
        }
    };

    return (
        <div className="main-signup">
            <div className="main-signup1">
                <div className="main-cred">
                    <div className="main-headtext">
                        Welcome To X-Drive
                    </div>
                    <div className="main-data">
                        <text>Email</text>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <text>Password</text>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={handleSubmit}>Sign Up</button>
                        <text className="text-acc">Already have an account?<span>     </span><span className="login-click" onClick={()=>navigate("/login")}>Login</span></text>
                    </div>
                </div>
                <div className="main-img">
                    <img className="img-src" src="https://img.lovepik.com/photo/45009/7675.jpg_wh860.jpg"/>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
