import React,{useCallback ,Component} from 'react'
import { withRouter,Redirect } from 'react-router'
import fbConfig from '../../config/fbConfig'
import {  signUp } from '../../database/actions/authActions'
import { connect } from 'react-redux'
import { getFirebase } from 'react-redux-firebase';


export class SignUp extends Component {
  state={
    firstName:'',
    lastName:'',
    email:'',
    password:''
  }
  handleChange=(e)=>{
    this.setState({
      [e.target.id]:e.target.value
    })
  }
  handleSubmit=(e)=>{
    e.preventDefault();
    this.props.signUp(this.state)
  }
  render() {
    const { auth, authError } = this.props; 
    if(auth.uid) return <Redirect to='/homepage'/>
    return (
      <div className="center"  style={{ width: '30rem',margin:'auto', marginTop:"8%" }}>
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="firstName">First Name :</label>
            <input id="firstName" type="text" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name :</label>
            <input id="lastName" type="text" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="email">Email :</label>
            <input id="email" type="email" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password: </label>
            <input id="password" type="password" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="password">RePassword: </label>
            <input id="password" type="password" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
            <div className="red-text center">
              {authError? <p>{authError}</p>:null }
            </div>
          </div>
          </form>        
      </div>
    )
  }
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
  
