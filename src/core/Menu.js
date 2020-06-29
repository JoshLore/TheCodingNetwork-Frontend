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

        {/* Home */}
        <li className="nav-item">
            <Link className="nav-link" to="/" style={isActive(history, "/")}>Home</Link>
        </li>

        {/* Users */}
        <li className="nav-item">
            <Link className="nav-link" to="/users" style={isActive(history, "/users")}>Users</Link>
        </li>

        {/* If user logged in, HIDE these links */}
        {!isAuthenticated() && (
            <>
                {/* Sign In */}
                <li className="nav-item">
                    <Link className="nav-link" to="/signin" style={isActive(history, "/signin")}>Sign In</Link>
                </li>

                {/* Sign Up */}
                <li className="nav-item">
                    <Link className="nav-link" to="/signup" style={isActive(history, "/signup")}>Sign Up</Link>
                </li>
            </>
        )}

        {/* If user logged in, SHOW these links */}
        {/* Might want to clean up that onClick */}
        {isAuthenticated() && (
            <>

                {/* Find People to Follow */}
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, `/findpeople`)}
                        to={`/findpeople`}
                    >
                        Find People
                    </Link>
                </li>

                {/* Find People to Follow */}
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, `/post/create`)}
                        to={`/post/create`}
                    >
                        Create Post
                    </Link>
                </li>

                {/* User Profile */}
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, `/user/${isAuthenticated().user._id}`)}
                        to={`/user/${isAuthenticated().user._id}`}
                    >
                        {`${isAuthenticated().user.name}'s Profile`}
                    </Link>
                </li>

                {/* Sign out */}
                <li className="nav-item">
                    <a className="nav-link" href="/" style={{ cursor: "pointer", color: "#fff" }} onClick={() => signout(() => history.push('/'))}>Sign Out</a>
                </li>
            </>
        )}

    </ul>
);

export default withRouter(Menu);