import { Redirect } from "react-router-dom";
import React from "react";
import 'react-dropdown-now/style.css';
import { connect } from 'react-redux'
import { createProfile } from '../database/actions/authActions'
import { storage, db } from "../config/fbConfig";
import { Form, FormControl, FormGroup, Row } from 'react-bootstrap';

const CreateProfile = (props) => {
    const { profile } = props
    const { auth } = props;
    const [image, setImage] = React.useState(null);
    const [state, setState] = React.useState({
        age: '',
        city: '',
        description: '',
        phone: '',
        uid: auth.uid
    })
    const [url, setUrl] = React.useState("");

    const handleChangePhoto = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    async function handleUpload() {
        await storage.ref(`users/${auth.uid}/${image.name}`).put(image);
        await storage
            .ref(`users/${auth.uid}`)
            .child(image.name)
            .getDownloadURL()
            .then(imageUrl => {
                setUrl(imageUrl)
                db.collection('users').doc(auth.uid).update({
                    ...state,
                    finallyImageUrl: imageUrl
                })
            })
    }
    const handleSubmit = (e) => {
        handleUpload();
        e.preventDefault();
        props.createProfile(state)
        alert("Thank you!!")
        props.history.push('/myprofile')
    }
    const handleChange = (e) => {
        setState({
            ...state, [e.target.id]: e.target.value
        })
    }
    if (!auth.uid) return <Redirect to='/' />
    return (
        <div class="container">
            <div style={{ marginTop: "10%" }} class="d-flex justify-content-center h-100">
                <div class="card">
                    <div class="card-header">
                        <h3>Create Profile</h3>
                    </div>
                    <div class="card-body" >
                        <Form onSubmit={handleSubmit} >
                            <FormGroup class="input-group form-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i >1</i></span>
                                </div>
                                <FormControl required onChange={handleChangePhoto} type="file" id="photo" ></FormControl>
                            </FormGroup>
                            <FormGroup class="input-group form-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i >2</i></span>
                                </div>
                                <Form.Control required onChange={handleChange} type="username" placeholder="Age" id="age" ></Form.Control>
                            </FormGroup>
                            <FormGroup class="input-group form-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i ></i>3</span>
                                </div>
                                <Form.Control onChange={handleChange} type="username" placeholder="Description" id="description" ></Form.Control>
                            </FormGroup>
                            <FormGroup class="input-group form-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i>4</i></span>
                                </div>
                                <Form.Control onChange={handleChange} type="username" placeholder="City" id="city" ></Form.Control>
                            </FormGroup>
                            <FormGroup class="input-group form-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i>5</i></span>
                                </div>
                                <Form.Control required onChange={handleChange} type="username" placeholder="Phone Number" id="phone" ></Form.Control>
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
    return {
        auth: state.firebase.auth,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createProfile: (newUser) => dispatch(createProfile(newUser))
    }
}
export default
    connect(mapStateToProps, mapDispatchToProps)(CreateProfile)