import React,{Component} from 'react'

export default class SignUp extends Component {
  state={
    email:'',
    password:'',
    firstName:'',
    lastName:''
  }
  handleChange=(e)=>{
    this.setState({
      [e.target.id]:e.target.value
    })
  }
  handleSubmit=(e)=>{
    e.preventDefault();
    console.log(this.state);
  }
  render() {
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
            <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
          </div>
          </form>        
      </div>
    )
  }
}
  
