import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import RestaurantDetail from "./pages/RestaurantDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/restaurant/:placeId" element={<RestaurantDetail />} />
        <Route path="/neighbourhoods" element={<div>Neighbourhoods page coming soon</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;