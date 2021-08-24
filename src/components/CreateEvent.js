
import React from "react";
import { Dropdown, Selection } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export default function CreateEvent() {
    return (
        <div>
            <Form className="center" style={{ width: '30rem',margin:'auto', marginTop:"8%" }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Event Name: </Form.Label>
                    <Form.Control type="email" placeholder="Event Name:" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Location: </Form.Label>
                    <Form.Control type="text" placeholder="Location" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Description: </Form.Label>
                    <Form.Control type="text" placeholder="Description" />
                </Form.Group>
                <Dropdown
                    placeholder="Select an option"
                    className="my-className"
                    options={['Football', 'Basketball', 'Yoga', 'StreetWork', 'Running','Other']}
                    value="Football"
                    onChange={(value) => value}
                    onSelect={(value) => value} // always fires once a selection happens even if there is no change

                />
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Other: </Form.Label>
                    <Form.Control type="text" placeholder="Other" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </div>
    )
}
//className="center" style={{ width: '30rem',margin:'auto', marginTop:"8%" }}

