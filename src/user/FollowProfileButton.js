import React from "react";
import { follow, unfollow } from "./apiUser";

const FollowProfileButton = (props) => {
    const followClick = () => {
        props.onButtonClick(follow);
    };

    const unfollowClick = () => {
        props.onButtonClick(unfollow);
    };

    return (
        <div className="d-inline-block">
            {/* Check if following user already */}
            {/* If not, show follow button (default) */}
            {/* If so, show unfollow */}
            {!props.following ? (
                <button onClick={followClick} className="btn btn-raised mr-5 text-light" style={{ backgroundColor: '#3c9dde' }}>
                    Follow
                </button>
            ) : (
                    <button onClick={unfollowClick} className="btn btn-warning btn-raised">
                        UnFollow
                    </button>
                )
            }
        </div>
    );

};

export default FollowProfileButton;