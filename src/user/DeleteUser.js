import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth/auth';
import { remove } from './apiUser';
import { signout } from '../auth/auth';

const DeleteUser = (props) => {

    const [redirect, setRedirect] = useState(false);

    // Prompt user for confirmation
    const deleteConfirmed = () => {
        let answer = window.confirm("Are you sure you want to delete your account?");

        if (answer) {
            deleteAccount();
        }
    };

    // Delete user's account
    const deleteAccount = () => {
        const token = isAuthenticated().token;
        const userId = props.userId;

        // Have helper remove() user
        remove(userId, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    // Sign out User and Redirect
                    signout(() => console.log("User is deleted"));
                    setRedirect(true);
                }
            });
    };

    // Redirect if user has been deleted
    if (redirect) {
        return <Redirect to="/" />
    }

    // Button for deleting profile
    return (
        <button onClick={deleteConfirmed} className="btn btn-raised btn-danger">
            Delete Profile
        </button>
    );
};

export default DeleteUser;
