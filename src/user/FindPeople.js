import React, { Component } from "react";
import { findPeople, follow } from "./apiUser";
import DefaultProfile from "../images/userDefault.png";
import { Link } from "react-router-dom";
import { isAuthenticated } from '../auth/auth';

class FindPeople extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            error: "",
            open: false
        };
    }

    // Call API for users to follow
    componentDidMount() {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        findPeople(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users: data });
            }
        });
    }

    // When user clicks follow
    clickFollow = (user, i) => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        // Call the API
        follow(userId, token, user._id).then(data => {

            // Handling errors
            if (data.error) {
                this.setState({ error: data.error });
            } else {
                // Remove new follow user from this state (So you can't follow twice)
                let toFollow = this.state.users;
                toFollow.splice(i, 1);

                // setState to also show a success message
                this.setState({
                    users: toFollow,
                    open: true,
                    followMessage: `Following ${user.name} successful!`
                });
            }
        })
    }

    // Render cards for each profile
    renderUsers = users => (
        <div className="row">
            {/* Map through given users */}
            {users.map((user, i) => (
                <div className="card col-md-4" key={i}>

                    {/* Tries to find user profile image, otherwise uses default */}
                    <img
                        style={{ width: "auto", maxWidth: "100%" }}
                        className="img-thumbnail"
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        alt={user.name}
                    />

                    {/* Display name and email */}
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.email}</p>

                        {/* Link to profile */}
                        <Link
                            to={`/user/${user._id}`}
                            className="btn btn-raised btn-dark btn-sm">View Profile
                        </Link>

                        <button onClick={() => this.clickFollow(user, i)} className="btn btn-raised text-white btn-sm float-right" style={{ backgroundColor: '#3c9dde' }}>Follow</button>
                    </div>
                </div>
            ))}
        </div>
    );

    // Render given users
    render() {
        const { users, open, followMessage } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Discover New People</h2>

                {/* Follow success alert */}
                {open && (<div className="alert alert-success">
                    {(<p>{followMessage}</p>)}
                </div>)}

                {this.renderUsers(users)}
            </div>
        );
    }
}

export default FindPeople;