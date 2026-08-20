import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import NeighbourhoodRow from "../components/NeighbourhoodRow";
import "./Landing.css";
import { useState } from "react";

const neighbourHoods = ["Westlands", "Kilimani", "Lavington", "Parklands", "Langata", "CBD"]

function Landing () {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredNeighbourHoods = neighbourHoods.filter(function (name) {
        return name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    
    return (
        <div className="landing-page">
            <Navbar />
            <Hero searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            {filteredNeighbourHoods.length > 0 ? (
                filteredNeighbourHoods.map(function (name) {
                    return <NeighbourhoodRow key={name} neighbourhoodName={name} />;
                })
            ) : (
                <p className="landing-no-match">No neighbourhood matches "{searchTerm}"</p>
            )}
        </div>
    );
}
export default Landing;