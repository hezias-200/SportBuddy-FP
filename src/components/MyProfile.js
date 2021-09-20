import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { connect } from 'react-redux'
import { Redirect, NavLink, Route } from "react-router-dom";
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { storage } from "../config/fbConfig";

// Create a reference to the file whose metadata we want to retrieve



const MyProfile = (props) => {
    
    
    const { auth } = props;
    const { profile } = props
    
    // const h=storage.ref(`users/${auth.uid}`)
    // console.log(h);



    if (!auth.uid) return <Redirect to='/' />
    return (
        <div>
            <Card className="center" style={{ width: '30rem', margin: 'auto', marginTop: "8%" }}>
                <Card.Img variant="top" src="https://www.countrys.co.il/wp-content/uploads/2019/05/50036231_2783372865221277_3168270556759851008_o-1024x768.jpg" />
                <Card.Body>
                    <Card.Title>{profile.firstName} {profile.lastName}</Card.Title>
                    <Card.Text>
                        {profile.description}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem> {profile.age}</ListGroupItem>
                    <ListGroupItem> {profile.city}</ListGroupItem>
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
                imageName:users[user].imageName,
                lastName: users[user].lastName,
                age: users[user].age,
                city: users[user].city,
                description: users[user].description
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
