import React from 'react';
import { BrowserRouter, NavLink, Route } from "react-router-dom";
import {connect} from 'react-redux'
import { signOut } from '../../database/actions/authActions';
import HomePage from '../HomePage'
const SignedInLinks = (props) => {
    return (
            <ul className="right">
                <li><NavLink to='/createvent'>Create Event</NavLink></li>
                <li><NavLink to='/signup'>Sign up</NavLink></li>
                <li><NavLink to='/chat'>Chat</NavLink></li>
                <li><NavLink to='/myprofile'>Profile</NavLink></li>
                <li><NavLink to='/homepage'>Map</NavLink></li>
                <li><NavLink to='/'>Settings</NavLink></li>
                <li><a onClick={props.signOut}> Log Out</a> </li>
                <li><NavLink to='/' className='btn btn-floating pink lighten-1' ></NavLink></li>
            </ul> 
    )
}
const mapDispatchToProps=(dispatch)=>{
    return{
        signOut:()=>dispatch(signOut())
    }
}
export default connect(null,mapDispatchToProps)(SignedInLinks);