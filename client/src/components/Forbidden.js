import React from 'react'

const Forbidden = () => {
    return (
        <div className="bounds">
            <li className="not-found">
                <h1>Forbidden</h1>
                <hr className="line" />
                <p>Oh oh! You can't access this page.</p>
                <div className="grid-100 pad-bottom">
                    <a href='/'>
                        <button className="button button-secondary">Home</button>
                    </a>
                </div>
            </li>
        </div>
    )
}

export default Forbidden;
