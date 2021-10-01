import React from 'react';
import { Link } from 'react-router-dom'
import SignOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import logo from '../../../src/logo.png'
const Navbar = (props) => {
    console.log(props);
    const { auth, profile } = props;
    const links = (auth.uid) ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <div class="container-fluid">

            <a class="navbar-brand" href="#">

                <img src={logo} alt="logo" width="60px" height="45px" className="d-inline-block align-text-top" />
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>

            </button>
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