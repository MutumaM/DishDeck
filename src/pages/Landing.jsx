import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import NeighbourhoodRow from "../components/NeighbourhoodRow";
import "./Landing.css";

const neighbourhoods = ["Westlands", "Kilimani", "Lavington", "Parklands", "Langata", "CBD"]
function Landing () {
    
    return(
        <div className="landing-page">
            <Navbar />
            <Hero />

            {neighbourhoods.map(function (name) {
                return < NeighbourhoodRow key={name} NeighbourhoodName={name} />
            })}
      
                
        </div>
    );
}
export default Landing;