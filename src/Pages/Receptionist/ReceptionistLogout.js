//----------------------
////Author: w1822557
//----------------------

import React from 'react';

function Logout(props) {
    const handleLogout = () => {
        // Clear the user's session data and redirect to the login page
        props.history.push('/login');
    };

    return (
        <div>
            <h1>Logout</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Logout;