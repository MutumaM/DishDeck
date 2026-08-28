import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./FavoriteButton.css";
import { useState, useEffect } from "react";
import { addFavorite, removeFavorite, checkFavorite } from "../api/favorites";

function FavoriteButton(props) {
    const placeId = props.placeId;
    const restaurantName = props.restaurantName;
    const variant = props.variant || "overlay";

    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [isSaved, setIsSaved] = useState(false);
    const [favoriteId, setFavoriteId] = useState(null);

    useEffect(function () {
    async function loadStatus() {
        if (!currentUser) return;
        const result = await checkFavorite(placeId);
        setIsSaved(result.is_saved);
        setFavoriteId(result.favorite_id || null);
    }
    loadStatus();
    }, [placeId, currentUser]);

    async function handleClick(e) {
        e.preventDefault();  
        e.stopPropagation();

        if (!currentUser) {
            navigate("/login", { state: { from: window.location.pathname } });
            return;
        }

        if (isSaved) {
            await removeFavorite(favoriteId);
            setIsSaved(false);
            setFavoriteId(null);
        } else {
            const saved = await addFavorite(placeId, restaurantName, null);
            setIsSaved(true);
            setFavoriteId(saved.id);
        }
    }

     return (
        <button
            className={`favorite-btn favorite-btn-${variant} ${isSaved ? "favorite-btn-saved" : ""}`}
            onClick={handleClick}
            aria-label="Save to favorites"
        >
            {isSaved ? "❤️" : "🤍"}
        </button>
     );
}

export default FavoriteButton;