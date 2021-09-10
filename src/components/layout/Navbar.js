import React from 'react';
import { Link } from 'react-router-dom'
import SignOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import logo from '../../../src/logo.png'
const Navbar = (props) => {

    const { auth, profile } = props;
    const links = (auth.uid) ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <a href="http://localhost:3000/">
                <img className="navbar-logo" src={logo}  />
                </a>
                {links}
            </div>
            <h5 className="left" style={{color: "blue"}} >Hello {props.profile.firstName} {props.profile.lastName} </h5>

        </nav>
    )
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile

    }
}
export default connect(mapStateToProps)(Navbar);