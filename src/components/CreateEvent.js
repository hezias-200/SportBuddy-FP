
import React from "react";
import { Dropdown, Selection } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {  render } from "@testing-library/react";
import { createEvent } from "../account/actions/projectActions";
import { Component } from "react";
import {connect} from 'react-redux'


class CreateEvent extends Component {
    state={
        eventName:'',
        location:'',
        description:'',
        selectAnOption:''
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.createEvent(this.state)
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    render(){
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="center" style={{ width: '30rem', margin: 'auto', marginTop: "8%" }}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Event Name: </Form.Label>
                        <Form.Control type="email"  id ="eventName" placeholder="Event Name:" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Location: </Form.Label>
                        <Form.Control  id ="location" type="text" placeholder="Location" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Description: </Form.Label>
                        <Form.Control id="description" type="text" placeholder="Description" />
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
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Other: </Form.Label>
                        <Form.Control onChange={this.handleChange} type="text" placeholder="Other" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createEvent: (event) => dispatch(createEvent(event))
    }
}
export default connect(null, mapDispatchToProps)(CreateEvent)


