import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signout } from '../auth/auth';
import Title from '../images/Title.png'

// Gets the current path and applies style to nav link
const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#86cdfc", fontWeight: "bold" };
    } else {
        return { color: "#ffffff" };
    }
};

// Navbar
const Menu = ({ history }) => (
    <ul className="nav nav-tabs bg-secondary sticky-top collapse navbar-collapse" id="navbarToggleExternalContent">

        {/* Home */}
        <li className="nav-brand">
            <Link className="nav-link" to="/" style={isActive(history, "/")}><img src={Title} className='img-fluid' alt='The Coding Network' style={{ maxHeight: '30px' }} /></Link>
        </li>

        {/* Users */}
        <li className="nav-item ">
            <Link className="nav-link" to="/users" style={isActive(history, "/users")}>Users</Link>
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

        {/* If user logged in, HIDE these links */}
        {
            !isAuthenticated() && (
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
            )
        }

        {/* Admin Link */}
        {isAuthenticated() && isAuthenticated().user.role === "admin" && (
            <li className="nav-item">
                <Link
                    to={`/admin`}
                    style={isActive(history, `/admin`)}
                    className="nav-link"
                >
                    Admin
                </Link>
            </li>
        )}

        {/* If user logged in, SHOW these links */}
        {/* Might want to clean up that onClick */}
        {
            isAuthenticated() && (
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
            )
        }

    </ul >
);

export default withRouter(Menu);