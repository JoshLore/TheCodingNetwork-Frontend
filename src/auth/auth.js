
// LOGGING FUNCTIONS //

// Signup function that sends user data to API
export const signup = (user) => {

    return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => {
            return res.json()
        })
        .catch(err => console.log(err));
};

// Sign In function that sends user data to API
export const signin = (user) => {

    return fetch(`${process.env.REACT_APP_API_URL}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => {
            return res.json()
        })
        .catch(err => console.log(err));
};

// Removes token and redirects user to Home Page
export const signout = (next) => {

    // Check if window is ready
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt");
    }

    next();

    // Sends GET to signout
    return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
        method: "GET"
    }).then(res => {
        return res.json();
    }).catch(err => console.log(err));
};

// Sends API call send a reset link
export const forgotPassword = email => {

    // Get email
    console.log("email: ", email);

    // API Call
    return fetch(`${process.env.REACT_APP_API_URL}/forgot-password/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    })
        // Get message
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        // Handle errors
        .catch(err => console.log(err));
};

// Sends API Call to reset User's password
export const resetPassword = resetInfo => {

    // Send to API
    return fetch(`${process.env.REACT_APP_API_URL}/reset-password/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resetInfo)
    })
        // Get message
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        // Handle errors
        .catch(err => console.log(err));
};


// AUTHENTICATING FUNCTIONS //

// Authenticate the user
export const authenticate = (jwt, next) => {

    // Check if window is ready
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(jwt));
        next();
    }

};

// Checks if a user is logged in
export const isAuthenticated = () => {

    // Check if window is ready
    if (typeof window == "undefined") {
        return false;
    }

    // If there is a web token
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
};

// Social Login
export const socialLogin = user => {
    // Call API 
    return fetch(`${process.env.REACT_APP_API_URL}/social-login/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        // credentials: "include", // works only in the same origin
        body: JSON.stringify(user)
    })
        // Get API Response
        .then(response => {
            console.log("signin response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};