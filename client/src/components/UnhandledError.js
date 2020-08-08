import React from 'react';

const UnhandledError = () => {
    return (
        <div className="bounds">
            <li className="not-found">
                <h1>Error</h1>
                <hr className="line" />
                <p>Sorry! We just encountered an unexpected error.</p>
                <div className="grid-100 pad-bottom">
                    <a href='/'>
                        <button className="button button-secondary">Home</button>
                    </a>
                </div>
            </li>
        </div>
    )
}

export default UnhandledError;
