import React, { Component } from "react";
import { singlePost, remove } from "./apiPost";
import DefaultPost from "../images/mountains.jpg";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from '../auth/auth';

class SinglePost extends Component {
    state = {
        post: "",
        redirectToHome: false
    };

    // Get Single Post Data
    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ post: data });
            }
        });
    };

    // Send delete request
    deletePost = () => {
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;
        remove(postId, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({ redirectToHome: true });
            }
        });
    };

    // Prompt user for confirmation
    deleteConfirmed = () => {
        let answer = window.confirm("Are you sure you want to delete your account?");

        if (answer) {
            this.deletePost();
        }
    };

    // renderPost
    renderPost = post => {
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
        const posterName = post.postedBy ? post.postedBy.name : " Unknown";

        return (
            <div className="card-body">
                {/* Image. Banner on large devices, thumbnail on small. */}
                <img
                    src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                    alt={post.title}
                    onError={i => (i.target.src = `${DefaultPost}`)}
                    className="img-thunbnail mb-3"
                    style={{ maxHeight: "300px", width: "100%", objectFit: "cover" }}
                />

                {/*  Body */}
                <p className="card-text">{post.body}</p>
                <br />
                {/* Author and Date */}
                <p className="font-italic">
                    Posted by <Link to={`${posterId}`}>{posterName} </Link>
                    on {new Date(post.created).toDateString()}
                </p>

                {/* Buttons */}
                <div className="d-inline-block">
                    {/* Back to Posts Button */}
                    <Link to={`/`} className="btn btn-raised btn-dark btn-sm mr-5">
                        Back to posts
                    </Link>

                    {isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id && (
                        <>
                            {/* Update Button */}
                            <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-success btn-sm mr-5">
                                Update Post
                            </Link>

                            {/* Delete Button */}
                            <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger btn-sm mr-5">
                                Delete Post
                            </button>
                        </>
                    )}
                </div>
            </div>
        );
    };

    render() {
        const { post, redirectToHome } = this.state;

        // Redirect if post has been deleted
        if (redirectToHome) {
            return <Redirect to={'/'} />
        }

        return (
            <div className="container">
                {/* Title */}
                <h2 className="display-2 mt-5 mb-5">{post.title}</h2>

                {/* Loading */}
                {!post ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                        this.renderPost(post)
                    )}
            </div>
        );
    }
}

export default SinglePost;