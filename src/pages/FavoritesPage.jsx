import { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "../api/favorites";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "./FavoritesPage.css";

function FavoritesPage() {
    const { currentUser } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(function () {
        async function loadFavorites() {
            try {
                const data = await getFavorites();
                setFavorites(data);
            } catch (err) {
                setError("Couldn't load your favorites.");
            } finally {
                setIsLoading(false);
            }
        }
        loadFavorites();
    }, []);

    async function handleRemove(favoriteId) {
        await removeFavorite(favoriteId);
        setFavorites(favorites.filter(function (f) { return f.id !== favoriteId; }));
    }

    if (!currentUser) {
        return (
            <div>
                <Navbar />
                <p className="favorites-status">Log in to see your saved restaurants.</p>
            </div>
        );
    }

   return (
    <div className="favorites-page-wrapper">
        <Navbar />
        <h1 className="favorites-title">Your Favorites</h1>

        {isLoading && <p className="favorites-status">Loading...</p>}
        {error && <p className="favorites-status">{error}</p>}
        {!isLoading && !error && favorites.length === 0 && (
            <p className="favorites-status">No favorites saved yet.</p>
        )}

        <div className="favorites-list">
            {favorites.map(function (fav) {
                return (
                    <div key={fav.id} className="favorites-item">
                        <p className="favorites-item-name">{fav.restaurant_name}</p>
                        {fav.note && <p className="favorites-item-note">{fav.note}</p>}
                        <button
                            className="favorites-remove-btn"
                            onClick={function () { handleRemove(fav.id); }}
                        >
                            Remove
                        </button>
                    </div>
                );
            })}
        </div>
    </div>
  );
}

export default FavoritesPage;