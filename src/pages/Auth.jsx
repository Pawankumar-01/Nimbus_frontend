import { useState } from "react";
import { useNavigate } from "react-router-dom"; // If using React Router
// OR for Next.js: import { useRouter } from "next/router";
import { login, registerUser, refreshToken } from "../api/auth";

export default function Auth() {
    const [output, setOutput] = useState("Waiting for action...");
    const [loginType, setLoginType] = useState("user");
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate(); // React Router
    // OR for Next.js: const router = useRouter();

    const handleLogin = async () => {
        try {
            setLoading(true);
            setOutput("Logging in...");
            
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            if (!email || !password) {
                setOutput("Please enter both email and password");
                return;
            }

            const data = await login(email, password, loginType);

            // Save tokens
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            localStorage.setItem("role", data.role);
            localStorage.setItem("email", email);

            setOutput("Login successful! Redirecting...");
            
            // Use React Router navigation
            navigate("/dashboard");
            
            // OR for Next.js:
            // router.push("/dashboard");
            
            // OR if you must use window.location (full page reload):
            // window.location.href = "/dashboard";
            
        } catch (error) {
            console.error("Login error:", error);
            setOutput(`Login failed: ${error.message || "Unknown error"}`);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        try {
            setLoading(true);
            setOutput("Registering...");
            
            const email = document.getElementById("regEmail").value;
            const password = document.getElementById("regPassword").value;
            const role = document.getElementById("regRole").value;

            if (!email || !password) {
                setOutput("Please enter both email and password");
                return;
            }

            const data = await registerUser(email, password, role);
            setOutput(JSON.stringify(data, null, 2));
        } catch (error) {
            console.error("Registration error:", error);
            setOutput(`Registration failed: ${error.message || "Unknown error"}`);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        try {
            setLoading(true);
            const token = document.getElementById("refreshTokenInput").value;
            
            if (!token) {
                setOutput("Please enter a refresh token");
                return;
            }
            
            const data = await refreshToken(token);
            setOutput(JSON.stringify(data, null, 2));
        } catch (error) {
            console.error("Refresh error:", error);
            setOutput(`Refresh failed: ${error.message || "Unknown error"}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1>Nimbus Authentication</h1>

            <div className="container">
                <h2>Select Login Type</h2>
                <select value={loginType} onChange={e => setLoginType(e.target.value)} disabled={loading}>
                    <option value="user">User Login</option>
                    <option value="admin">Admin Login</option>
                </select>
            </div>

            <div className="container">
                <h2>Login</h2>
                <input id="loginEmail" placeholder="Email" disabled={loading} />
                <input id="loginPassword" type="password" placeholder="Password" disabled={loading} />
                <button onClick={handleLogin} disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                </button>
            </div>

            <div className="container">
                <h2>Register</h2>
                <input id="regEmail" placeholder="Email" disabled={loading} />
                <input id="regPassword" type="password" placeholder="Password" disabled={loading} />
                <select id="regRole" disabled={loading}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button onClick={handleRegister} disabled={loading}>
                    {loading ? "Loading..." : "Register"}
                </button>
            </div>

            <div className="container">
                <h2>Refresh Token</h2>
                <input id="refreshTokenInput" placeholder="Enter Refresh Token" disabled={loading} />
                <button onClick={handleRefresh} disabled={loading}>
                    {loading ? "Loading..." : "Refresh"}
                </button>
            </div>

            <div className="output">{output}</div>
        </>
    );
}
