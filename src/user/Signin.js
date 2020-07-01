import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { signin, authenticate } from '../auth/auth';
import SocialLogin from './SocialLogin';

// Page for sign up
const Signin = () => {

    // Setting State 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [redirectToReferer, setRedirectToReferer] = useState(false);
    const [loading, setLoading] = useState(false);
    const [captcha, setCaptcha] = useState(false);

    // Event handler for when user submits form
    const clickSubmit = event => {
        event.preventDefault();

        setLoading(true);

        const user = {
            email: email,
            password: password
        };

        // Check if captcha is correct
        if (captcha) {
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
        } else {
            setLoading(false);
            setError('What day is it today? Please write a correct answer.');
        }
    };

    const captchaHandler = e => {
        setError('');
        let userDay = e.target.value.toLowerCase();
        let dayCount;

        // Assigns the day submitted as an int
        if (userDay === "sunday") {
            dayCount = 0;
        } else if (userDay === "monday") {
            dayCount = 1;
        } else if (userDay === "tuesday") {
            dayCount = 2;
        } else if (userDay === "wednesday") {
            dayCount = 3;
        } else if (userDay === "thursday") {
            dayCount = 4;
        } else if (userDay === "friday") {
            dayCount = 5;
        } else if (userDay === "saturday") {
            dayCount = 6;
        }

        // Compares the number with today's day (.getDay() returns int for the day, Sunday = 0)
        if (dayCount === new Date().getDay()) {
            setCaptcha(true);
            return true;
        } else {
            setCaptcha(false);
            return false;
        }
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

            {/* Captcha */}
            <div className="form-group">
                <label className="text-muted">
                    {captcha ? "Thanks. You got it!" : "Captcha: What day is today?"}
                </label>

                <input
                    onChange={captchaHandler}
                    type="text"
                    className="form-control"
                />
            </div>

            {/* Submit */}
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

            <hr />
            <SocialLogin />
            <hr />

            {/* Displays error if there is an error */}
            <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                {error}
            </div>

            {/* Displays loading when waiting for respone */}
            {loading ? <div className="jumbotron text-center">Loading...</div> : ""}


            {/* Sign In Form */}
            {signinForm()}

            <p>
                <Link to="/forgot-password" className="text-danger">
                    {" "}
                    Forgot Password
                </Link>
            </p>
        </div>
    );
};

export default Signin;