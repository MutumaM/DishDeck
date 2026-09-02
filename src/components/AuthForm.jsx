import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./AuthForm.css";

function AuthForm(props) {
    const onSuccess = props.onSuccess;

    const { login, register } = useAuth();

    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            if (isRegisterMode) {
                await register(email, password);
            } else {
                await login(email, password);
            }
            if (onSuccess) onSuccess();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form className="modern-form" onSubmit={handleSubmit}>
            <p className="form-title">
                {isRegisterMode ? "Create an account" : "Welcome back"}
            </p>

            {error && <p className="form-error">{error}</p>}

            <div className="input-group">
                <div className="input-wrapper">
                    <i className="ti ti-mail input-icon" aria-hidden="true"></i>
                    <input
                        type="email"
                        className="form-input"
                        placeholder="Email"
                        value={email}
                        onChange={function (e) { setEmail(e.target.value); }}
                        required
                    />
                </div>
            </div>

            <div className="input-group">
                <div className="input-wrapper">
                    <i className="ti ti-lock input-icon" aria-hidden="true"></i>
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-input"
                        placeholder="Password"
                        value={password}
                        onChange={function (e) { setPassword(e.target.value); }}
                        required
                    />
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={function () { setShowPassword(!showPassword); }}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        <i className={showPassword ? "ti ti-eye-off" : "ti ti-eye"}></i>
                    </button>
                </div>
            </div>

            <button type="submit" className="submit-button" disabled={isSubmitting}>
                <span className="button-glow"></span>
                {isSubmitting ? "Please wait..." : isRegisterMode ? "Register" : "Log in"}
            </button>

            <div className="form-footer">
                <a
                    href="#"
                    className="login-link"
                    onClick={function (e) {
                        e.preventDefault();
                        setIsRegisterMode(!isRegisterMode);
                    }}
                >
                    {isRegisterMode ? (
                        <>Already have an account? <span>Log in</span></>
                    ) : (
                        <>Need an account? <span>Register</span></>
                    )}
                </a>
            </div>
        </form>
    );
}

export default AuthForm;