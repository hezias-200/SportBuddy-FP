import React from 'react';
import { BrowserRouter, NavLink, Route } from "react-router-dom";
const SignedOutLinks = () => {
    return (
        <>
            <ul className="right">
                <li><NavLink to='/signup'>Sign up</NavLink></li>
                <li><NavLink to='/'>Login</NavLink></li>

            </ul>
        </>
    )
}
export default SignedOutLinks;