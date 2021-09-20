import { Redirect } from "react-router-dom";
import React from "react";
import { Dropdown, Selection } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import Form from 'react-bootstrap/Form'
import { Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button'
import { Component } from "react";
import { connect } from 'react-redux'
import { createProfile } from '../database/actions/authActions'
import { render } from "react-dom";
import { storage } from "../config/fbConfig";

function CreateProfile(props) {
    
    const [state, setState] = React.useState({
        age: '',
        city: '',
        description: '',
        imgUrl:''
        
    })

    const {auth}=props;
    const [image, setImage] = React.useState(null);
    const [url, setUrl] =React.useState("");
    const [progress, setProgress] = React.useState(0);
    
    const handleChangePhoto = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
        
        
    };
    const handleUpload = () => {
        const uploadTask = storage.ref(`users/${auth.uid}/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setProgress(progress);
            },
            error => {
              console.log(error);
            },
            ()=>{
                storage
              .ref(`users/${auth.uid}`)
              .child(image.name)
              .getDownloadURL()
              .then(url => {
            setUrl(url);
            setState({
                ...state,
                imgUrl:`${url}`
            })
                       
        });
    }
  );

};



    const handleSubmit = (e) => {
        e.preventDefault();
      handleUpload();
        props.createProfile(state)
        alert("Thank you!!")
       // props.history.push('/homepage')


    }
    const handleChange = (e) => {
        setState({
            ...state, [e.target.id]: e.target.value
        })
    }
    
    if (!auth.uid) return <Redirect to='/' />
    return (
        <div>
            <Form onSubmit={handleSubmit} className="center" style={{ width: '30rem', margin: 'auto', marginTop: "8%" }}>
                <Form.Group className="mb-3" >
                    <Form.Label>photo: </Form.Label>
                    <Form.Control onChange={handleChangePhoto} type="file" id="photo" placeholder="Your Photo:" />

                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>age: </Form.Label>
                    <Form.Control onChange={handleChange} type="number" placeholder="age" id="age" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>city:</Form.Label>
                    <Form.Control onChange={handleChange} type="text" placeholder="city" id="city" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>description:</Form.Label>
                    <Form.Control onChange={handleChange} type="text" placeholder="description" id="description" />

                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createProfile: (newUser) => dispatch(createProfile(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile)


