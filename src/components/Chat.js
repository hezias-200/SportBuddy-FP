import React from 'react';
import { chat } from "../account/actions/projectActions";
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from "react-router-dom";
import '../chat.css'

const Chat = ({ auth, events, profile }) => {
    console.log(events);
    return (

        <section className="container2">
            <div className="listOfUsers">
                {events.map(event =>(

                <div className="displayName">
                    <div className="displayPic">
                        <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
                    </div>
                    <div style={{ margin: '0 10px' }}>
                        <span style={{ fontWeight: 500 }}>{event.authorName}</span>
                    </div>
                </div>
                
                ))}




            </div>
            <div className="chatArea">
                <div className="chatHeader"> Rizwan Khan </div>
                <div className="messageSections">

                    <div style={{ textAlign: 'left' }}>
                        <p className="messageStyle" >Hello User</p>
                    </div>

                </div>
                <div className="chatControls">
                    <textarea />
                    <button>Send</button>
                </div>
            </div>
        </section>

    );
}


const mapStateToProps = (state) => {

    const { events } = state.firestore.data

    let tempEvents = [];
    if (events) {
        for (let key in events) {
            events[key].numberOfParticipants.map(moreEventsIJoined => {
                if (state.firebase.auth.uid == moreEventsIJoined) {
                    tempEvents.push(
                        {
                            authorId: events[key].authorId,
                            authorName: events[key].authorName,

                            eventName: events[key].eventName,
                            description: events[key].description,
                            startWorkOut: events[key].startWorkOut,
                            numberOfParticipants: events[key].numberOfParticipants,
                            minAge: events[key].minAge
                        }
                    )


                }


            })
        }
    }
    return {
        auth: state.firebase.auth,
        events: tempEvents || [],

    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'events' }
    ])
)(Chat)
