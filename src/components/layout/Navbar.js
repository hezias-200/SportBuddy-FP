import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import SignOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import logo from '../../../src/logo.png'
const Navbar = (props) => {
    const [isOpen, SetIsOpen] = useState(false)
    const { auth, profile } = props;
    const links = (auth.uid) ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-white">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img src={logo} alt="logo" width="30" height="24" className="d-inline-block align-text-top " />
                </a>
                {links}
            </div>
        </nav>
        // <div>
        //     <div  className="navbar-brand" >
        //         <a href="#">
        //             <img src={logo} alt="logo" width="60px" height="45px" className="d-inline-block align-text-top" />
        //         </a>
        //     </div>
        //     <div className="right">{links}</div>
        // </div>


    )
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile

    }
}
export default connect(mapStateToProps)(Navbar);