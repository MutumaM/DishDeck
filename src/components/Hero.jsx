import { useState, useEffect } from "react";
import "./Hero.css";

const neighbourhoods = ["Westlands", "Kilimani", "Parklands", "Lavington", "the CBD", "Langata"];

function Hero() {
    const [wordIndex, setWordIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    useEffect(function () {
        const interval = setInterval(function () {
            setIsFading(true);
            setTimeout(function () {
                setWordIndex(function (prev) {
                    return (prev + 1) % neighbourhoods.length;
                });
                setIsFading(false);
            }, 300);
        }, 2000);

        return function () {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="hero">
            <img
                className="hero-photo"
                src="/hero-dining.jpeg"
                alt="People enjoying a meal together at a restaurant"
            />
            <div className="hero-scrim"></div>

            <div className="hero-content">
                <p className="hero-headline">
                    Find your next table in{" "}
                    <span className={`hero-rotating-word ${isFading ? "hero-rotating-word-fading" : ""}`}>
                        {neighbourhoods[wordIndex]}
                    </span>
                </p>

                <div className="hero-search-bar">
                    <span className="hero-search-icon">
                        <i className="ti ti-search"></i>
                    </span>
                    <input
                        type="text"
                        className="hero-search-input"
                        placeholder="Search restaurants or neighbourhoods"
                    />
                    <button className="hero-search-btn">Search</button>
                </div>

                <div className="hero-pills">
                    {neighbourhoods.map(function (name, index) {
                        const linkTarget = "/neighbourhood/" + name.replace("the ", "");
                        const label = name.replace("the ", "");
                        const delay = (400 + index * 90) + "ms";

                        return (
                            <a 
                            key={name} 
                            href={linkTarget} 
                            className="hero-pill" 
                            style={{ animationDelay: delay }}> {label}
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Hero;