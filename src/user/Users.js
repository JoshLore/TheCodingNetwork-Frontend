import React, { Component } from "react";
import { list } from "./apiUser";
import DefaultProfile from "../images/userDefault.png";
import { Link } from "react-router-dom";

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        };
    }

    // Call API for users
    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users: data });
            }
        });
    }

    // Render cards for each profile
    renderUsers = users => (
        <div className="row">
            {/* Map through given users */}
            {users.map((user, i) => (
                <div className="card col-md-4" key={i}>

                    {/* Tries to find user profile image, otherwise uses default */}
                    <img
                        style={{ width: "100%", objectFit: "cover", minHeight: "350px" }}
                        className="img-thumbnail"
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        alt={user.name}
                    />

                    {/* Display name and email */}
                    <div className="card-body" style={{ position: "relative", bottom: "0" }}>
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.email}</p>

                        {/* Link to profile */}
                        <Link
                            to={`/user/${user._id}`}
                            className="btn btn-raised btn-dark btn-sm">View Profile
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );

    // Render given users
    render() {
        const { users } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Users</h2>

                {this.renderUsers(users)}
            </div>
        );
    }
}

export default Users;