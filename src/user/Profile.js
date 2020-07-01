import React, { Component } from 'react';
import { isAuthenticated } from '../auth/auth';
import { Redirect, Link } from 'react-router-dom';
import { read } from './apiUser';
import DefaultProfile from "../images/userDefault.png";
import DeleteUser from './DeleteUser'
import FollowProfileButton from './FollowProfileButton';
import ProfileTabs from './ProfileTabs';
import { listByUser } from '../post/apiPost';

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

    // Checks whether logged in user follows this profile
    checkFollow = user => {
        const jwt = isAuthenticated();

        // Iterate through all followers this profile has
        const match = user.followers.find(follower => {
            // Checks to see if logged in user is following
            return follower._id === jwt.user._id;
        });

        // Returns true if following, false if not
        return match;
    }

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

    // Calls API for follow and unfollow
    clickFollowButton = callApi => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        // Call API
        callApi(userId, token, this.state.user._id).then(data => {

            // Handling errors
            if (data.error) {
                this.setState({ error: data.error });

            } else {
                // New Follow
                this.setState({ user: data, following: !this.state.following });
            }
        });
    };

    // Initialize user from API
    init = userId => {
        const token = isAuthenticated().token;

        // Get readable JSON from API
        read(userId, token).then(data => {
            if (data.error) {
                // If user isn't logged in, redirect
                this.setState({ redirectToSignin: true });
            } else {

                // Check if logged in user is following this profile
                let following = this.checkFollow(data);
                // Set User State to user's data and if logged in user is following
                this.setState({ user: data, following });
                this.loadPosts(data._id);
            }
        });
    };

    // Load Posts by User
    loadPosts = userId => {
        const token = isAuthenticated().token;
        listByUser(userId, token).then(data => {

            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        })
    }

    render() {
        // If user is not logged in, redirect
        const { redirectToSignin, user, posts } = this.state;
        if (redirectToSignin) return <Redirect to="/signin" />;

        const photoUrl = user._id ?
            `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`
            : DefaultProfile;

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>

                {/* Profile Information */}
                <div className="row">
                    <div className="col-md-4">

                        {/* Tries to find user profile image, otherwise uses default */}
                        <img
                            style={{ maxWidth: "350px", height: "350px", objectFit: "cover" }}
                            className="img-thumbnail"
                            src={photoUrl}
                            onError={i => (i.target.src = `${DefaultProfile}`)}
                            alt={user.name}
                        />
                    </div>

                    {/* Display profile's name and email */}
                    <div className="col-md-8">
                        <div className="lead mt-2">
                            <p>Hello, I'm <span className='font-weight-bold'>{user.name}</span>!</p>
                            <p>Email: {user.email}</p>
                            <p>{`Joined: ${new Date(user.created).toDateString()}`}</p>
                        </div>

                        {/* Check whether user is in his own profile or another's */}
                        {isAuthenticated().user && isAuthenticated().user._id === user._id ? (

                            // Show edit and delete buttons in OWN user's profile
                            <div className="d-inline-block">
                                <Link className="btn btn-raised mr-5 text-white" to={`/post/create`} style={{ backgroundColor: '#3c9dde' }}>
                                    Create Post
                                    </Link>
                                <Link className="btn btn-raised btn-success mr-5" to={`/user/edit/${user._id}`}>
                                    Edit Profile
                                    </Link>
                                <DeleteUser userId={user._id} />
                            </div>
                        ) : (

                                // Show follow and unfollow buttons in OTHER user's profile
                                <FollowProfileButton
                                    following={this.state.following}
                                    onButtonClick={this.clickFollowButton}
                                />
                            )
                        }

                    </div>
                </div>

                {/* Admin Controls */}
                <div>
                    {isAuthenticated().user &&
                        isAuthenticated().user.role === "admin" && (
                            <div class="card mt-5">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Admin
                                    </h5>
                                    <p className="mb-2 text-danger">
                                        Edit/Delete as an Admin
                                    </p>
                                    <Link
                                        className="btn btn-raised btn-success mr-5"
                                        to={`/user/edit/${user._id}`}
                                    >
                                        Edit Profile
                                    </Link>
                                    <DeleteUser userId={user._id} />
                                </div>
                            </div>
                        )}
                </div>

                <div className="row">
                    {/* Display profile's about text area */}
                    <div className="col md-12 mt-5 mb-5 ">
                        <hr />
                        <p className="lead">{user.about}</p>
                        <hr />
                        <ProfileTabs followers={user.followers} following={user.following} posts={posts} />
                    </div>
                </div>
            </div>
        );
    }

}

export default Profile;