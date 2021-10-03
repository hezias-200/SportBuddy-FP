import { Redirect } from "react-router-dom";
import React from "react";
import { Dropdown, Selection } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import { createEvent } from "../database/actions/projectActions";
import { Component } from "react";
import { connect } from 'react-redux'
import { Form, FormControl, FormGroup, Button } from 'react-bootstrap';

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
        numberOfParticipants: [],
        gender: "",
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
        if (e.target.id == 'man') {
            setState({
                ...state, [state.gender]: e.target.id
            })
        }
        else if (e.target.id == 'women') {
            setState({
                ...state, [state.gender]: e.target.id
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

            <Form onSubmit={handleSubmit} className="center" style={{ width: '30rem', margin: 'auto', marginTop: "2%" }}>
                <FormGroup class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i>1</i></span>
                    </div>
                    <FormControl required id="eventName" type="text" onChange={handleChange} placeholder="Event Name" />
                </FormGroup>
                <FormGroup class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i>2</i></span>
                    </div>
                    <FormControl required id="startDate" type="date" onChange={handleChange} placeholder="Event Date" />
                </FormGroup>
                <FormGroup class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i>3</i></span>
                    </div>
                    <FormControl required id="startWorkOut" type="time" onChange={handleChange} placeholder="Start Time" />
                </FormGroup>
                <FormGroup class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i>4</i></span>
                    </div>
                    <FormControl required id="endWorkout" type="time" onChange={handleChange} placeholder="Finish Time" />
                </FormGroup>
                <FormGroup class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i>5</i></span>
                    </div>
                    <FormControl required id="numberOfParticipants" type="number" onChange={handleChange} placeholder="Max Participants" />
                </FormGroup>
                <FormGroup class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i>6</i></span>
                    </div>
                    <FormControl required id="minAge" type="number" onChange={handleChange} placeholder="Min Age" />
                </FormGroup>

                <Search required panTo={locationSelected} />

                <FormGroup class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i>8</i></span>
                    </div>
                    <FormControl required id="description" type="text" onChange={handleChange} placeholder="Description" />
                </FormGroup>
                <div class="form-group" style={{ textAlign: 'center' }}>
                    <input type="submit" value="Create Event" class=" btn  btn-warning  " />
                </div>




                {/* <Form.Group className="mb-3" >
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
                </Form.Group> 
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
                </Button> */}
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
        <div>
            <Combobox onSelect={handleSelect}>

                <FormGroup class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i>7</i></span>
                    </div>
                    <ComboboxInput className='form-control'
                        value={value}
                        onChange={handleInput}
                        disabled={!ready}
                        placeholder="Search your location"
                    />
                </FormGroup>


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


