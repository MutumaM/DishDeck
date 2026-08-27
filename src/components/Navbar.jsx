import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const neighbourhoods = ["Westlands", "Kilimani", "Parklands", "Lavington", "CBD", "Langata"];

function Navbar(props) {
    const showSearch = props.showSearch
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
        navigate("/");
    }

    return(
        <nav className="navbar">
            <Link to="/" className="navbar-logo-link">
                <p className="navbar-logo">
                    <span className="navbar-logo-dish">Dish</span>
                    <span className="navbar-logo-deck">Deck</span>
                </p>
            </Link>

              {showSearch && (
                <div className="navbar-search">
                    <span className="navbar-search-icon">🔍</span>
                    <input type="text" className="navbar-search-input" placeholder="Search DishDeck" />
                </div>
               )}
                    <div
                className="navbar-dropdown-wrapper"
                onMouseEnter={function () { setIsDropdownOpen(true); }}
                onMouseLeave={function () { setIsDropdownOpen(false); }}>

                <span className="navbar-link">Neighbourhoods ▾</span>

                {isDropdownOpen && (
                    <div className="navbar-dropdown">
                        {neighbourhoods.map(function (name) {
                            return (
                                <Link
                                    key={name}
                                    to={`/neighbourhood/${name}`}
                                    className="navbar-dropdown-item">
                                    {name}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>

            {currentUser ? (
                <div className="navbar-user">
                    <Link to="/favorites" className="navbar-link">Favorites</Link>
                    <button className="navbar-logout-btn" onClick={handleLogout}>Log out</button>
                </div>
            ) : (
                <Link to="/login" className="navbar-add-btn">Log in</Link>
            )}
        </nav>
    );
}

export default Navbar