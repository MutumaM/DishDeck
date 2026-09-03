import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const neighbourhoods = ["Westlands", "Kilimani", "Parklands", "Lavington", "CBD", "Langata"];

function Navbar(props) {
    const showSearch = props.showSearch
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    async function handleLogout() {
        await logout();
        navigate("/");
    }

    function linkClass(path) {
        return location.pathname === path ? "navbar-link navbar-link-active" : "navbar-link";
    }

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo-link">
                <p className="navbar-logo">
                    <span className="navbar-logo-dish">Dish</span>
                    <span className="navbar-logo-deck">Deck</span>
                </p>
            </Link>

            <div className="navbar-links">
                <Link to="/" className={linkClass("/")}>Home</Link>

                <div
                    className="navbar-dropdown-wrapper"
                    onMouseEnter={function () { setIsDropdownOpen(true); }}
                    onMouseLeave={function () { setIsDropdownOpen(false); }}>

                    <button className="navbar-dropdown-trigger">
                        Neighbourhoods <span aria-hidden="true">▾</span>
                    </button>

                    {isDropdownOpen && (
                        <div className="navbar-dropdown">
                            <div className="navbar-dropdown-panel">
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
                        </div>
                    )}
                </div>

            </div>

            {showSearch && (
                <div className="navbar-search">
                    <span className="navbar-search-icon" aria-hidden="true">🔍</span>
                    <input type="text" className="navbar-search-input" placeholder="Search DishDeck" />
                </div>
            )}

            <div className="navbar-actions">
                {currentUser ? (
                    <div className="navbar-user">
                        <Link to="/favorites" className={linkClass("/favorites")}>Favorites</Link>
                        <button className="navbar-logout-btn" onClick={handleLogout}>Log out</button>
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="navbar-login-link">Log in</Link>
                        <Link to="/signup" className="navbar-add-btn">Sign up</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar