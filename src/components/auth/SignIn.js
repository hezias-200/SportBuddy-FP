import React,{Component} from 'react'

export default class Login extends Component {
  state={
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
    console.log(this.state);
  }
  render() {
    return (
      <div className="center" style={{ width: '30rem',margin:'auto', marginTop:"8%" }}>
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" onChange={this.handleChange}/>

          </div>
          <div className="input-field">
            <label htmlFor="password">password</label>
            <input id="password" type="password" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Sign In</button>
          </div>
          </form>        
      </div>
    )
  }
}
  
