import React, { Component } from "react";
import { isAuthenticated } from "../auth/auth";
import { read, update, updateUser } from "./apiUser";
import { Redirect } from "react-router-dom";
import DefaultProfile from "../images/userDefault.png";

// Edit Profile Class Component
class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            name: "",
            email: "",
            password: "",
            redirectToProfile: false,
            error: "",
            fileSize: 0,
            loading: false,
            about: ""
        };
    }

    // Initialize form with prepopulated user information
    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirectToProfile: true });
            } else {
                this.setState({
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    error: "",
                    about: data.about
                });
            }
        });
    };

    // Sending file to backend
    componentDidMount() {
        this.userData = new FormData();
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    // Check inputs are valid
    isValid = () => {

        // Validate images, file is no bigger than 100kb
        const { name, email, password, fileSize } = this.state;
        if (fileSize > 1000000) {
            this.setState({
                error: "File size should be less than 100kb!",
                loading: false
            });
            return false;
        }

        // Validate name
        if (name.length === 0) {
            this.setState({ error: "Name is required", loading: false });
            return false;
        }

        // Validate emails. Follow: email@domain.com
        // VS Code dev:
        // eslint-disable-next-line no-useless-escape
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            this.setState({
                error: "A valid Email is required",
                loading: false
            });
            return false;
        }

        // Validate password
        if (password.length >= 1 && password.length <= 5) {
            this.setState({
                error: "Password must be at least 6 characters long",
                loading: false
            });
            return false;
        }
        return true;
    };

    // Handle client changes
    handleChange = name => event => {
        this.setState({ error: "" });
        const value = name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.userData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    // Submit changes
    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        // Check if valid
        if (this.isValid()) {
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;

            // Send to API
            update(userId, token, this.userData).then(data => {

                // Handle errors 
                if (data.error) {
                    this.setState({ error: data.error });

                    // Super admin successful update
                } else if (isAuthenticated().user.role === "admin") {
                    this.setState({
                        redirectToProfile: true
                    });

                    // Successful update, redirect
                } else {
                    updateUser(data, () => {
                        this.setState({
                            redirectToProfile: true
                        });
                    });
                }
            });
        }
    };

    // Edit Profile Form
    editProfileForm = (name, email, password, about) => (
        <form>
            {/* Change Profile Photo */}
            <div className="form-group">
                <label className="text-muted">Profile Photo</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
            </div>

            {/* Change Profile Name */}
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={this.handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>

            {/* Change Profile Email */}
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={this.handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>

            {/* Change Profile About */}
            <div className="form-group">
                <label className="text-muted">About</label>
                <textarea
                    onChange={this.handleChange("about")}
                    type="text"
                    className="form-control"
                    value={about}
                />
            </div>

            {/* Change Profile Password */}
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={this.handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button onClick={this.clickSubmit} className="btn btn-raised btn-dark">
                Update
      </button>
        </form>
    );

    render() {
        const {
            id,
            name,
            email,
            password,
            redirectToProfile,
            error,
            loading,
            about
        } = this.state;

        if (redirectToProfile) {
            return <Redirect to={`/user/${id}`} />;
        }

        const photoLink = `${process.env.REACT_APP_API_URL}/user/photo/${id}` === undefined;

        const photoUrl = (id && !photoLink.error) ?
            `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}`
            : DefaultProfile;

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>
                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                        ""
                    )}

                <img
                    style={{ height: "200px", width: "auto" }}
                    className="img-thumbnail"
                    src={photoUrl}
                    onError={i => (i.target.src = `${DefaultProfile}`)}
                    alt={name}
                />

                {isAuthenticated().user.role === "admin" &&
                    this.editProfileForm(name, email, password, about)}

                {isAuthenticated().user._id === id &&
                    this.editProfileForm(name, email, password, about)}
            </div>
        );
    }
}

export default EditProfile;