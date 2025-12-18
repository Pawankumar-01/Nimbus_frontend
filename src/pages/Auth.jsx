import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, registerUser, refreshToken } from "../api/auth";

export default function Auth() {
    const [output, setOutput] = useState("Waiting for action...");
    const [loginType, setLoginType] = useState("user");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const data = await login(email, password, loginType);

        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("email", email);

        // ✅ SPA-safe navigation
        navigate("/dashboard");
    };

    const handleRegister = async () => {
        const email = document.getElementById("regEmail").value;
        const password = document.getElementById("regPassword").value;
        const role = document.getElementById("regRole").value;

        const data = await registerUser(email, password, role);
        setOutput(JSON.stringify(data, null, 2));
    };

    const handleRefresh = async () => {
        const token = document.getElementById("refreshTokenInput").value;
        const data = await refreshToken(token);
        setOutput(JSON.stringify(data, null, 2));
    };

    return (
        <>
            <h1>Nimbus Authentication</h1>

            <div className="container">
                <h2>Select Login Type</h2>
                <select value={loginType} onChange={e => setLoginType(e.target.value)}>
                    <option value="user">User Login</option>
                    <option value="admin">Admin Login</option>
                </select>
            </div>

            <div className="container">
                <h2>Login</h2>
                <input id="loginEmail" placeholder="Email" />
                <input id="loginPassword" type="password" placeholder="Password" />
                <button onClick={handleLogin}>Login</button>
            </div>

            <div className="container">
                <h2>Register</h2>
                <input id="regEmail" placeholder="Email" />
                <input id="regPassword" type="password" />
                <select id="regRole">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button onClick={handleRegister}>Register</button>
            </div>

            <div className="container">
                <h2>Refresh Token</h2>
                <input id="refreshTokenInput" placeholder="Enter Refresh Token" />
                <button onClick={handleRefresh}>Refresh</button>
            </div>

            <div className="output">{output}</div>
        </>
    );
}
