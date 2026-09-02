DishDeck

A restaurant discovery app for Nairobi.

Live site: https://dish-deck-sigma.vercel.app

1. Features
Browse restaurants across six Nairobi neighbourhoods (Westlands, Kilimani, Parklands, Lavington, CBD, Langata)
View a restaurant's full profile: photos, rating, reviews, opening hours, contact info, and an embedded map
Filter by neighbourhood via the navbar dropdown
Register/log in, save restaurants to a personal Favorites list, and remove them again

3. Tech stack
Frontend: React (Vite)
Backend: Flask, SQLAlchemy, SQLite
Auth: Flask-Login sessions, bcrypt password hashing
Routing: React Router
Data: Google Places API (New) — Text Search + Place Details
Map: Google Maps Embed API
Deployment: Vercel

4. How it works

Landing page shows one row per neighbourhood. Each row fetches its own restaurants from Google when it loads, tracks its own loading/error state, and scrolls independently. Clicking a restaurant card takes you to its detail page.

Routing is handled by React Router with three routes:

/ — landing page
/neighbourhood/:neighbourhoodName 
/restaurant/:placeId — detail page

Detail page reads placeId from the URL via useParams, then calls the Places Place Details endpoint to fetch the full record (photos, hours, reviews, contact info) for that one restaurant. The map is a Google Maps Embed iframe addressed directly by place_id.

Photos are handled in two steps, since Places API (New) doesn't return direct image URLs: each photo object has a name reference, which gets exchanged for an actual image URL through a separate Place Photos endpoint (getPhotoUrl in api/places.js).

Field masks are used on every request to limit which fields Google returns 

Auth uses Flask-Login sessions, not JWTs. Passwords are hashed with bcrypt, never stored in plain text. A session cookie identifies the logged-in user on each request.

Favorites are stored in a SQLite Favorite table, scoped to user_id. Every favorites route checks that the record belongs to the logged-in user before allowing an update or delete. The heart button checks save-status on load and blocks duplicate saves both client- and server-side.

4. Data

Restaurant data is fetched live from Google Places on each page load 

5. Local setup
bash
npm install

Create a .env file in the project root:

VITE_GOOGLE_PLACES_API_KEY 
bash
npm run dev

Backend:

pipenv install
pipenv shell
python app.py
