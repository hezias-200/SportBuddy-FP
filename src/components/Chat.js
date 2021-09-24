// import React from 'react';
// import { chat } from "../account/actions/projectActions";
// import { connect } from 'react-redux'
// import { firestoreConnect } from 'react-redux-firebase';
// import { compose } from 'redux';
// import { Redirect } from "react-router-dom";
// import '../chat.css'

// const Chat = ({ auth, events, profile }) => {
//     const dispatch = useDispatch();
//     const auth = useSelector(state => state.auth);
//     const user = useSelector(state => state.user);
//     const [chatStarted, setChatStarted] = useState(false);
//     const [chatUser, setChatUser] = useState('');
//     const [message, setMessage] = useState('');
//     const [userUid, setUserUid] = useState(null);
//     let unsubscribe;
//     useEffect(() => {

//         unsubscribe = dispatch(getRealtimeUsers(auth.uid))
//             .then(unsubscribe => {
//                 return unsubscribe;
//             })
//             .catch(error => {
//                 console.log(error);
//             })




//     }, []);
//     useEffect(() => {
//         return () => {
//             //cleanup
//             unsubscribe.then(f => f()).catch(error => console.log(error));

//         }
//     }, []);
//     const initChat = (user) => {

//         setChatStarted(true)
//         setChatUser(`${user.firstName} ${user.lastName}`)
//         setUserUid(user.uid);

//         console.log(user);

//         dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: user.uid }));

//     }

//     const submitMessage = (e) => {

//         const msgObj = {
//             user_uid_1: auth.uid,
//             user_uid_2: userUid,
//             message
//         }


//         if (message !== "") {
//             dispatch(updateMessage(msgObj))
//                 .then(() => {
//                     setMessage('')
//                 });
//         }

//         //console.log(msgObj);

//     }
//     console.log(events);
//     return (
//         <section className="container">

//             <div className="listOfUsers">


//                 {
//                     user.users.length > 0 ?
//                         user.users.map(user => {
//                             return (
//                                 <User
//                                     onClick={initChat}
//                                     key={user.uid}
//                                     user={user}
//                                 />
//                             );
//                         }) : null
//                 }



//             </div>

//             <div className="chatArea">

//                 <div className="chatHeader">
//                     {
//                         chatStarted ? chatUser : ''
//                     }
//                 </div>
//                 <div className="messageSections">
//                     {
//                         chatStarted ?
//                             user.conversations.map(con =>
//                                 <div style={{ textAlign: con.user_uid_1 == auth.uid ? 'right' : 'left' }}>
//                                     <p className="messageStyle" >{con.message}</p>
//                                 </div>)
//                             : null
//                     }


//                 </div>
//                 {
//                     chatStarted ?
//                         <div className="chatControls">
//                             <textarea
//                                 value={message}
//                                 onChange={(e) => setMessage(e.target.value)}
//                                 placeholder="Write Message"
//                             />
//                             <button onClick={submitMessage}>Send</button>
//                         </div> : null
//                 }

//             </div>
//         </section>

//         // <section className="container2">
//         //     <div className="listOfUsers">
//         //         {events.map(event =>(

//         //         <div className="displayName">
//         //             <div className="displayPic">
//         //                 <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
//         //             </div>
//         //             <div style={{ margin: '0 10px' }}>
//         //                 <span style={{ fontWeight: 500 }}>{event.authorName}</span>
//         //             </div>
//         //         </div>

//         //         ))}




//         //     </div>
//         //     <div className="chatArea">
//         //         <div className="chatHeader"> Rizwan Khan </div>
//         //         <div className="messageSections">

//         //             <div style={{ textAlign: 'left' }}>
//         //                 <p className="messageStyle" >Hello User</p>
//         //             </div>

//         //         </div>
//         //         <div className="chatControls">
//         //             <textarea />
//         //             <button>Send</button>
//         //         </div>
//         //     </div>
//         // </section>

//     );
// }


// const mapStateToProps = (state) => {

//     const { events } = state.firestore.data

//     let tempEvents = [];
//     if (events) {
//         for (let key in events) {
//             events[key].numberOfParticipants.map(moreEventsIJoined => {
//                 if (state.firebase.auth.uid == moreEventsIJoined) {
//                     tempEvents.push(
//                         {
//                             authorId: events[key].authorId,
//                             authorName: events[key].authorName,

//                             eventName: events[key].eventName,
//                             description: events[key].description,
//                             startWorkOut: events[key].startWorkOut,
//                             numberOfParticipants: events[key].numberOfParticipants,
//                             minAge: events[key].minAge
//                         }
//                     )


//                 }


//             })
//         }
//     }
//     return {
//         auth: state.firebase.auth,
//         events: tempEvents || [],

//     }
// }
// export default compose(
//     connect(mapStateToProps),
//     firestoreConnect([
//         { collection: 'events' }
//     ])
// )(Chat)
