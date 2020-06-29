import React, { Component } from "react";
import { isAuthenticated } from "../auth/auth";
import { singlePost, update } from "./apiPost";
import { Redirect } from "react-router-dom";
import DefaultPost from "../images/mountains.jpg";

// Edit Profile Class Component
class EditPost extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            title: '',
            body: '',
            photo: '',
            error: '',
            fileSize: 0,
            loading: false,
            redirectToPost: false
        };
    }

    // Initialize form with prepopulated post information
    init = postId => {
        singlePost(postId).then(data => {

            // Hanlding errors 
            if (data.error) {
                this.setState({ redirectToPost: true });
            } else {
                // Populate data
                this.setState({
                    id: data._id,
                    title: data.title,
                    body: data.body,
                    error: ''
                });
            }
        });
    };

    // Sending file to backend
    componentDidMount() {
        this.postData = new FormData();
        const postId = this.props.match.params.postId;
        this.init(postId);
    };

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
            const postId = this.state.id;
            const token = isAuthenticated().token;

            // Send to API
            update(postId, token, this.postData).then(data => {

                // Handle errors 
                if (data.error) {
                    this.setState({ error: data.error });

                    // Super admin successful update
                    // } else if (isAuthenticated().user.role === "admin") {
                    //     this.setState({
                    //         redirectToPost: true
                    //     });

                    // Successful update, redirect
                } else {
                    // updateUser(data, () => {
                    //     this.setState({
                    //         redirectToPost: true
                    //     });
                    // });
                    this.setState({ loading: false, title: '', body: '', redirectToPost: true });
                }
            });
        }
    };

    // Edit Profile Form
    editPostForm = (title, body) => (
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
                Update Post
      </button>
        </form>
    );

    render() {
        const {
            id,
            title,
            body,
            error,
            loading,
            redirectToPost
        } = this.state;

        if (redirectToPost) {
            return <Redirect to={`/post/${id}`} />;
        }

        const photoLink = `${process.env.REACT_APP_API_URL}/post/photo/${id}` === undefined;

        const photoUrl = (id && !photoLink.error) ?
            `${process.env.REACT_APP_API_URL}/post/photo/${id}?${new Date().getTime()}`
            : DefaultPost;

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">{title}</h2>

                <img
                    style={{ height: "200px", width: "auto" }}
                    className="img-thumbnail"
                    src={photoUrl}
                    onError={i => (i.target.src = `${DefaultPost}`)}
                    alt={title}
                />

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
                    this.editPostForm(title, body)}

                {isAuthenticated().user._id &&
                    this.editPostForm(title, body)}
            </div>
        );
    }
}

export default EditPost;