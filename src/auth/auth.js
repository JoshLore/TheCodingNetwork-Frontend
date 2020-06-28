
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