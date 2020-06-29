import React, { Component } from "react";
import { list } from "./apiPost";
import DefaultPost from "../images/mountains.jpg";
import { Link } from "react-router-dom";

class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        };
    }

    // Call API for posts
    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        });
    }

    // Render cards for each post
    renderPosts = posts => {
        return (
            <div className="row">
                {/* Map through posts */}
                {posts.map((post, i) => {

                    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
                    const posterName = post.postedBy ? post.postedBy.name : " Unknown";

                    return (<div className="card col-md-4" key={i}>

                        {/* Display title and body */}
                        <div className="card-body">
                            <img
                                src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                                alt={post.title}
                                onError={i => i.target.src = `${DefaultPost}`}
                                className="img-thumbnail mb-3"
                                style={{ maxHeight: "100px", width: "100%", objectFit: "cover", minHeight: "100px" }}
                            />
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.body.substring(0, 100)}</p>
                            {/* Display author and date posted */}
                            <br />
                            <p className="font-italic">
                                Posted by <Link to={posterId}>
                                    {posterName}
                                </Link> on {new Date(post.created).toDateString()}
                            </p>


                            {/* Link to read more */}
                            <Link
                                to={`/post/${post._id}`}
                                className="btn float-right btn-dark btn-sm">
                                Read more
                            </Link>
                        </div>
                    </div>)
                })}
            </div>
        );
    }

    // Render given posts
    render() {
        const { posts } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">{!posts.length ? 'Loading posts...' : 'Recent Posts'}</h2>

                {this.renderPosts(posts)}
            </div>
        );
    }
}

export default Posts;