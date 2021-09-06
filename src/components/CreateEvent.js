import { Redirect } from "react-router-dom";

import React from "react";
import { Dropdown, Selection } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import Form from 'react-bootstrap/Form'
import { Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button'
import { createEvent } from "../account/actions/projectActions";
import { Component } from "react";
import { connect } from 'react-redux'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";



function CreateEvent(props) {

    const [state, setState] = React.useState({
        eventName: '',
        startDate: '',
        startWorkOut: '',
        workOutDuration: '',
        numberOfParticipants: '',
        minAge: '',
        activityType: '',
        gender: '',
        description: ''
    });

    const locationSelected = React.useCallback(({ lat, lng }) => {
        setState({
            ...state, location: {
                latmap: lat,
                lngmap: lng
            }
        })
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        props.createEvent(state)
        alert("Your Event Created Enjoy")


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
                    <Form.Label>Event Name: </Form.Label>
                    <Form.Control onChange={handleChange} type="text" id="eventName" placeholder="Event Name:" />

                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Start Date: </Form.Label>
                    <Form.Control onChange={handleChange} type="date" placeholder="date" id="startDate" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Start Work Out:</Form.Label>
                    <Form.Control onChange={handleChange} type="time" placeholder="startWorkOut" id="startWorkOut" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>End Work Out:</Form.Label>
                    <Form.Control onChange={handleChange} type="time" placeholder="workOutDuration" id="workOutDuration" />

                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>numberOfParticipants:</Form.Label>
                    <Form.Control onChange={handleChange} type="number" placeholder="numberOfParticipants" id="workOutDuration" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Min Age: :</Form.Label>
                    <Form.Control onChange={handleChange} type="number" placeholder="Min Age" id="minAge" />
                </Form.Group>
                <Row xs="2">
                    <label>
                        <input onChange={handleChange} id="gender" type="checkbox" class="filled-in" />
                        <span>Man</span>
                    </label>
                    <label>
                        <input onChange={handleChange} id="gender" type="checkbox" class="filled-in" />
                        <span>Women</span>
                    </label>
                </Row>

                <Form.Group className="mb-3" >
                    <Form.Label>Description: </Form.Label>
                    <Form.Control onChange={handleChange} id="description" type="text" placeholder="Description" />
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

                <Search panTo={locationSelected} />
                <Button variant="primary" type="submit">
                    Submit
                </Button>


            </Form>

        </div>

    )



}

function Search({ panTo }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 32.085300, lng: () => 34.781769 },
            radius: 200 * 1000,

        },
    });

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);

            panTo({ lat, lng });
        } catch (error) {
            console.log("😱 Error: ", error);
        }
    };

    return (
        <div >
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Search your location"
                />
                <ComboboxPopover>
                    {status === "OK" &&
                        data.map(({ id, description }) => (

                            <ComboboxOption key={id} value={description} />
                        ))}
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}


const mapStateToProps = (state) => {

    return {
        auth: state.firebase.auth,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createEvent: (event) => dispatch(createEvent(event))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent)


