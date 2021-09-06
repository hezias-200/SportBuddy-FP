import React from 'react';
import { Redirect, NavLink, Route } from "react-router-dom";
import { connect } from 'react-redux'
import { signOut } from '../../database/actions/authActions';

const SignedInLinks = (props) => {
    const {auth}=props;
    if(!auth.uid) return <Redirect to='/'/>
    return (
        <ul className="right">
            <li><NavLink to='/createvent'>Create Event</NavLink></li>
            <li><NavLink to='/chat'>Chat</NavLink></li>
            <li><NavLink to='/myprofile'>Profile</NavLink></li>
            <li><NavLink to='/homepage'>Map</NavLink></li>
            <li><NavLink to='/'>Settings</NavLink></li>
            <li><a onClick={props.signOut}> Log Out</a> </li>
            <li>
                <NavLink to='/' className='btn btn-floating pink lighten-1' >
                    {props.profile.initials}
                </NavLink>
            </li>
        </ul>
    )
}

const mapStateToProps=(state)=>{
    return{
        auth:state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);