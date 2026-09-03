const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

const SEARCH_URL = "https://places.googleapis.com/v1/places:searchText";
const DETAILS_URL = "https://places.googleapis.com/v1/places";

export async function getPlaceDetails(placeId) {
    const response = await fetch(`${DETAILS_URL}/${placeId}`, {
        method: "GET",
        headers: {
            "X-Goog-Api-Key": API_KEY,
            "X-Goog-FieldMask": [
                "id",
                "displayName",
                "formattedAddress",
                "rating",
                "userRatingCount",
                "priceLevel",
                "currentOpeningHours",
                "internationalPhoneNumber",
                "websiteUri",
                "reviews",
                "photos"
            ].join(","),
        },
    });
    if(!response.ok) {
        throw new Error(`Place details fetch failed: ${response.status}`)
    }

    return response.json()
}

export async function searchRestaurants(neighbourhoodName) {
    const response = await fetch(SEARCH_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": API_KEY,

            //only request what my card displays
           "X-Goog-FieldMask": [
                "places.id",
                "places.displayName",
                // "places.formattedAddress",
                "places.rating",
                "places.priceLevel",
                "places.currentOpeningHours",
                "places.photos",
           ].join(",")
        },
        body: JSON.stringify({
            textQuery: `restaurants in ${neighbourhoodName} Nairobi `,
            maxResultCount: 60,
        }),
    });

    if(!response.ok) {
        throw new Error(`Places search failed: ${response.status}`);
    }

    const data = await response.json()
    return data.places || [];
}

export function getPhotoUrl(photoName, maxWidth) {
    const width = maxWidth || 400;
    return `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=${width}&key=${API_KEY}`;
}

