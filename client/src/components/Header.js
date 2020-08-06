import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <>
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav>
                    <React.Fragment>
                        <span>Welcome, firstname lastname</span>
                        <Link className="signout" to='/signout'>Sign Out</Link>
                    </React.Fragment>
                    <React.Fragment>
                        <Link className="signup" to='/signup'>Sign Up</Link>
                        <Link className="signin" to='/signin'>Sign In</Link>
                    </React.Fragment>
                </nav>
            </div>
        </div>
        <hr />
        </>
    )
}

export default Header
