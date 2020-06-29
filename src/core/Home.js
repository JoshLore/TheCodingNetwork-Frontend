import React from 'react';
import Posts from '../post/Posts'

// Home Page
const Home = () => (
    <>
        <div className="jumbotron">
            <h2 className="">The Coding Network</h2>
            <p className="lead">The Social Network for Programmers</p>
        </div>
        <div className="container">
            <Posts />
        </div>
    </>
);

export default Home;