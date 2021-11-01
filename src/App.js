import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignIn from './components/auth/SignIn';
import HomePage from './components/HomePage';
import CreateEvent from './components/CreateEvent';
import Chat from './components/chat/Chat';
import MyEvents from './components/MyEvents';
import MyProfile from './components/MyProfile';
import Navbar from './components/layout/Navbar';
import SignUp from './components/auth/SignUp';
import CreateProfile from './components/CreateProfile';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import AllEvents from './components/AllEvents';
import EditEvent from './components/EditEvent';
import ForgotYourPassword from './components/auth/ForgotYourPassword';
import Tips from './components/Tips';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Navbar />
        <Switch>
          <Route exact path='/' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/tips' component={Tips} />
          <Route path='/forgotyourpassword' component={ForgotYourPassword} />
          <Route path='/createvent' component={CreateEvent} />
          <Route path='/chat' component={Chat} />
          <Route path='/myprofile' component={MyProfile} />
          <Route path='/homepage' component={HomePage} />
          <Route path='/createprofile' component={CreateProfile} />
          <Route path='/myevents' component={MyEvents} />
          <Route path='/aboutus' component={AboutUs} />
          <Route path='/contactus' component={ContactUs} />
          <Route path='/allevents' component={AllEvents} />
          <Route path='/editevent' component={EditEvent} />
        </Switch>
      </div>
    </BrowserRouter >
  );
}

export default App;
