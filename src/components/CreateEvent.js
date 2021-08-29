import { Redirect } from "react-router-dom";

import React from "react";
import { Dropdown, Selection } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import Form from 'react-bootstrap/Form'
import { InputGroup, FormControl, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button'
import { render } from "@testing-library/react";
import { createEvent } from "../account/actions/projectActions";
import { Component } from "react";
import { connect } from 'react-redux'
import { NavLink } from "react-router-dom";


class CreateEvent extends Component {

    state = {
        eventName: '',
        startDate: '',
        startWorkOut: '',
        workOutDuration: '',
        numberOfParticipants: '',
        minAge: '',
        activityType: '',
        location: '',
        gender:'',
        description: '',

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createEvent(this.state)
        alert("Your Event Created Enjoy")
        this.props.history.push('/');
        
     
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
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Event Name: </Form.Label>
                        <Form.Control onChange={this.handleChange} type="text" id="eventName" placeholder="Event Name:" />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Start Date: </Form.Label>
                        <Form.Control onChange={this.handleChange} type="date" placeholder="date" id="startDate" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Start Work Out:</Form.Label>
                        <Form.Control onChange={this.handleChange} type="time" placeholder="startWorkOut" id="startWorkOut" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>End Work Out:</Form.Label>
                        <Form.Control onChange={this.handleChange} type="time" placeholder="workOutDuration" id="workOutDuration" />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>numberOfParticipants:</Form.Label>
                        <Form.Control onChange={this.handleChange} type="number" placeholder="numberOfParticipants" id="workOutDuration" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Min Age: :</Form.Label>
                        <Form.Control onChange={this.handleChange} type="number" placeholder="Min Age" id="minAge" />
                    </Form.Group>
                    <Row  xs="2">
                        <label>
                            <input onChange={this.handleChange} id="gender" type="checkbox" class="filled-in" />
                            <span>Man</span>
                        </label>
                        <label>
                            <input onChange={this.handleChange} id="gender" type="checkbox" class="filled-in" />
                            <span>Women</span>
                        </label>
                    </Row>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Location: </Form.Label>
                        <Form.Control onChange={this.handleChange} id="location" type="text" placeholder="Location" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Description: </Form.Label>
                        <Form.Control onChange={this.handleChange} id="description" type="text" placeholder="Description" />
                    </Form.Group>
                    <Dropdown
                        placeholder="Select an option"
                        className="my-className"
                        options={['Football', 'Basketball', 'Yoga', 'StreetWork', 'Running', 'Other']}
                        value="Football"
                        onChange={(value) => value}
                        onSelect={(value) => value} // always fires once a selection happens even if there is no change
                        id="selectAnOption"
                    />

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
        createEvent: (event) => dispatch(createEvent(event))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent)


