import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { addFavorite, removeFavorite } from "../api/favorites";
import "./FavoriteButton.css";

function FavoriteButton(props) {
    const placeId = props.placeId;
    const restaurantName = props.restaurantName;

    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [isSaved, setIsSaved] = useState(false);
    const [favoriteId, setFavoriteId] = useState(null);

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
        <button className="favorite-btn" onClick={handleClick} aria-label="Save to favorites">
            {isSaved ? "❤️" : "🤍"}
        </button>
    );
}

export default FavoriteButton;