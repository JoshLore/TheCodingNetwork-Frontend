import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signout } from '../auth/auth';

// Gets the current path and applies style to nav link
const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#46b2bd", fontWeight: "bold" };
    } else {
        return { color: "#ffffff" };
    }
};

// Navbar
const Menu = ({ history }) => (
    <ul className="nav nav-tabs bg-dark">

        <li className="nav-item">
            <Link className="nav-link" to="/" style={isActive(history, "/")}>Home</Link>
        </li>

        {/* If user logged in, HIDE these links */}
        {!isAuthenticated() && (
            <>

                <li className="nav-item">
                    <Link className="nav-link" to="/signin" style={isActive(history, "/signin")}>Sign In</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/signup" style={isActive(history, "/signup")}>Sign Up</Link>
                </li>
            </>
        )}

        {/* If user logged in, SHOW these links */}
        {/* Might want to clean up that onClick */}
        {isAuthenticated() && (
            <>
                <li className="nav-item">
                    <a className="nav-link" href="/" style={{ cursor: "pointer", color: "#fff" }} onClick={() => signout(() => history.push('/'))}>Sign Out</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link">{isAuthenticated().user.name}</a>
                </li>
            </>
        )}

    </ul>
);

export default withRouter(Menu);

