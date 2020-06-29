import React, { Component } from "react";
import { isAuthenticated } from "../auth/auth";
import { create } from "./apiPost";
import { Redirect } from "react-router-dom";
// import DefaultProfile from "../images/userDefault.png";

// Edit Profile Class Component
class NewPost extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            body: '',
            photo: '',
            error: '',
            user: {},
            fileSize: 0,
            loading: false,
            redirectToProfile: false
        };
    }

    // Sending file to backend
    componentDidMount() {
        this.postData = new FormData();
        this.setState({ user: isAuthenticated().user });
    }

    // Check inputs are valid
    isValid = () => {

        // Validate images, file is no bigger than 100kb
        const { title, body, fileSize } = this.state;
        if (fileSize > 1000000) {
            this.setState({
                error: "File size should be less than 100kb!",
                loading: false
            });
            return false;
        }

        // Validate form
        if (title.length === 0 || body.length === 0) {
            this.setState({ error: "All fields are required", loading: false });
            return false;
        }

        return true;
    };

    // Handle client changes
    handleChange = name => event => {
        this.setState({ error: "" });
        const value = name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    // Submit changes
    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        // Check if valid
        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            // Send to API
            create(userId, token, this.postData).then(data => {

                // Handle errors 
                if (data.error) {
                    this.setState({ error: data.error });

                    // Super admin successful update
                    // } else if (isAuthenticated().user.role === "admin") {
                    //     this.setState({
                    //         redirectToProfile: true
                    //     });

                    // Successful update, redirect
                } else {
                    // updateUser(data, () => {
                    //     this.setState({
                    //         redirectToProfile: true
                    //     });
                    // });
                    this.setState({ loading: false, title: '', body: '', redirectToProfile: true });
                }
            });
        }
    };

    // Edit Profile Form
    newPostForm = (title, body) => (
        <form>
            {/* Photo */}
            <div className="form-group">
                <label className="text-muted">Post Photo</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
            </div>

            {/* Title */}
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input
                    onChange={this.handleChange("title")}
                    type="text"
                    className="form-control"
                    value={title}
                />
            </div>

            {/* Body */}
            <div className="form-group">
                <label className="text-muted">Body</label>
                <textarea
                    onChange={this.handleChange("body")}
                    type="text"
                    className="form-control"
                    value={body}
                />
            </div>


            <button onClick={this.clickSubmit} className="btn btn-raised btn-dark">
                Create Post
      </button>
        </form>
    );

    render() {
        const {
            title,
            body,
            // photo,
            user,
            error,
            loading,
            redirectToProfile
        } = this.state;

        if (redirectToProfile) {
            return <Redirect to={`/user/${user._id}`} />;
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Create a new post</h2>
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

                {isAuthenticated().user.role === "admin" &&
                    this.newPostForm(title, body)}

                {isAuthenticated().user._id &&
                    this.newPostForm(title, body)}
            </div>
        );
    }
}

export default NewPost;