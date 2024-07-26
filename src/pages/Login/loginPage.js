import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import "./loginpage.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useLogin();
    const navigate = useNavigate();

    const handleSubmit = () => {
        const validation = true; 
        if (validation) {
            login({ email, password });
        } else {
            alert("Validation Failed");
        }
    };

    return (
        <div className="main-login">
            <div className="login-container">
                <div className="login-header">
                    Welcome Back!
                </div>
                <div className="login-form">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleSubmit}>Login</button>
                    <div className="main-text">
                    <text className="text-acc">Not a user?<span> </span><span className="login-click" onClick={()=>navigate("/signup")}>Sign Up</span></text>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
