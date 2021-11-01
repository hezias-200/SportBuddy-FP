import React from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../database/actions/authActions'
import { Redirect } from 'react-router'
import { Form, FormControl, FormGroup } from 'react-bootstrap';
import firebase from '../../config/fbConfig'
import socialMediaAuth from '../../components/auth/SignInSocialMedia'
import title from '../../../src/title.png'

const SignIn = (props) => {
  const { auth} = props;
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const twiterProvider = new firebase.auth.TwitterAuthProvider();
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  const [authError, setAuthError] = React.useState();

  const handleChange = (e) => {
    setState({
      ...state, [e.target.id]: e.target.value
    })
  }

  const handleSubmit =  (e) => {
    e.preventDefault();
    props.signIn(state)
    firebase.auth().signInWithEmailAndPassword(state.email, state.password)
    .then(() => {
        props.history.push('/homepage')
    }).catch((error) => {
      var errorMessage = error.message;
      setAuthError(errorMessage)
      console.log(errorMessage);
    });
  }

  const handleOnClick = async (provider) => {
    const res = await socialMediaAuth(provider)
  }
  if (auth.uid) return <Redirect to='/homepage' />

  return (
    <div class="container">
      <div style={{ marginTop: '10%' }} class="d-flex justify-content-center h-100">
        <div class="card" style={{height:"auto"}}>
          <img src={title} alt="" srcset="" />
          <div class="card-header">
            <h3>Sign In</h3>
            <div class="d-flex justify-content-end social_icon">
              <span onClick={() => handleOnClick(facebookProvider)}><i class="fab fa-facebook-square"></i></span>
              <span onClick={() => handleOnClick(googleProvider)}><i class="fab fa-google-plus-square"></i></span>
              <span onClick={() => handleOnClick(twiterProvider)}><i class="fab fa-twitter-square"></i></span>
            </div>
          </div>
          <div class="card-body">
            <Form onSubmit={handleSubmit}>
              <FormGroup class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-user"></i></span>
                </div>
                <FormControl required id="email" type="username" onChange={handleChange} placeholder="Email" />
              </FormGroup>
              <FormGroup class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-key"></i></span>
                </div>
                <FormControl required id="password" type="password" onChange={handleChange} placeholder="Password" />
              </FormGroup>
              <div class="form-group">
                <input type="submit" value="Login" class="btn float-right login_btn" />
                <div style={{ color: 'red' }} className="center">
                  {authError ? <p>{authError}</p> : null}
                </div>
              </div>   
            </Form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center links">
              Don't have an account?<a href="signup">Sign Up</a>
            </div>
            <div className="d-flex justify-content-center">
              <a href="/forgotyourpassword">Forgot your password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}
const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }

}
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
