import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { connect } from 'react-redux'
import { Redirect, NavLink, Route } from "react-router-dom";
import { compose } from 'redux';
import { firestoreConnect, useFirebase } from 'react-redux-firebase';
import { storage } from "../config/fbConfig";
import React from "react";

// Create a reference to the file whose metadata we want to retrieve



const MyProfile = (props) => {
console.log(props);
    const { auth } = props;
    const { profile } = props
    const [url, setUrl] =React.useState("");

   storage
    .ref(`users/${auth.uid}`)
    .child(`${profile.imgUrl}`)
    .getDownloadURL().then(url=>{
        setUrl(url);  
    })
    
    if (!auth.uid) return <Redirect to='/' />
    return (
        <div>
            <Card className="center" style={{ width: '30rem', margin: 'auto', marginTop: "3%", height:"auto" }}>
                <Card.Img class="profile_img"   src={`${url}`} />
                <Card.Body>
                    <Card.Title style={{color:"white",textTransform:'capitalize',textAlign:'center'}}>{profile.firstName} {profile.lastName}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">

                    <ListGroupItem>Age: {profile.age}</ListGroupItem>
                    <ListGroupItem>City:  {profile.city}</ListGroupItem>
                    <ListGroupItem>Description:  {profile.description}</ListGroupItem>

                </ListGroup>

            </Card>
        </div>
    )
}
const mapStateToProps = (state) => {
    console.log(state);
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
                imgUrl:users[user].imgUrl
            }
        }

    }

    return {
        auth: state.firebase.auth,
        profile: profileUser || ''

    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(MyProfile)
