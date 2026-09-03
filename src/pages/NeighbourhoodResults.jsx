import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchRestaurants, getPhotoUrl } from "../api/places";
import Navbar from "../components/Navbar";
import FavoriteButton from "../components/FavoriteButton";
import { Link } from "react-router-dom";
import "./NeighbourhoodResults.css";


const knownNeighbourhoods = ["Westlands", "Kilimani", "Parklands", "Lavington", "CBD", "Langata"];


function NeighbourhoodResults() {
    const { neighbourhoodName } = useParams();
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const isNeighbourhoodSearch = knownNeighbourhoods.some(function (n) {
        return n.toLowerCase() === neighbourhoodName.toLowerCase();
    });

    
    useEffect(function () {
        async function loadRestaurants() {
            setIsLoading(true);
            setError(null);
            try {
                const results = await searchRestaurants(neighbourhoodName);
                setRestaurants(results);
            } catch (err) {
                setError("Couldn't load restaurants right now.");
            } finally {
                setIsLoading(false);
            }
        }
        loadRestaurants();
    }, [neighbourhoodName]);

    return (
        <div className="results-page">
            <Navbar showSearch={true} />

            {isNeighbourhoodSearch && (
                <div className="results-header">
                    <p className="results-title">Restaurants in {neighbourhoodName}</p>
                    {!isLoading && !error && (
                        <p className="results-count">{restaurants.length} places found</p>
                    )}
                </div>
            )}

            {isLoading && <p className="results-status">Loading...</p>}
            {error && <p className="results-status">{error}</p>}
            {!isLoading && !error && restaurants.length === 0 && (
                <p className="results-status">No restaurants found in {neighbourhoodName}.</p>
            )}

            {!isLoading && !error && restaurants.length > 0 && (
                <div className="results-grid">
                    {restaurants.map(function (place) {
                        const photoName = place.photos && place.photos[0] ? place.photos[0].name : null;
                        const name = place.displayName ? place.displayName.text : "Unnamed";

                        return (
                            <Link
                                key={place.id}
                                to={`/restaurant/${place.id}`}
                                className="results-card-link"
                            >
                                <div className="results-card">
                                    <div className="results-card-photo-wrap">
                                        <img
                                            src={photoName ? getPhotoUrl(photoName, 800) : "/hero-dining.jpeg"}
                                            alt={name}
                                            className="results-card-photo"
                                        />
                                        <div className="results-card-heart">
                                            <FavoriteButton
                                                placeId={place.id}
                                                restaurantName={name}
                                                variant="standalone"
                                            />
                                        </div>
                                    </div>
                                    <div className="results-card-info">
                                        <div className="results-card-top-row">
                                            <p className="results-card-name">{name}</p>
                                            {place.rating && (
                                                <span className="results-card-rating">{place.rating}</span>
                                            )}
                                        </div>
                                        <p className="results-card-category">{place.formattedAddress}</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default NeighbourhoodResults;