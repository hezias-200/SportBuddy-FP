import React from 'react';
import { BrowserRouter, NavLink, Route } from "react-router-dom";
const SignedInLinks=()=>{
    return(
<ul className="right">
    <li><NavLink to='/createvent'>Create Event</NavLink></li>
    <li><NavLink to='/signup'>sighn up</NavLink></li>
    <li><NavLink to='/chat'>chat</NavLink></li>
    <li><NavLink to='/myprofile'>profile</NavLink></li>
    <li><NavLink to='/homepage'>map</NavLink></li>



    <li><NavLink to='/'>Settings</NavLink></li>
    <li><NavLink to='/'>Log Out</NavLink></li>
    <li><NavLink to='/' className='btn btn-floating pink lighten-1' ></NavLink></li>

    

</ul>
    )
}
export default SignedInLinks;