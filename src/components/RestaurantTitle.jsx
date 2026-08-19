import "./RestaurantTitle.css";

function RestaurantTitle(props) {
    const name = props.name
    const category = props.category
    const photoUrl = props.photoUrl

    return(
        <div className="restaurant-title">
            <img 
                src={photoUrl} 
                alt={name} 
                className="restaurant-title-photo"
            />

            <p className="restaurant-title-name">{name}</p>
            <p className="restaurant-title-category">{category}</p>
        </div>
    );
}

export default RestaurantTitle