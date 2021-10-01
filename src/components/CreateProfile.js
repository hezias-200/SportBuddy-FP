import { Redirect } from "react-router-dom";
import React from "react";
import { Dropdown, Selection } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import { Component } from "react";
import { connect } from 'react-redux'
import { createProfile } from '../database/actions/authActions'
import { render } from "react-dom";
import { storage } from "../config/fbConfig";
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { ControlLabel, Form, FormControl, FormGroup, Row } from 'react-bootstrap';

const CreateProfile = (props) => {
    const { profile } = props
    const { auth } = props;
    const [image, setImage] = React.useState(null);

    const [state, setState] = React.useState({
        age: '',
        city: '',
        description: '',
        imgUrl: null,
        phone:''

    })


    const [url, setUrl] = React.useState("");

    const handleChangePhoto = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
        setState({
            ...state,
            imgUrl: e.target.files[0].name
        })
    };
    const handleUpload = () => {
        storage.ref(`users/${auth.uid}/${image.name}`).put(image);
        storage
            .ref(`users/${auth.uid}`)
            .child(image.name)
            .getDownloadURL()
            .then(url => {
                setUrl(url);
            });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (state.imgUrl != null)
            handleUpload();
        props.createProfile(state)
        alert("Thank you!!")
        props.history.push('/homepage')


    }
    const handleChange = (e) => {

        setState({
            ...state, [e.target.id]: e.target.value
        })
    }

    if (!auth.uid) return <Redirect to='/' />
    return (
        // <div>
        //     <Form onSubmit={handleSubmit} className="center" style={{ width: '30rem', margin: 'auto', marginTop: "8%" }}>
        //         <Form.Group className="mb-3" >
        //             <Form.Label>photo: </Form.Label>
        //             <Form.Control onChange={handleChangePhoto} type="file" id="photo" placeholder="Your Photo:">{ }</Form.Control>

        //         </Form.Group>

        //         <Form.Group className="mb-3">
        //             <Form.Label>age: </Form.Label>
        //             <Form.Control onChange={handleChange} type="number" placeholder="age" id="age" >{profile.age}</Form.Control>
        //         </Form.Group>
        //         <Form.Group className="mb-3">
        //             <Form.Label>city:</Form.Label>
        //             <Form.Control onChange={handleChange} type="text" placeholder="city" id="city" />
        //         </Form.Group>
        //         <Form.Group className="mb-3">
        //             <Form.Label>description:</Form.Label>
        //             <Form.Control onChange={handleChange} type="text" placeholder="description" id="description" />

        //         </Form.Group>
        //         <Button variant="primary" type="submit">
        //             Submit
        //         </Button>
        //     </Form>
        // </div>
        <div class="container">
            <div class="d-flex justify-content-center h-100">
                <div class="card">
                    <div class="card-header">
                        <h3>Create Profile</h3>
                    </div>
                    <div class="card-body" >
                        <Form onSubmit={handleSubmit}>
                            <FormGroup class="input-group form-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i >1</i></span>
                                </div>
                                <FormControl onChange={handleChangePhoto} type="file" id="photo" placeholder="Your Photo:"></FormControl>
                            </FormGroup>
                            <FormGroup class="input-group form-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i >2</i></span>
                                </div>
                                <Form.Control required onChange={handleChange} type="username" placeholder="Age" id="age" >{profile.age}</Form.Control>
                            </FormGroup>
                            <FormGroup class="input-group form-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i ></i>3</span>
                                </div>
                                <Form.Control onChange={handleChange} type="username" placeholder="Description" id="description" >{profile.description}</Form.Control>
                            </FormGroup>
                            <FormGroup class="input-group form-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i>4</i></span>
                                </div>
                                <Form.Control onChange={handleChange} type="username" placeholder="City" id="city" >{profile.city}</Form.Control>
                            </FormGroup>
                            <FormGroup class="input-group form-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i>5</i></span>
                                </div>
                                <Form.Control required onChange={handleChange} type="username" placeholder="Phone Number" id="phone" >{profile.city}</Form.Control>
                            </FormGroup>
                            <div class="form-group">
                                <input type="submit" value="Next" class="btn float-right login_btn" />
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    const userUid = state.firebase.auth.uid
    const { users } = state.firestore.data
    let profileUser = null;
    for (let user in users) {
        if (user == userUid) {
            profileUser = {
                firstName: users[user].firstName,
                imageName: users[user].imageName,
                lastName: users[user].lastName,
                age: users[user].age,
                city: users[user].city,
                description: users[user].description,
                imgUrl: users[user].imgUrl
            }
        }

    }

    return {
        auth: state.firebase.auth,
        profile: profileUser || ''

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createProfile: (newUser) => dispatch(createProfile(newUser))
    }
}


export default
    connect(mapStateToProps, mapDispatchToProps)(CreateProfile)