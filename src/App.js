import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignIn from './components/auth/SignIn';
import HomePage from './components/HomePage';
import CreateEvent from './components/CreateEvent';
import Friends from './components/Friends';
import Chat from './components/Chat';
import MyEvents from './components/MyEvents';
import MyProfile from './components/MyProfile';
import Navbar from './components/layout/Navbar';
import SignUp from './components/auth/SignUp';
// import Register from './Register';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
        <Route exact path='/' component={SignIn}/>
        <Route  path='/signup' component={SignUp}/>
        <Route  path='/createvent' component={CreateEvent}/>
        <Route  path='/chat' component={Chat}/>
        <Route  path='/myprofile' component={MyProfile}/>
        <Route  path='/homepage' component={HomePage}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
