import { Redirect } from "react-router-dom";
import React from "react";
import 'react-dropdown-now/style.css';
import { createEvent } from "../database/actions/projectActions";
import { connect } from 'react-redux'
import { Form, FormControl, FormGroup } from 'react-bootstrap';
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxOption } from "@reach/combobox";
import PhoneInput from "react-phone-number-input";
import { format } from 'date-fns';
import swal from 'sweetalert';

function CreateEvent(props) {
    const [validError, setValidError] = React.useState("");
    const [countryPhone, setCountryPhone] = React.useState()
    const [clickedFreeTraining, setClickedFreeTraining] = React.useState(false)
    const [state, setState] = React.useState({
        eventName: '',
        startDate: '',
        startWorkOut: '',
        endWorkOut: '',
        minAge: '',
        numberOfParticipants: '',
        description: '',
        locationName: '',
        freeTraining: true,
        price: ''
    });
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
         if (state.startWorkOut >= state.endWorkOut) {
            timeError = "The start time must be less than end time "
            setValidError(timeError)
            flag = false
        }
        return flag;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const valid = validationEvent()
        if (valid) {
            props.createEvent(state)
            swal({
                title: "Done",
                text: "Your Event Created Enjoy!",
                icon: "success",
                button: "OK",
            })
                .then(() => props.history.push('/homepage'))
        }

    }
    const handleChange = (e) => {
        console.log(e.target.value);
        if (e.target.id != 'numberOfParticipants' || e.target.id != 'minAge' || e.target.id != 'price')
            setState({
                ...state, [e.target.id]: e.target.value
            })
        if (e.target.id == 'numberOfParticipants' || e.target.id == 'minAge' || e.target.id == 'price') {
            if (e.target.value > 0) {
                setState({
                    ...state, [e.target.id]: e.target.value
                })
            }
        }
    }
    const handlePhone = (e, t) => {
        setState({
            ...state, phone: t
        })
    }
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
    const { auth } = props;
    if (!auth.uid) return <Redirect to='/' />
    return (
        <div className="container">
            <Form onSubmit={handleSubmit} className="center" style={{ width: '30rem', margin: 'auto', marginTop: '7%' }}>
                <div class="card-header">
                    <h3>Create Event</h3>
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
                    <FormControl className="startWorkOut"  required id="startWorkOut"  type="time" onChange={handleChange} placeholder='12:00' />
                </FormGroup>
                <FormGroup class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i>4</i></span>
                    </div>
                    <FormControl required id="endWorkOut" type="time" onChange={handleChange} placeholder="Finish Time" />
                </FormGroup>
                <FormGroup class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i>5</i></span>
                    </div>
                    <FormControl

                         required id="numberOfParticipants" type="number" value={state.numberOfParticipants} onChange={(e) => {
                            let val = parseInt(e.target.value, 10);
                            if (isNaN(val)) {
                                setState({ ...state, numberOfParticipants: "" });
                            } else {
                                val = val >= 0 ? val : "";
                                setState({ ...state, numberOfParticipants: val });
                            }
                        }}
                        placeholder="Max Participants" />
                </FormGroup>
                <FormGroup class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i>6</i></span>
                    </div>
                    <FormControl value={state.minAge} onChange={(e) => {
                        let val = parseInt(e.target.value, 10);
                        if (isNaN(val)) {
                            setState({ minAge: "" });
                        } else {
                            val = val >= 0 ? val : "";
                            setState({ ...state, minAge: val });
                        }
                    }} min="3" max="120" required id="minAge" type="number" onChange={handleChange} placeholder="Min Age" />
                </FormGroup>

                <Search panTo={locationSelected} />

                <FormGroup class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i>8</i></span>
                    </div>
                    <textarea className="form-control" id="description" cols="40" rows="3" onChange={handleChange} placeholder="Description"></textarea>
                </FormGroup>
                <FormGroup class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i>9</i></span>
                    </div>
                    <PhoneInput className=" form-control phoneInput" required value={countryPhone}
                        onChange={(e) => handlePhone(setCountryPhone, e)}
                        placeholder="Enter Phone For Contact" ></PhoneInput>
                </FormGroup>
                <FormGroup class="input-group form-group">
                    <Form.Check onChange={() => handleCheckbox()} style={{ marginLeft: 'auto', background: 'white' }}
                        type={'checkbox'}
                        id={`checkbox`}
                        label={`Free Training`}
                        defaultChecked={state.freeTraining}
                    />
                </FormGroup>
                {clickedFreeTraining ? <FormGroup class="input-group form-group">
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
                    <input type="submit" value="Create Event" class=" btn  btn-warning  " />
                </div>
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
                        placeholder="Select a location"
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


