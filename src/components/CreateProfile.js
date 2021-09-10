import { Redirect } from "react-router-dom";

import React from "react";
import { Dropdown, Selection } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import Form from 'react-bootstrap/Form'
import { Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button'
import { Component } from "react";
import { connect } from 'react-redux'
import { createProfile } from '../database/actions/authActions'


function CreateProfile(props) {
    const [state, setState] = React.useState({
        photo: '',
        age: '',
        city: '',
        description: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        props.createProfile(state)
        alert("Thank you!!")


    }
    const handleChange = (e) => {
        setState({
            ...state, [e.target.id]: e.target.value
        })
    }
    const { auth } = props;
    
    if (!auth.uid) return <Redirect to='/' />
    return (
        <div>
            <Form onSubmit={handleSubmit} className="center" style={{ width: '30rem', margin: 'auto', marginTop: "8%" }}>
                <Form.Group className="mb-3" >
                    <Form.Label>photo: </Form.Label>
                    <Form.Control onChange={handleChange} type="file" id="photo" placeholder="Your Photo:" />

                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>age: </Form.Label>
                    <Form.Control onChange={handleChange} type="number" placeholder="age" id="age" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>city:</Form.Label>
                    <Form.Control onChange={handleChange} type="text" placeholder="city" id="city" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>description:</Form.Label>
                    <Form.Control onChange={handleChange} type="text" placeholder="description" id="description" />

                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createProfile: (newUser) => dispatch(createProfile(newUser))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile)


