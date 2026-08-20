import "./RestaurantTitle.css";
import { Link } from "react-router-dom";

function RestaurantTitle(props) {
    const name = props.name
    const category = props.category
    const photoUrl = props.photoUrl
    const placeId = props.placeId

    return(
        <Link to={`/restaurant/${placeId}`} className="restaurant-title-link">
            <div className="restaurant-title">
                <img 
                    src={photoUrl} 
                    alt={name} 
                    className="restaurant-title-photo"
                />
                
                <div className="restaurant-title-overlay">
                    {category && <p className="restaurant-title-category">{category}</p>}
                    <p className="restaurant-title-name">{name}</p>
                </div>
            </div>
        </Link >
    );
}

export default RestaurantTitle