import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ context }) => {
    const authenticated = context.authenticatedUser;
    return (
        <>
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav>
                    { authenticated ? <React.Fragment>
                                        <span>Welcome, { authenticated.firstName } { authenticated.lastName }</span>
                                        <Link className="signout" to='/signout'>Sign Out</Link>
                                    </React.Fragment> 
                                    : <React.Fragment>
                                        <Link className="signup" to='/signup'>Sign Up</Link>
                                        <Link className="signin" to='/signin'>Sign In</Link>
                                    </React.Fragment> }
                </nav>
            </div>
        </div>
        <hr />
        </>
    )
}

export default Header
