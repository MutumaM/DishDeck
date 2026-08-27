import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./AuthForm.css";

function AuthForm(props) {
    const onSuccess = props.onSuccess

    const { login, register } = useAuth();

    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            if (isRegisterMode) {
                await register(email, password)
            } else {
                await login(email, password)
            }
            if (onSuccess) onSuccess();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form  className="auth-form" onSubmit={handleSubmit}>
            <h2 className="auth-form-title"> 
                {isRegisterMode ? "Create an account" : "Log in"} 
            </h2>

            {error && <p className="auth-form-error">{error}</p>}

            <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={function (e) {setEmail(e.target.value); }}
                className="auth-form-input"
                required
            />

            <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={function (e) {setPassword(e.target.value); }}
                className="auth-form-input"
                required
            />

            <button type="submit" className="auth-form-submit" disabled={isSubmitting}>
                {isSubmitting ? "Please wait ..." : isRegisterMode ? "Register" : "Log in"}
            </button>

            <button type="button" className="auth-form-toogle" onClick={function () { setIsRegisterMode(!isRegisterMode); }}>
                {isRegisterMode ? "Already have an account? Log in": "Need an account? Register"}
            </button>
        </form>

    );
}

export default AuthForm