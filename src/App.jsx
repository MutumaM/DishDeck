import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import RestaurantDetail from "./pages/RestaurantDetail";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import FavoritesPage from "./pages/FavoritesPage";
import NeighbourhoodResults from "./pages/NeighbourhoodResults";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/restaurant/:placeId" element={<RestaurantDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/neighbourhoods" element={<div>Neighbourhoods page coming soon</div>} />
          <Route path="/neighbourhood/:neighbourhoodName" element={<NeighbourhoodResults />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;