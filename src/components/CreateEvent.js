import { Redirect } from "react-router-dom";
import React from "react";
import 'react-dropdown-now/style.css';
import { createEvent } from "../database/actions/projectActions";
import { connect } from 'react-redux'
import { Form, FormControl, FormGroup, Button } from 'react-bootstrap';
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import PhoneInput from "react-phone-number-input";
import { format } from 'date-fns';
function CreateEvent(props) {
    const [validError, setValidError] = React.useState();
    const [countryPhone, setCountryPhone] = React.useState()
    const [clickedFreeTraining, setClickedFreeTraining] = React.useState(false)
    const [state, setState] = React.useState({
        eventName: '',
        startDate: '',
        startWorkOut: '',
        endWorkOut: '',
        minAge: '',
        numberOfParticipants: null,
        description: '',
        locationName: '',
        freeTraining: true

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
    const validationEvent =  (e) => {
        if (format(new Date(), 'yyyy-MM-dd') > state.startDate) {
            console.log("s");
            return false
        }
        return true;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const valid=validationEvent()
        if(valid){
            props.createEvent(state)
            alert("Your Event Created Enjoy")
            props.history.push('/homepage')
        }
        else{
            
        }
  
    }
    const handleChange = (e) => {
        setState({
            ...state, [e.target.id]: e.target.value
        })
    }
    // const validate = () => {
    //     let dateError = "The Date Is Invalid";
    //     let timeError = "The Time Is Invalid";
    //     if (state.startDate < Date()) {
    //         setValidError(
    //             dateError
    //         )
    //     }
    //     else
    //         setValidError("")
    //     if (state.endWorkOut < state.startWorkOut) {
    //         setValidError(
    //             dateError + "," + timeError
    //         )
    //         return false
    //     }
    //     else
    //         setValidError("")
    //     if (dateError ) {
    //         return false;
    //     }
    //     return true;
    // };
    // const ErrorOutput = () => {
        
    //          if (state.startDate < Date()) {
    //             return <span>Letters only</span>
    //          }
    //          return <span></span>
        // if (name === 'firstName') {
        //     if (!inputValue.match(/^[a-zA-Z]+$/) && inputValue.length > 0) {
        //         return <span>Letters only</span>
        //     }
        //     return <span></span>
        // }
        // if (name === 'telNo') {
        //     if (!inputValue.match(/^[0-9]+$/) && inputValue.length > 0) {
        //         return <span>Numbers only</span>
        //     }
        //     return <span></span>
        // }
    // }
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
                    <FormControl required id="startWorkOut" type="time" onChange={handleChange} placeholder="Start Time" />
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
                    <FormControl required id="numberOfParticipants" type="number" onChange={handleChange} placeholder="Max Participants" />
                </FormGroup>
                <FormGroup class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i>6</i></span>
                    </div>
                    <FormControl required id="minAge" type="number" onChange={handleChange} placeholder="Min Age" />
                </FormGroup>

                <Search panTo={locationSelected} />

                <FormGroup class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i>8</i></span>
                    </div>
                    <FormControl required id="description" type="text" onChange={handleChange} placeholder="Description" />
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
                <div class="form-group" style={{ textAlign: 'center' }}>
                    <input type="submit" value="Create Event" class=" btn  btn-warning  " />
                    <div className="red-text center">
                    </div>
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
    console.log(state);
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


