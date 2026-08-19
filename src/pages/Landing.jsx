import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RestaurantTile from "../components/RestaurantTitle";
import "./Landing.css";
import { useRef, useState } from "react";

function Landing () {
    const featuredRetaurants = [
        { id: 1, name: "Oyster Bay", photoUrl: "../oyster-bay.jpeg" },
        { id: 2, name: "Crave Kenya", photoUrl: "../crave-kenya.jpeg" },
        { id: 3, name: "Cj's Kilimani", photoUrl: "../cjs-kilimani.jpeg" },
        { id: 4, name: "Ankolee", photoUrl: "../ankolee.jpeg" },
    ];

    const trackRef = useRef(null);

    function scrollByOnePage(direction) {
        const track = trackRef.current;
        if (!track) return;
        track.scrollBy({ left: track.clientWidth * direction, behavior: "smooth" });
    }

    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    function handleScroll() {
    const track = trackRef.current;
    if (!track) return;

    setAtStart(track.scrollLeft <= 0);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 1);
}
    return(
        <div className="landing-page">
            <Navbar />
            <Hero />

            <section className="restaurant-row-section">
               <div className="restaurant-row-header">
                    <h3 className="restaurant-row-title">Featured restaurants</h3>
                    <div className="restaurant-row-arrows">
                        <button className="restaurant-row-arrow" onClick={function () { scrollByOnePage(-1); }} disabled = {atStart} aria-label="Scroll left">←</button>
                        <button className="restaurant-row-arrow" onClick={function () { scrollByOnePage(1); }} disabled={atEnd} aria-label="Scroll right">→</button>
                    </div>
               </div>

               <div className="restaurant-title-grid" ref={trackRef} onScroll={handleScroll}>
                    {featuredRetaurants.map(function (spot) {
                        return(
                            <RestaurantTile
                                key = {spot.id}
                                name = {spot.name}
                                photoUrl = {spot.photoUrl}
                            />
                        );
                    })}
               </div>
            </section>
                
        </div>
    );
}

export default Landing;