import React,{useCallback ,Component} from 'react'
import { withRouter,Redirect } from 'react-router'
import fbConfig from '../../config/fbConfig'
import {  signUp } from '../../database/actions/authActions'
import { connect } from 'react-redux'
import { getFirebase } from 'react-redux-firebase';
import { Button, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';


 const SignUp  =(props)=> {
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    email:'',
    password:'',
   rePassword:''

  });
 
  const handleChange=(e)=>{
    setState({
      ...state,[e.target.id]:e.target.value
    })
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(state);
    props.signUp(state)
    
  }
    const { auth, authError } = props; 
    if(auth.uid) return <Redirect to='/createprofile'/>

    return (
      // <div className="center"  style={{ width: '30rem',margin:'auto', marginTop:"8%" }}>
      //   <form onSubmit={handleSubmit} className="white">
      //     <h5 className="grey-text text-darken-3">Sign Up</h5>
      //     <div className="input-field">
      //       <label htmlFor="firstName">First Name :</label>
      //       <input id="firstName" type="text" onChange={handleChange}/>
      //     </div>
      //     <div className="input-field">
      //       <label htmlFor="lastName">Last Name :</label>
      //       <input id="lastName" type="text" onChange={handleChange}/>
      //     </div>
      //     <div className="input-field">
      //       <label htmlFor="email">Email :</label>
      //       <input id="email" type="email" onChange={handleChange}/>
      //     </div>
      //     <div className="input-field">
      //       <label htmlFor="password">Password: </label>
      //       <input id="password" type="password" onChange={handleChange}/>
      //     </div>
      //     <div className="input-field">
      //       <label htmlFor="password">RePassword: </label>
      //       <input id="password" type="password" onChange={handleChange}/>
      //     </div>
      //     <div className="input-field">
      //       <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
      //       <div className="red-text center">
      //         {authError? <p>{authError}</p>:null }
      //       </div>
      //     </div>
      //     </form>        
      // </div>
      <div class="container">
      <div class="d-flex justify-content-center h-100">
        <div class="card">
          <div class="card-header">
            <h3>Sign Up</h3>
          </div>
          <div class="card-body">
            <Form onSubmit={handleSubmit}>
              <FormGroup class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-user"></i></span>
                </div>
                <FormControl required id="firstName" type="username" onChange={handleChange} placeholder="First Name" />
              </FormGroup>
              <FormGroup class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-bullseye"></i></span>
                </div>
                <FormControl required id="lastName" type="username" onChange={handleChange} placeholder="Last Name" />
              </FormGroup>
              <FormGroup class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="IoIosAt"></i></span>
                </div>
                <FormControl required id="email" type="username" onChange={handleChange} placeholder="Email" />
              </FormGroup>
              <FormGroup class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-key"></i></span>
                </div>
                <FormControl required id="password" type="username" onChange={handleChange} placeholder="Password" />
              </FormGroup>
              <FormGroup class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-key"></i></span>
                </div>
                <FormControl required id="rePassword" type="username" onChange={handleChange} placeholder="Confirm Password" />
              </FormGroup>
              <div class="form-group">
                <input type="submit" value="Sign Up" class="btn float-right login_btn" />
                <div className="red-text center">{authError ? <p>{authError}</p> : null}
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
    )
  
}
const mapStateToProps=(state)=>{
  
  return{
    auth:state.firebase.auth,
    authError:state.auth.authError
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    signUp:(newUser)=>dispatch(signUp(newUser))
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (SignUp);
  
