import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { Redirect, Link, Route } from "react-router-dom";
import { connect } from 'react-redux'
import { compose, applyMiddleware } from 'redux';
import { firestoreConnect, useFirebase } from 'react-redux-firebase';
import { storage, db } from "../config/fbConfig";
import React, { useEffect, useState } from "react";
import EditProfile from './EditProfile';
import CreateProfile from "./CreateProfile"
import firebase from "firebase";
import { getDatabase, ref, child, get } from "firebase/database";
import { editProfile } from '../database/actions/authActions';
import { FormControl } from 'react-bootstrap';


const MyProfile = (props) => {
    const [image, setImage] = React.useState();
    const [infoOpen, setInfoOpen] = useState(false);
    const { profile } = props
    const { auth } = props;
    const [url, setUrl] = React.useState("");
    console.log(profile);
    const [state, setState] = React.useState({
        // age: profile.age,
        // city: profile.city,
        // description:profile.description
    })
    const handleChangePhoto = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }

    };
    const handleChange = (e) => {
        setState({
            ...state, [e.target.id]: e.target.value
        })
    }
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
    const editClickHandler = () => {
        if (infoOpen) {
            setInfoOpen(false);
        }
        else
            setInfoOpen(true);
    }
    const saveClickHandler = (e) => {
        if (infoOpen) {
            setInfoOpen(false);
        }
        else
            setInfoOpen(true);
            
        handleUpload().then(() => {
            console.log(state + "1");
        }).catch(() => {
            db.collection('users').doc(auth.uid).update({
                ...state,
            });
        })
    }

    if (!auth.uid) return <Redirect to='/' />
    return (
        <div>
            <Card className="center" style={{ width: '30rem', margin: 'auto', marginTop: "6%", height: "auto" }}>
                {(!infoOpen) ?
                    <button onClick={() => { editClickHandler() }} type="button" class="btn btn-danger ">Edit</button> :
                    <button type="button" class="btn btn-primary " onClick={() => { saveClickHandler() }} >Save</button>
                }
                <Card.Img class="profile_img" src={`${profile.imgUrl}`} />
                <Card.Body>
                    <Card.Title style={{ color: "white", textTransform: 'capitalize', textAlign: 'center' }}>{profile.firstName} {profile.lastName}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    {(infoOpen) ?
                        <input onChange={handleChangePhoto} type="file" id="photo" /> : null}
                    <ListGroupItem>Age: {(!infoOpen) ? `${profile.age}` :
                        <input type='text' id="age" defaultValue={profile.age} onChange={handleChange} />
                    }</ListGroupItem>
                    <ListGroupItem>City: {(!infoOpen) ? `${profile.city}` :
                        <input type='text' id="city" defaultValue={profile.city} onChange={handleChange} />
                    }</ListGroupItem>
                    <ListGroupItem>Description: {(!infoOpen) ? `${profile.description}` :
                        <input type='text' id="description" defaultValue={profile.description} onChange={handleChange} />
                    }</ListGroupItem>
                </ListGroup>
            </Card>
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
                imgUrl: users[user].finallyImageUrl
            }
        }
    }
    return {
        auth: state.firebase.auth,
        profile: profileUser || '',
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(MyProfile)
