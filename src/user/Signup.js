import React, { useState } from 'react';
import { signup } from '../auth/auth';

// Page for sign up
const Signup = () => {

    // Setting State 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    // Event handler for when user submits form
    const clickSubmit = event => {
        event.preventDefault();

        const user = {
            name: name,
            email: email,
            password: password
        };

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

            {/* Submit */}
            <button className="btn btn-raised btn-dark" onClick={clickSubmit}>Submit</button>
        </form>
    );

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
                Signup success! Please Sign In.
            </div>

            {signupForm()}
        </div>
    );
};

export default Signup;