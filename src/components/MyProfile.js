import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { Redirect, Link, Route } from "react-router-dom";
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect, useFirebase } from 'react-redux-firebase';
import { storage, db } from "../config/fbConfig";
import React, { useState } from "react";

const MyProfile = (props) => {
    const [image, setImage] = React.useState();
    const [infoOpen, setInfoOpen] = useState(false);
    const { profile } = props
    const { auth } = props;
    const [url, setUrl] = React.useState("");
    const [state, setState] = React.useState({
    })
    const handleChangePhoto = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    const handleChange = (e) => {
        if (e.target.id != 'age')
        setState({
            ...state, [e.target.id]: e.target.value
        })
    if (e.target.id == 'age') {
        if (e.target.value > 0) {
            setState({
                ...state, [e.target.id]: e.target.value
            })
        }
    }
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
    const validationMtProfile = () => {
        let ageError = ""
        let flag = true
        if (profile.age > 120) {
            ageError = "Age Error"
            alert("bad age")
            flag = false
        }
        return flag;

    }
    const saveClickHandler = (e) => {
        let valid = validationMtProfile()
        if (valid && infoOpen) {
            setInfoOpen(false);
            handleUpload().then(() => {
            }).catch(() => {
                db.collection('users').doc(auth.uid).update({
                    ...state,
                });
            })
        }
        else
            setInfoOpen(true);
    }
    if (!auth.uid) return <Redirect to='/' />
    return (
        <div>
            <Card className="center" style={{ width: '30rem', margin: 'auto', marginTop: "6%", height: "auto" }}>
                {(!infoOpen) ?
                    <button onClick={() => { editClickHandler() }} type="button" class="btn btn-danger ">Edit</button> :
                    <button type="button" class="btn btn-primary " onClick={() => { saveClickHandler() }} >Save</button>
                }
                {(profile.imgUrl != undefined) ?
                    <Card.Img class="profile_img" src={`${profile.imgUrl}`} /> :null}
                <Card.Body>
                    <Card.Title style={{ color: "white", textTransform: 'capitalize', textAlign: 'center' }}>{(!infoOpen) ?
                        `${profile.fullName}` :
                        <input type='text' id="fullName" defaultValue={profile.fullName} onChange={handleChange} />}
                    </Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    {(infoOpen) ?
                        <input onChange={handleChangePhoto} type="file" id="photo" /> : null}
                    <ListGroupItem>Age: {(!infoOpen) ?
                        `${profile.age}` :
                        <input min="3" max="120" type='text' id="age" defaultValue={profile.age} onChange={handleChange} />
                    }</ListGroupItem>
                    <ListGroupItem>City: {(!infoOpen) ? `${profile.city}` :
                        <input type='text' id="city" defaultValue={profile.city} onChange={handleChange} />
                    }</ListGroupItem>
                    <ListGroupItem>Phone: {(!infoOpen) ? `${profile.phone}` :
                        <input type='text' id="phone" defaultValue={profile.phone} onChange={handleChange} />
                    }</ListGroupItem>
                    <ListGroupItem>Description: {(!infoOpen) ?
                        `${profile.description}` :
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
                fullName: users[user].fullName,
                age: (users[user].age != undefined) ? users[user].age : '',
                city: (users[user].city != undefined) ? users[user].city : '',
                description: (users[user].description != undefined) ? users[user].description : '',
                imgUrl: users[user].finallyImageUrl!=undefined?users[user].finallyImageUrl:'https://hook.finance/sites/default/files/user.png',
                phone: (users[user].phone != undefined) ? users[user].phone : ''
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
