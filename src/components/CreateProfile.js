import { Redirect } from "react-router-dom";

import React from "react";
import { Dropdown, Selection } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import Form from 'react-bootstrap/Form'
import {  Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button'
import { Component } from "react";
import { connect } from 'react-redux'


class CreateProfile extends Component {

    state = {
        photo: '',
        age: '',
        city: '',
        description: '',

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createEvent(this.state)
        alert("Thank you!!")
        
     
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    render() {
        const {auth}=this.props;
        if(!auth.uid) return <Redirect to='/'/>
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="center" style={{ width: '30rem', margin: 'auto', marginTop: "8%" }}>
                    <Form.Group className="mb-3" >
                        <Form.Label>photo: </Form.Label>
                        <Form.Control onChange={this.handleChange} type="photo" id="photo" placeholder="Your Photo:" />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>age: </Form.Label>
                        <Form.Control onChange={this.handleChange} type="number" placeholder="age" id="age" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>city:</Form.Label>
                        <Form.Control onChange={this.handleChange} type="text" placeholder="city" id="city" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>description:</Form.Label>
                        <Form.Control onChange={this.handleChange} type="text" placeholder="description" id="description" />

                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>

        )
    }
}
const mapStateToProps=(state)=>{
    return{
        auth:state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createProfile: (event) => dispatch(createProfile(event))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile)


