import React from 'react';
import { Link } from 'react-router-dom';
import DefaultProfile from '../images/userDefault.png';

const ProfileTabs = (props) => {
    const { following, followers, posts } = props;

    return (
        <div>
            <div className="row">
                <div className="col-md-4">
                    <h3 className="text-secondary">{followers.length} Followers</h3>
                    <hr />
                    {/* Iterate through follower users */}
                    {followers.map((person, i) => (
                        <div key={i}>
                            <div>
                                <Link className='text-info' to={`/user/${person._id}`}>

                                    {/* User's avatar */}
                                    <img
                                        style={{ borderRadius: "50%", border: "1px solid black" }}
                                        className="float-left mr-2"
                                        height="30px"
                                        width="30px"
                                        onError={i =>
                                            // Display default profile avatar
                                            (i.target.src = `${DefaultProfile}`)
                                        }
                                        src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                                        alt={person.name}
                                    />

                                    {/* User's name */}
                                    <div>
                                        <p className="lead">{person.name}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="col-md-4">
                    <h3 className="text-secondary">{following.length} Following</h3>
                    <hr />
                    {/* Iterate through following users */}
                    {following.map((person, i) => (
                        <div key={i}>
                            <div>
                                <Link className='text-info' to={`/user/${person._id}`}>

                                    {/* User's avatar */}
                                    <img
                                        style={{ borderRadius: "50%", border: "1px solid black" }}
                                        className="float-left mr-2"
                                        height="30px"
                                        width="30px"
                                        onError={i =>
                                            (i.target.src = `${DefaultProfile}`)
                                        }
                                        // Display default profile avatar
                                        src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                                        alt={person.name}
                                    />
                                    {/* User's name */}
                                    <div>
                                        <p className="lead">{person.name}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Display posts */}
                <div className="col-md-4">
                    <h3 className="text-secondary">{posts.length} Posts</h3>
                    <hr />
                    {posts.map((post, i) => (
                        <div key={i}>
                            <div>
                                <Link className='text-info' to={`/post/${post._id}`}>
                                    <div>
                                        <p className="lead">{post.title}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProfileTabs;