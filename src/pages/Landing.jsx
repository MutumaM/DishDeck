import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import "./Landing.css";

function Landing() {
    return (
        <div className="landing-page">
            <Navbar showSearch={false} />
            <Hero />
        </div>
    );
}

export default Landing;