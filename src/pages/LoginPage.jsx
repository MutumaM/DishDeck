import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import AuthForm from "../components/AuthForm";
import "./LoginPage.css";

const slidePhotos = [
    "login-page-photo-1",
    "login-page-photo-2",
    "login-page-photo-3",
];

function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(function () {
        const interval = setInterval(function () {
            setSlideIndex(function (prev) {
                return (prev + 1) % slidePhotos.length;
            });
        }, 4000);

        return function () {
            clearInterval(interval);
        };
    }, []);

    function handleSuccess() {
        const returnTo = location.state && location.state.from ? location.state.from : "/";
        navigate(returnTo);
    }

    return (
        <div>
            <Navbar showSearch={false} />

            <div className="login-page-hero">
                {slidePhotos.map(function (photo, index) {
                    const isActive = index === slideIndex;
                    return (
                        <img
                            key={index}
                            src={photo}
                            alt=""
                            className={`login-slide ${isActive ? "login-slide-active" : ""}`}
                        />
                    );
                })}

                <div className="login-page-scrim"></div>

                <div className="login-page-card">
                    <AuthForm onSuccess={handleSuccess} />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;