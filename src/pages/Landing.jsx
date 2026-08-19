import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RestaurantTile from "../components/RestaurantTitle";
import "./Landing.css";
import { useEffect, useRef, useState } from "react";
import { getPhotoUrl, searchRestaurants } from "../api/places";

function Landing () {
    const [restaurants, setRestaurants] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(function () {
        async function loadRestaurants() {
            try{
                const results = await searchRestaurants("Westlands");
                setRestaurants(results);
            } catch (err) {
                setError("Couldn't load restaurants right now.")
            } finally {
                setIsLoading(false)
            }
        }

        loadRestaurants();
    }, []);

    const trackRef = useRef(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    function scrollByOnePage(direction) {
        const track = trackRef.current;
        if (!track) return;
        track.scrollBy({ left: track.clientWidth * direction, behavior: "smooth" });
    }

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

               {isLoading && <p>Loading restaurants...</p>}
               {error && <p>{error}</p>}

                {!isLoading && !error && (
                    <div className="restaurant-title-grid" ref={trackRef} onScroll={handleScroll}>
                    {restaurants.map(function (place) {
                        const photoName = place.photos && place.photos[0] ? place.photos[0].name : null;

                        return(
                            <RestaurantTile
                                key = {place.id}
                                name = {place.displayName ? place.displayName.text : "Unnamed"}
                                category = {place.formattedAddress}
                                photoUrl = {photoName ? getPhotoUrl(photoName, 400) : "/hero-dining.jpeg"}
                            />
                        );
                    })}
                   
                 </div>
                )}
               
            </section>
                
        </div>
    );
}

export default Landing;