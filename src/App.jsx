import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import RestaurantDetail from "./pages/RestaurantDetail";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/restaurant/:placeId" element={<RestaurantDetail />} />
          <Route path="/neighbourhoods" element={<div>Neighbourhoods page coming soon</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;