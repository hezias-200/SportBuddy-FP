import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Form, FormControl, FormGroup, InputGroup } from 'react-bootstrap';
import firebase from '../../config/fbConfig'
import swal from 'sweetalert';


const ForgotYourPassword = (props) => {
  const { auth } = props;
  const [state, setState] = React.useState({
    email: "",
  });

  const handleChange = (e) => {
    setState({
      ...state, [e.target.id]: e.target.value
    })
  }

  const handleSubmit =  (e) => {
    e.preventDefault();
    firebase.auth().sendPasswordResetEmail(state.email)
    .then(() => {
        swal("Thank You!", "The email is on the way to you");
        props.history.push('/')
    }).catch(()=>{
      swal("Error!", "Check Your email please");
    })
  }

  if (auth.uid) return <Redirect to='/homepage' />
  return (
    <div class="container">
      <div style={{ marginTop: '10%' }} class="d-flex justify-content-center h-100">
        <div class="card" style={{height:"auto"}}>
          <div class="card-body">
            <Form onSubmit={handleSubmit}>
              <FormGroup class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                </div>
                <FormControl required id="email" type="email" onChange={handleChange} placeholder="Enter Email" />
              </FormGroup>
              <div class="form-group">  
                <input type="submit"  value="Send Email" class="btn btn-warning" ></input> 
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
    auth: state.firebase.auth
  }

}

export default connect(mapStateToProps)(ForgotYourPassword);
