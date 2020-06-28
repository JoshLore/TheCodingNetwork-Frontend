import React, { Component } from 'react';
import { isAuthenticated } from '../auth/auth';
import { Redirect, Link } from 'react-router-dom';
import { read } from './apiUser';
import DefaultProfile from "../images/userDefault.png";
import DeleteUser from './DeleteUser';
import Users from './Users';

// I couldn't get a functional component 
// with useEffect to stop infinitely looping, so
// I just reverted back to a class component to 
// make it easier. One day I'll conquer Hooks.

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: { following: [], followers: [] },
            redirectToSignin: false,
            following: false,
            error: "",
            posts: []
        };
    }

    // This is where useEffect kept infinitely looping,
    // but componentDidMount() doesn't, for some reason.

    // Get current user's object from an API call
    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    // REWRITE THIS WHEN POSSIBLE
    // DEPRECATED
    componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
        this.init(userId);
    }


    // Initialize user from API
    init = userId => {
        const token = isAuthenticated().token;

        // Get readable JSON from API
        read(userId, token).then(data => {
            if (data.error) {
                // If user isn't logged in, redirect
                this.setState({ redirectToSignin: true });
            } else {
                // Set User State to user's data
                this.setState({ user: data });
            }
        });
    };

    render() {
        // If user is not logged in, redirect
        const { redirectToSignin, user } = this.state;
        if (redirectToSignin) return <Redirect to="/signin" />;

        const photoUrl = user._id ?
            `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`
            : DefaultProfile;

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>

                {/* Profile Information */}
                <div className="row">
                    <div className="col-md-6">

                        {/* Tries to find user profile image, otherwise uses default */}
                        <img
                            style={{ height: "200px", width: "auto" }}
                            className="img-thumbnail"
                            src={photoUrl}
                            onError={i => (i.target.src = `${DefaultProfile}`)}
                            alt={user.name}
                        />
                    </div>

                    {/* Display profile's name and email */}
                    <div className="col-md-6">
                        <div className="lead mt-2">
                            <p>Hello, {user.name}!</p>
                            <p>Email: {user.email}</p>
                            <p>{`Joined: ${new Date(user.created).toDateString()}`}</p>
                        </div>

                        {/* Buttons for editing and deleting, only visible in user's own profile */}
                        {isAuthenticated().user &&
                            isAuthenticated().user._id === user._id && (
                                <div className="d-inline-block">
                                    <Link className="btn btn-raised btn-success mr-5" to={`/user/edit/${user._id}`}>
                                        Edit Profile
                                    </Link>
                                    <DeleteUser userId={user._id} />
                                </div>
                            )}
                    </div>
                </div>
                <div className="row">
                    <div className="col md-12 mt-5 mb-5">
                        <hr />
                        <p className="lead">{user.about}</p>
                        <hr />
                    </div>
                </div>
            </div>
        );
    }

}

export default Profile;
