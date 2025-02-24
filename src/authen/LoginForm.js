import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import authenServices from "../services/authenServices";

function LoginForm() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        authenServices.login({ username, password });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="text-center text-primary">Login</h3>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter username"
                            required
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="rememberMe">
                                Remember me
                            </label>
                        </div>
                        <a href="#" className="text-decoration-none">
                            Forgot password?
                        </a>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
                <p className="text-center mt-3">
                    Don't have an account?{" "}
                    <a href="/register" className="text-primary">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}

export default LoginForm;