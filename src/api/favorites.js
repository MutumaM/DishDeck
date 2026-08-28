const BASE_URL =  import.meta.env.VITE_API_URL || "http://localhost:5555";

export async function getFavorites() {
    const response = await fetch(`${BASE_URL}/api/favorites`, {
        credentials: "include",
    });
    if (!response.ok) throw new Error("Couldn't load favorites");
    return response.json();
}

export async function addFavorite(placeId, restaurantName, note) {
    const response = await fetch(`${BASE_URL}/api/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({ place_id: placeId, restaurant_name: restaurantName, note})
    });
    if (!response.ok) throw new Error ("Couldn't save favorite");
    return response.json();
}

export async function removeFavorite(favoriteid) {
    const response = await fetch(`${BASE_URL}/api/favorites/${favoriteid}`, {
        method: "DELETE",
        credentials: "include"
    });
    if(!response.ok) throw new Error("Couldn't remove favorite")
}

export async function checkFavorite(placeId) {
    const response = await fetch(`${BASE_URL}/api/favorites/check/${placeId}`, {
        credentials: "include",
    });
    if (!response.ok) return { is_saved: false };
    return response.json();
}