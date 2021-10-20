import React from 'react';
import { BrowserRouter, NavLink, Route } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap';

const SignedOutLinks = () => {
    return (

            <div class='nav-link'  style={{marginLeft:'auto'}} >
        <Navbar.Collapse className="me-auto"  >
            <Nav.Link href="/">
                <div>
                    <span class="input-group-text" style={{ height: 'auto', width: 'auto' }}>
                        <i className="fas fa-user-alt"></i>
                        <i style={{ marginLeft: '4%' }}>Login</i>
                    </span>
                </div>
            </Nav.Link>
            <Nav.Link href="signup">
                <div>
                    <span class="input-group-text" style={{ height: 'auto', width: 'auto' }}>
                        <i className="fas fa-user-plus"></i>
                        <i style={{ marginLeft: '4%' }}>Sign Up</i>
                    </span>
                </div>

            </Nav.Link>
        </Navbar.Collapse>
            </div>

    )
}
export default SignedOutLinks;