function RestaurantTitle(props) {
    const name = props.name
    const photoURL = props.photoURL

    return(
        <div className="restaurant-title">
            <img 
                src={photoURL} 
                alt={name} 
                className="restaurant-title-photo"
            />

            <p className="restaurant-title-name">{name}</p>
        </div>
    );
}

export default RestaurantTitle