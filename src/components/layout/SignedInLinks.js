import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { signOut } from '../../database/actions/authActions';
import { NavDropdown, Nav, Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
const SignedInLinks = (props) => {
  const { auth } = props;
  if (!auth.uid) return <Redirect to='/' />
  return (
    <Navbar.Collapse className="me-auto"  >
      <Nav.Link href="homepage">
        <div>
          <span class="input-group-text" style={{height:'auto', width:'auto' }}>
            <i className="fas fa-home"></i>
            <i style={{marginLeft: '4%'}}>Home</i>
          </span>
        </div>
      </Nav.Link>
      <Nav.Link href="myprofile">
        <div>
          <span class="input-group-text" style={{height: 'auto', width: 'auto' }}>
            <i className="fas fa-user"></i>
            <i style={{ marginLeft: '4%' }}>My Profile</i>
          </span>
        </div>
      </Nav.Link>
      <Nav.Link href="chat">
        <div>
          <span class="input-group-text" style={{height: 'auto', width: 'auto' }}>
            <i className="fas fa-comments"></i>
            <i style={{ marginLeft: '4%' }}>Chat</i>
          </span>
        </div>
      </Nav.Link>
      <Nav.Link href="createvent">
        <div>
          <span class="input-group-text" style={{ height: 'auto', width: 'auto' }}>
            <i className="fas fa-plus-circle"></i>
            <i style={{ marginLeft: '4%' }}>Create Event</i>
          </span>
        </div>
      </Nav.Link>
      <div  class='nav-link'  >
      <span  style={{ height: '40px', width: 'auto'}} class="input-group-text  " >
        <i className="fas fa-calendar-alt"></i>
          <NavDropdown id='colorBlack'  title="Events"  >
            <NavDropdown.Item  href="allevents">All Events</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="myevents">My Events</NavDropdown.Item>
          </NavDropdown>
      </span>
      </div>
      <div class='nav-link'  style={{marginLeft:'auto'}} >
      <span  style={{ height: '40px'}}  class="input-group-text" >
        {/* <i className="fas fa-cog"></i> */}
        <i>
          <NavDropdown id='colorBlack' title="More">
            <NavDropdown.Item href="aboutus">About us</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="contactus">Contact Us</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="tips">Tips</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item style={{textAlign:'center'}}>
              <Button onClick={props.signOut} variant="outline-danger">Logout</Button>
            </NavDropdown.Item>
          </NavDropdown>
        </i>
      </span>
      </div>
    </Navbar.Collapse>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);