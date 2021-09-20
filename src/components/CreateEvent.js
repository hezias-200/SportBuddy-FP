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
        endWorkout: '',
        minAge: '',
        activityType: '',
        numberOfParticipants:[],
        gender:"",
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
        props.history.push('/homepage')


    }
    const handleParticipants = (e) => {
        // setState({
            //     ...state,numberOfParticipants[ e.target.value]
            // })  arrayvar: [...this.state.arrayvar, newelement]

            // setState({
            //     numberOfParticipants: [...state.numberOfParticipants,5]
            // })
            // console.log(state);
    }
    const handleChange = (e) => {
        
        setState({
            ...state, [e.target.id]: e.target.value
        })
        console.log(state);
    }
    const handleChangeGender = (e) => {
        console.log(e.target.id);
        if(e.target.id=='man'){
        setState({
            ...state, [state.gender]:e.target.id
        })
    }
    else if(e.target.id=='women'){
        setState({
            ...state, [state.gender]:e.target.id
        })
}
// else if(e.target.id=='women'){
//     setState({
//         ...state, [state.gender]:e.target.id
//     })
// }
    }
    const { auth } = props;
    if (!auth.uid) return <Redirect to='/' />



    return (
        <div>

            <Form onSubmit={handleSubmit}  className="center" style={{ width: '30rem', margin: 'auto', marginTop: "8%" }}>
                <Form.Group className="mb-3" >
                    <Form.Label>Event Name: </Form.Label>
                    <Form.Control  required="required"   onChange={handleChange} type="text" id="eventName" placeholder="Event Name:" />

                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Start Date: </Form.Label>
                    <Form.Control required="required"  onChange={handleChange} type="date" placeholder="date" id="startDate" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Start Work Out:</Form.Label>
                    <Form.Control required="required"  onChange={handleChange} type="time" placeholder="startWorkOut" id="startWorkOut" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>End Work Out:</Form.Label>
                    <Form.Control onChange={handleChange} type="time" placeholder="endWorkout" id="endWorkout" />

                </Form.Group>

                {/* <Form.Group className="mb-3" >
                    <Form.Label>numberOfParticipants:</Form.Label>
                    <Form.Control onChange={handleParticipants} type="number" placeholder="numberOfParticipants" id="numberOfParticipants" />
                </Form.Group> */}
                <Form.Group className="mb-3" >
                    <Form.Label>Min Age: :</Form.Label>
                    <Form.Control onChange={handleChange} type="number" placeholder="Min Age" id="minAge" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Description: </Form.Label>
                    <Form.Control onChange={handleChange} id="description" type="text" placeholder="Description" />
                </Form.Group>
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


