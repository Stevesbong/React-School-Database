import React from 'react'

const NotFound = () => {
    return (
        <div className="bounds">
            <li className="not-found">
                <h1>404 - Page Not Found </h1>
                <hr className="line" />
                <p>Oops!  It looks like the page you're looking for <strong>does not exist.</strong></p>
                <div className="grid-100 pad-bottom">
                    <a href='/'>
                        <button className="button button-secondary">Home</button>
                    </a>
                </div>
            </li>
        </div>
    )
}

export default NotFound;
