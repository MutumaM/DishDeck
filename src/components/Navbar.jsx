function Navbar() {
    return(
        <nav className="navbar">
            <p className="navbar-logo">
                <span className="navbar-logo-dish">Dish</span>
                <span className="navbar-logo-deck">Deck</span>
            </p>

            <a href="/neighbourhoods" className="navbar-link">Neighbourhoods</a>

            <button className="navbar-add-btn">Add restaurant</button>
        </nav>
    );
}

export default Navbar