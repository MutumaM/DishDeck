import { useEffect, useState } from "react";
import { getFavorites, removeFavorite, updateFavoriteNote } from "../api/favorites";
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

    function handleNoteChange(favoriteId, newNote) {
        setFavorites(favorites.map(function (f) {
            return f.id === favoriteId ? { ...f, note: newNote } : f;
        }));
    }

    async function handleNoteBlur(favoriteId, note) {
        try {
            await updateFavoriteNote(favoriteId, note);
        } catch (err) {
            // note update failed silently for now — could add a toast later
        }
    }

    if (!currentUser) {
        return (
            <div>
                <Navbar showSearch={false} />
                <p className="favorites-status">Log in to see your saved restaurants.</p>
            </div>
        );
    }

    return (
        <div>
            <Navbar showSearch={false} />

            <div className="favorites-page">
                <p className="favorites-title">Your favorites</p>
                {!isLoading && !error && (
                    <p className="favorites-count">{favorites.length} saved restaurants</p>
                )}

                {isLoading && <p className="favorites-status">Loading...</p>}
                {error && <p className="favorites-status">{error}</p>}
                {!isLoading && !error && favorites.length === 0 && (
                    <p className="favorites-status">No favorites saved yet.</p>
                )}

                <div className="favorites-list">
                    {favorites.map(function (fav) {
                        return (
                            <div key={fav.id} className="favorites-card">
                                <div className="favorites-card-photo">
                                    <i className="ti ti-photo" aria-hidden="true"></i>
                                </div>
                                <div className="favorites-card-body">
                                    <div className="favorites-card-top-row">
                                        <p className="favorites-card-name">{fav.restaurant_name}</p>
                                        <button
                                            className="favorites-remove-btn"
                                            onClick={function () { handleRemove(fav.id); }}
                                            aria-label="Remove from favorites"
                                        >
                                            <i className="ti ti-trash"></i>
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        className="favorites-note-input"
                                        placeholder="Add a note — try the ribs, book ahead..."
                                        value={fav.note || ""}
                                        onChange={function (e) { handleNoteChange(fav.id, e.target.value); }}
                                        onBlur={function (e) { handleNoteBlur(fav.id, e.target.value); }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default FavoritesPage;