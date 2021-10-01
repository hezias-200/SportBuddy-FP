import React from 'react';
import { Redirect, NavLink, Route } from "react-router-dom";
import { connect } from 'react-redux'
import { signOut } from '../../database/actions/authActions';

const SignedInLinks = (props) => {
    const { auth } = props;
    if (!auth.uid) return <Redirect to='/' />
    return (
        <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="homepage">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="createvent">Create Event</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="myevents">Events</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="myprofile">My Profile</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Settings
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>

                </ul>
                
 
                    
                        <button onClick={props.signOut} class="btn btn-outline-success" type="submit">Logout</button>
                    

                

            </div>
        </div>


        // <div id="div_top_hypers"  >
        //     <ul id="ul_top_hypers"  >
        //         <li className="nav-link" >
        //             <div id="div_top_hypers" class="input-group-prepend-navbar">
        //                 < span id="div_top_hypers" class="input-group-text">
        //                     <i class="fas fa-user"></i>
        //                 </span>
        //                 <NavLink to='/myevents'>Events</NavLink>
        //             </div>
        //         </li>
        //         <li className="nav-link">
        //             <div id="div_top_hypers" class="input-group-prepend-navbar ">
        //                 < span id="div_top_hypers" class="input-group-text">
        //                     <i class="fas fa-running far fa-heart"></i>
        //                 </span>
        //                 <NavLink to='/createvent'>Create Event</NavLink>
        //             </div>
        //         </li>
        //         <li className="nav-link">
        //             <div id="div_top_hypers" class="input-group-prepend-navbar">
        //                 < span id="div_top_hypers" class="input-group-text">
        //                     <i class="far fa-comment"></i>
        //                 </span>
        //                 <NavLink className="navlink" to='/chat'>Chat</NavLink>                    </div>
        //         </li>
        //         <li className="nav-link">
        //             <div id="div_top_hypers" class="input-group-prepend-navbar">
        //                 < span id="div_top_hypers" class="input-group-text">
        //                     <i class="far fa-id-card"></i>
        //                 </span>
        //                 <NavLink to='/myprofile'>Profile</NavLink>
        //             </div>
        //         </li>
        //         <li className="nav-link">
        //             <div id="div_top_hypers" class="input-group-prepend-navbar">
        //                 < span id="div_top_hypers" class="input-group-text">
        //                     <i class="fas fa-running far fa-heart"></i>
        //                 </span>
        //                 <NavLink to='/homepage'>Map</NavLink>
        //             </div>
        //         </li>
        //         <li className="nav-link">
        //             <div id="div_top_hypers" class="input-group-prepend-navbar">
        //                 < span id="div_top_hypers" class="input-group-text">
        //                     <i class="fas fa-running far fa-heart"></i>
        //                 </span>
        //                 <NavLink to='/'>Settings</NavLink>
        //             </div>
        //         </li>
        //         <li className="nav-link"><a onClick={props.signOut}> Log Out</a> </li>
        //         <li>
        //             <NavLink to='/' className='btn btn-floating pink lighten-1' >
        //                 {props.profile.initials}
        //             </NavLink>
        //         </li>

        //     </ul>
        // </div>
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