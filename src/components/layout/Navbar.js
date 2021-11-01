import React, { useState } from 'react';
import { connect } from 'react-redux'
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import logo from '../../../src/logo.png'
import Navweb from 'react-bootstrap/Navbar'


const Navbar = (props) => {
    const { auth, profile } = props;
    const links = (auth.uid) ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
    
    return (
        <>
            <Navweb  fixed="top" expand="lg"    >
                <Navweb.Toggle aria-controls="basic-navbar-nav" style={{background:"white"}} />
                <Navweb.Brand  href="/">
                    <img 
                        src={logo}
                        width="90px"
                        height="60px"
                        alt="logo"
                    />
                </Navweb.Brand>
                {links}
            </Navweb>
        </>
    )
}


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile

    }
}


export default connect(mapStateToProps)(Navbar);