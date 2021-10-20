import React, { useState } from 'react';
import { connect } from 'react-redux'
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import logo from '../../../src/logo.png'
import Navweb from 'react-bootstrap/Navbar'


const Navbar = (props) => {
    const [isOpen, SetIsOpen] = useState(false)
    const { auth, profile } = props;
    const links = (auth.uid) ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
    
    return (
        <>
            <Navweb style={{ paddingTop: '0', paddingBottom: '0' }} bg="light" fixed="top" expand="lg"   >
                <Navweb.Toggle aria-controls="basic-navbar-nav" />
                <Navweb.Brand style={{ paddingTop: '0', paddingBottom: '0' }} href="/">
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