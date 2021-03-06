import React, { Component } from "react";
import { singlePost, remove, like, unlike } from "./apiPost";
import DefaultPost from "../images/mountains.jpg";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from '../auth/auth';
import Comment from './Comment';

class SinglePost extends Component {
    state = {
        post: "",
        redirectToHome: false,
        redirectToSignin: false,
        like: false,
        likes: 0,
        comments: []
    };

    // Check if user has already liked post
    checkLike = likes => {
        const userId = isAuthenticated() && isAuthenticated().user._id;
        let match = likes.indexOf(userId) !== -1;
        return match;
    };

    // Get Single Post Data
    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    post: data,
                    likes: data.likes.length,
                    like: this.checkLike(data.likes),
                    comments: data.comments
                });
            }
        });
    };


    updateComments = comments => {
        this.setState({ comments });
    };

    // Toggle like
    likeToggle = () => {

        // Redirect to sign in if not logged in
        if (!isAuthenticated()) {
            this.setState({ redirectToSignin: true });
            return false;
        }

        // Decide whether it should add a like or remove a like
        let callApi = this.state.like ? unlike : like;
        const userId = isAuthenticated().user._id;
        const postId = this.state.post._id;
        const token = isAuthenticated().token;

        // Send Like/Unlike to API
        callApi(userId, token, postId).then(data => {


            //Handling errors
            if (data.error) {
                console.log(data.error);
            } else {

                // Toggle Like State and Update Amount of Likes
                this.setState({
                    like: !this.state.like,
                    likes: data.likes.length
                });
            }
        });
    };

    // Send delete request
    deletePost = () => {
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;
        remove(postId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ redirectToHome: true });
            }
        });
    };

    // Prompt user for confirmation
    deleteConfirmed = () => {
        let answer = window.confirm('Are you sure you want to delete your account?');

        if (answer) {
            this.deletePost();
        }
    };

    // renderPost
    renderPost = post => {
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : '';
        const posterName = post.postedBy ? post.postedBy.name : ' Unknown';

        const { like, likes } = this.state

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

                {/* Displays like icon based on if user has liked post or not */}
                {like ? (
                    <h3 onClick={this.likeToggle} style={{ cursor: 'pointer', color: '#3c9dde' }}>
                        <i
                            className="fa fa-thumbs-up"
                            style={{ color: '#3c9dde' }}
                        />{' '}
                        {likes}
                    </h3>
                ) : (
                        <h3 onClick={this.likeToggle} style={{ cursor: 'pointer' }} className='text-secondary'>
                            <i
                                className="fa fa-thumbs-up"

                            />{' '}
                            {likes}
                        </h3>
                    )}

                {/*  Body */}
                <p className="card-text">{post.body}</p>
                <br />
                {/* Author and Date */}
                <p className="font-italic">
                    Posted by <Link className='text-info' to={`${posterId}`}>{posterName}</Link>{' '}
                    on {new Date(post.created).toDateString()}
                </p>

                {/* User Buttons */}
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

                    {/* Admin Controls */}
                    <div>
                        {isAuthenticated().user &&
                            isAuthenticated().user.role === "admin" && (
                                <div class="card mt-5">
                                    <div className="card-body">
                                        <h5 className="card-title">Admin</h5>
                                        <p className="mb-2 text-danger">
                                            Edit/Delete as an Admin
                                        </p>
                                        <Link
                                            to={`/post/edit/${post._id}`}
                                            className="btn btn-raised btn-warning btn-sm mr-5"
                                        >
                                            Update Post
                                        </Link>
                                        <button
                                            onClick={this.deleteConfirmed}
                                            className="btn btn-raised btn-danger"
                                        >
                                            Delete Post
                                        </button>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        );
    };

    render() {
        const { post, redirectToHome, redirectToSignin, comments } = this.state;

        // Redirect if post has been deleted
        if (redirectToHome) {
            return <Redirect to={'/'} />
        } else if (redirectToSignin) {
            return <Redirect to={'/signin'} />
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

                <Comment postId={post._id} comments={comments.reverse()} updateComments={this.updateComments} />
            </div>
        );
    }
}

export default SinglePost;