import React from 'react'
import { signUp } from '../../database/actions/authActions'
import { connect } from 'react-redux'
import { Form, FormControl, FormGroup } from 'react-bootstrap';
import { Redirect, Link } from "react-router-dom";
import firebase from '../../config/fbConfig'

const SignUp = (props) => {
  const { auth, authError } = props;
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    email: '',
    password: '',
    rePassword: ''
  });

  const handleChange = (e) => {

    setState({
      ...state, [e.target.id]: e.target.value
    })
  }
  const handleSubmit =  (e) => {
    e.preventDefault();
    if (state.password == state.rePassword)
       props.signUp(state)
       firebase.auth().onAuthStateChanged((user) => {
        if (user) {
              props.history.push('/createprofile')
        }
      });
  }

  return (
    <div class="container">
      <div style={{ marginTop: '10%' }} class="d-flex justify-content-center h-100">
        <div class="card">
          <div class="card-header">
            <h3>Sign Up</h3>
          </div>
          <div class="card-body">
            <Form onSubmit={handleSubmit}>
              <FormGroup class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i></i>1</span>
                </div>
                <FormControl required id="firstName" type="username" onChange={handleChange} placeholder="First Name" />
              </FormGroup>
              <FormGroup class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i>2</i></span>
                </div>
                <FormControl required id="lastName" type="username" onChange={handleChange} placeholder="Last Name" />
              </FormGroup>
              <FormGroup class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i>3</i></span>
                </div>
                <FormControl required id="email" type="email" onChange={handleChange} placeholder="Email" />
              </FormGroup>
              <FormGroup class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i >4</i></span>
                </div>
                <FormControl required id="password" type="password" onChange={handleChange} placeholder="Password" />
              </FormGroup>
              <FormGroup class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i >5</i></span>
                </div>
                <FormControl required id="rePassword" type="password" onChange={handleChange} placeholder="Confirm Password" />
              </FormGroup>
              <div class="form-group">
                <input type="submit" value="Sign Up" class="btn float-right login_btn" />
                <div style={{ color: 'red' }} className="center">{authError ? <p>{authError}</p> : null}
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

