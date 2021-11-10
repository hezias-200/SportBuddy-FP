import { Redirect } from "react-router-dom";
import React from "react";
import { Dropdown, Selection } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import { editEvent } from "../database/actions/authActions";
import { Component } from "react";
import { connect } from 'react-redux'
import { Form, FormControl, FormGroup, Button } from 'react-bootstrap';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import PhoneInput from "react-phone-number-input";
import swal from 'sweetalert';
import { format } from 'date-fns';

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

function EditEvent(props) {
    const [state, setState] = React.useState({
        eventName:  props.location.state.detail.eventName ,
        startDate:  props.location.state.detail.date ,
        startWorkOut:  props.location.state.detail.startWorkOut ,
        endWorkOut:  props.location.state.detail.endWorkOut ,
        minAge:  props.location.state.detail.minAge ,
        numberOfParticipants:  props.location.state.detail.numberOfParticipants ,
        description:  props.location.state.detail.description ,
        locationName:  props.location.state.detail.locationName ,
        phone:props.location.state.detail.phone ,
        eventId:props.location.state.detail.eventId,
        freeTraining:props.location.state.detail.freeTraining,
        price:props.location.state.detail.price,

    });
    console.log(props.location.state.detail);
    const [countryPhone, setCountryPhone] = React.useState()
    const [clickedFreeTraining, setClickedFreeTraining] = React.useState(!state.freeTraining)
    const [validError, setValidError] = React.useState("");

    const locationSelected = React.useCallback(({ lat, lng }, { address }) => {
        setState({
            ...state,
            location:
            {
                latmap: lat,
                lngmap: lng
            },
            locationName: address
        })
    });
    const handleCheckbox = () => {
        if (clickedFreeTraining) {
            setState({
                ...state, freeTraining: clickedFreeTraining
            })
            setClickedFreeTraining(false)
        }
        else {
            setState({
                ...state, freeTraining: clickedFreeTraining
            })
            setClickedFreeTraining(true)
        }
    }
    const validationEvent = (e) => {
        let timeError = ""
        let passwordError = ""
        let dateError = ""
        let flag = true;

        if (format(new Date(), 'yyyy-MM-dd') > state.startDate) {
            dateError = "The Date is not valid"
            setValidError(dateError)
            flag = false
        }
        else if (state.startWorkOut >= state.endWorkOut) {
            timeError = "The start time must be less than end time "
            setValidError(timeError)
            flag = false
        }
        return flag;
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        const valid = validationEvent()
        if (valid) {
            props.editEvent(state)
            swal({
                title: "Done",
                text: "Your Event Created Enjoy!",
                icon: "success",
                button: "OK",
            })
                .then(() => props.history.push('/homepage'))

        }

        alert("Your Event Edited Enjoy")
        props.history.push('/homepage')
    }
    const handleChange = (e) => {
        setState({
            ...state, [e.target.id]: e.target.value
        })
    }
    const handlePhone = (e, t) => {
        setState({
            ...state, phone: t
        })
    }
    const { auth } = props;
    if (!auth.uid) return <Redirect to='/' />


    return (
        <div className="container">
            <Form onSubmit={handleSubmit} className="center" style={{ width: '30rem', margin: 'auto', marginTop: '7%' }}>
                <div class="card-header">
                    <h3>Edit Event</h3>
                </div>
                <FormGroup class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i>1</i></span>
                    </div>
                    <FormControl required id="eventName" type="text" defaultValue={state.eventName} onChange={handleChange} placeholder="Event Name" />
                </FormGroup>
                <FormGroup class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i>2</i></span>
                    </div>
                    <FormControl required id="startDate" defaultValue={state.startDate} type="date" onChange={handleChange} placeholder="Event Date" />
                </FormGroup>
                <FormGroup class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i>3</i></span>
                    </div>
                    <FormControl defaultValue={state.startWorkOut}  required id="startWorkOut" type="time" onChange={handleChange} placeholder="Start Time" />
                </FormGroup>
                <FormGroup class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i>4</i></span>
                    </div>
                    <FormControl defaultValue={state.endWorkOut}  required id="endWorkOut" type="time" onChange={handleChange} placeholder="Finish Time" />
                </FormGroup>
                <FormGroup class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i>5</i></span>
                    </div>
                    <FormControl defaultValue={state.numberOfParticipants}  required id="numberOfParticipants" type="number" onChange={handleChange} placeholder="Max Participants" />
                </FormGroup>
                <FormGroup class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i>6</i></span>
                    </div>
                    <FormControl defaultValue={state.minAge} required id="minAge" type="number" onChange={handleChange} placeholder="Min Age" />
                </FormGroup>

                <Search props={state} panTo={locationSelected} />

                <FormGroup class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i>8</i></span>
                    </div>
                    <FormControl defaultValue={state.description} required id="description" type="text" onChange={handleChange} placeholder="Description" />
                </FormGroup>
                <FormGroup class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i>9</i></span>
                    </div>
                    <PhoneInput  className=" form-control phoneInput"  value={countryPhone}
                        onChange={(e) => handlePhone(setCountryPhone, e)}
                        placeholder={`${state.phone}`} ></PhoneInput>
                </FormGroup>
                <FormGroup class="input-group form-group">
                    <Form.Check onChange={() => handleCheckbox()} style={{ marginLeft: 'auto', background: 'white' }}
                        type={'checkbox'}
                        id={`checkbox`}
                        label={`Free Training`}
                        defaultChecked={state.freeTraining}
                    />
                </FormGroup>
                {!state.freeTraining ? <FormGroup class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i>10</i></span>
                    </div>
                    <FormControl value={state.price} onChange={(e) => {
                        let val = parseInt(e.target.value, 10);
                        if (isNaN(val)) {
                            setState({ ...state, price: "" });
                        } else {
                            val = val >= 0 ? val : "";
                            setState({ ...state, price: val });
                        }
                    }} min="1" required id="price" type="number" onChange={handleChange} placeholder="Enter Price" /></FormGroup> : null}
                <div class="form-group" style={{ textAlign: 'center' }}>
                    <div style={{ color: 'red' }} className="center">
                        {validError ? <p>{validError}</p> : null}
                    </div>
                    <input type="submit" value="Edit Event" class=" btn  btn-warning  " />
                </div>
            </Form>
        </div>
    )
}

function Search({ props,panTo }) {
    
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

            panTo({ lat, lng }, { address });
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
                        placeholder={props.locationName}
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
    const { events } = state.firestore.data
    return {
        auth: state.firebase.auth,
        data: events
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        editEvent: (event) => dispatch(editEvent(event))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'events' }
    ])
)(EditEvent)


