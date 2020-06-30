import React from 'react';
import Posts from '../post/Posts';
import Title from '../images/Title.png';

// Home Page
const Home = () => (
    <>
        <div className='container mt-5'>
            <img src={Title} alt='The Coding Network' style={{ width: '100%' }} />
            <p className='lead text-center mt-4 mb-4'>&lt; The Social Network for Programmers /&gt;</p>
        </div>

        <div className="container">
            <hr />
            <Posts />
        </div>
    </>
);

export default Home;