import React, { Component } from "react";
import { singlePost } from "./apiPost";
import DefaultPost from "../images/mountains.jpg";
import { Link } from "react-router-dom";

class SinglePost extends Component {
    state = {
        post: ""
    };

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
                {/* Back to Posts Button */}
                <Link to={`/`} className="btn btn-raised btn-dark btn-sm">
                    Back to posts
                </Link>
            </div>
        );
    };

    render() {
        const { post } = this.state;
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