import React, { useState } from 'react';
import { signup } from '../auth/auth';
import { Link } from 'react-router-dom';

// Page for sign up
const Signup = () => {

    // Setting State 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const [captcha, setCaptcha] = useState(false);

    // Event handler for when user submits form
    const clickSubmit = event => {
        event.preventDefault();

        const user = {
            name: name,
            email: email,
            password: password
        };

        // Check if Captcha is correct
        if (captcha) {
            // Submit user to signup function and display a message with resulting outcome
            signup(user).then(data => {

                // If error occurs, set error state
                if (data.error) {
                    setError(data.error);
                } else {
                    // If sign up succeful, reset form fields and display success message
                    setName("");
                    setEmail("");
                    setPassword("");
                    setError("");
                    setOpen(true);
                }
            });

        } else {
            setError('What day is it today? Please write a correct answer.');
        }
    };

    // Signup Form JSX
    const signupForm = () => (
        <form>

            {/* Name */}
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" value={name} onChange={e => {
                    setName(e.target.value);
                    // Setting error back to default when user begins to type again
                    setError("");
                }} className="form-control" />
            </div>

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

    // JSX for Signup page
    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Sign Up</h2>

            {/* Displays error if there is an error */}
            <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                {error}
            </div>

            {/* Displays if signup was sucessful */}
            <div className="alert alert-info" style={{ display: open ? "" : "none" }}>
                Signup success! Please <Link to="/signin">Sign In!</Link>.
            </div>

            {signupForm()}
        </div>
    );
};

export default Signup;