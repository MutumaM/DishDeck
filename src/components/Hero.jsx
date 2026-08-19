import "./Hero.css";

function Hero () {
    return(
        <div className="hero">
            <img
                className="hero-photo"
                src="/hero-dining.jpeg"
                alt="People enjoying a meal together"
            />

            <div className="hero-scrim"/>

            <div className="hero-search-bar">
            <span className="hero-search-icon">🔎</span>
            <input 
                    type="text"
                    className="hero-search-input"
                    placeholder="Search DishDeck"
            />
            </div>
        </div>
    );
}
export default Hero;