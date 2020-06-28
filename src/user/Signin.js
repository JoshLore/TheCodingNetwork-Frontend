import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { signin, authenticate } from '../auth/auth';

// Page for sign up
const Signin = () => {

    // Setting State 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [redirectToReferer, setRedirectToReferer] = useState(false);
    const [loading, setLoading] = useState(false);

    // Event handler for when user submits form
    const clickSubmit = event => {
        event.preventDefault();

        setLoading(true);

        const user = {
            email: email,
            password: password
        };

        // Submit user to signin function
        signin(user).then(data => {

            // If error occurs, set error state
            if (data.error) {
                setError(data.error);
                setLoading(false);
            } else {
                // Authenticate user and then redirect
                authenticate(data, () => {
                    setRedirectToReferer(true);
                });
            }
        });
    };

    // Sign In Form JSX
    const signinForm = () => (
        <form>

            {/* Email */}
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" value={email} onChange={e => {
                    setEmail(e.target.value);
                    setError("");
                }} className="form-control" />
            </div>

            {/* Password */}
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" value={password} onChange={e => {
                    setPassword(e.target.value);
                    setError("");
                }} className="form-control" />
            </div>
            <button className="btn btn-raised btn-dark" onClick={clickSubmit}>Submit</button>
        </form>
    );

    // If user is logged in, redirect to Home Page=
    if (redirectToReferer) {
        return <Redirect to="/" />
    }

    // JSX for Sign In page
    return (
        <div className="container">
            {/* Title */}
            <h2 className="mt-5 mb-5">Sign In</h2>

            {/* Displays error if there is an error */}
            <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                {error}
            </div>

            {/* Displays loading when waiting for respone */}
            {loading ? <div className="jumbotron text-center">Loading...</div> : ""}


            {/* Sign In Form */}
            {signinForm()}
        </div>
    );
};

export default Signin;