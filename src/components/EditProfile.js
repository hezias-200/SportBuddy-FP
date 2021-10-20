// import { Redirect, useParams } from "react-router-dom";
// import React from "react";
// import { Dropdown, Selection } from 'react-dropdown-now';
// import 'react-dropdown-now/style.css';
// import { Component } from "react";
// import { connect } from 'react-redux'
// import { render } from "react-dom";
// import { storage, db } from "../config/fbConfig";
// import { compose } from 'redux';
// import { firestoreConnect } from 'react-redux-firebase';
// import { ControlLabel, Form, FormControl, FormGroup, Row } from 'react-bootstrap';

// const EditProfile = (props) => {
//     const { profile } = props
//     console.log(props);
//     const { auth } = props;
//     const [image, setImage] = React.useState(null);
//     const [state, setState] = React.useState({
//         age: profile.age,
//         city: profile.city,
//         description: profile.description,
//         phone: profile.phone
//     })


//     const [url, setUrl] = React.useState("");

//     const handleChangePhoto = e => {
//         if (e.target.files[0]) {
//             setImage(e.target.files[0]);
//         }
//         setState({
//             ...state,
//             imgUrl: e.target.files[0].name
//         })
//     };
//     async function handleUpload() {
//         await storage.ref(`users/${auth.uid}/${image.name}`).put(image);
//         await storage
//             .ref(`users/${auth.uid}`)
//             .child(image.name)
//             .getDownloadURL()
//             .then(imageUrl => {
//                 setUrl(imageUrl)
//                 db.collection('users').doc(auth.uid).update({
//                     ...state,
//                     finallyImageUrl: imageUrl
//                 })
//             })
//     }
//     const handleSubmit = (e) => {
//         handleUpload();
//         e.preventDefault();
//         props.editProfile(state)
//         alert("Thank you!!")
//         props.history.push('/myprofile')
//     }
//     const handleChange = (e) => {
//         setState({
//             ...state, [e.target.id]: e.target.value
//         })
//     }

//     if (!auth.uid) return <Redirect to='/' />
//     return (
//         <div style={{ width: '30rem', margin: 'auto', marginTop: "8%", height: "auto" }}>
//             <div class="card ">
//                 <div class="card-header">
//                     <h3>Edit Profile</h3>
//                 </div>
//                 <div class="card-body" >
//                     <Form onSubmit={handleSubmit}>
//                         <FormGroup class="input-group form-group">
//                             <div class="input-group-prepend">
//                                 <span class="input-group-text"><i >1</i></span>
//                             </div>
//                             <FormControl onChange={handleChangePhoto} type="file" id="photo" placeholder="Your Photo:"></FormControl>
//                         </FormGroup>
//                         <FormGroup class="input-group form-group">
//                             <div class="input-group-prepend">
//                                 <span class="input-group-text"><i >2</i></span>
//                             </div>
//                             <Form.Control required onChange={handleChange} type="username" placeholder="Age" id="age" >{profile.age}</Form.Control>
//                         </FormGroup>
//                         <FormGroup class="input-group form-group">
//                             <div class="input-group-prepend">
//                                 <span class="input-group-text"><i ></i>3</span>
//                             </div>
//                             <Form.Control onChange={handleChange} type="username" placeholder="Description" id="description" >{profile.description}</Form.Control>
//                         </FormGroup>
//                         <FormGroup class="input-group form-group">
//                             <div class="input-group-prepend">
//                                 <span class="input-group-text"><i>4</i></span>
//                             </div>
//                             <Form.Control va onChange={handleChange} type="username" id="city" >{profile.city}</Form.Control>
//                         </FormGroup>
//                         <FormGroup class="input-group form-group">
//                             <div class="input-group-prepend">
//                                 <span class="input-group-text"><i>5</i></span>
//                             </div>
//                             <Form.Control required onChange={handleChange} type="username" placeholder="Phone Number" id="phone" >{profile.city}</Form.Control>
//                         </FormGroup>
//                         <div class="form-group ">
//                             <input type="submit" value="Next" class="btn float-right login_btn" />
//                         </div>
//                     </Form>
//                 </div>
//             </div>
//         </div>
//     )
// }
// const mapStateToProps = (state) => {
//     const userUid = state.firebase.auth.uid
//     const { users } = state.firestore.data
//     let profileUser = null;
//     for (let user in users) {
//         if (user == userUid) {
//             profileUser = {
//                 firstName: users[user].firstName,
//                 imageName: users[user].imageName,
//                 lastName: users[user].lastName,
//                 age: users[user].age,
//                 city: users[user].city,
//                 description: users[user].description,
//             }
//         }
//     }
//     return {
//         auth: state.firebase.auth,
//         profile: profileUser || ''

//     }
// }
// const mapDispatchToProps = (dispatch) => {
//     return {
//         editProfile: (newUser) => dispatch(editProfile(newUser))
//     }
// }


// export default
//     connect(mapStateToProps, mapDispatchToProps)(EditProfile)