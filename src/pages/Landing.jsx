import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RestaurantTile from "../components/RestaurantTile";
import "./Landing.css";

function Landing () {
    const featuredRetaurants = [
        { id: 1, name: "Oyster Bay", photoUrl: "/oyster-bay.jpg" },
        { id: 2, name: "Crave Kenya", photoUrl: "/crave-kenya.jpg" },
        { id: 3, name: "Cj's Kilimani", photoUrl: "/cjs-kilimani.jpg" },
        { id: 4, name: "Ankolee", photoUrl: "/ankolee.jpg" },
    ];

    return(
        <div className="landing-page">
            <Navbar />
            <Hero />

            <div className="restaurant-title-grid">
                {featuredRetaurants.map(function (spot) {
                    return (
                        <RestaurantTile 
                            key = {spot.id}
                            name = {spot.name}
                            photoUrl = {spot.photoUrl}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Landing;