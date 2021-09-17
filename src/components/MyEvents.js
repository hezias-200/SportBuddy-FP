
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from "react-router-dom";
import { clickedEvents } from "./HomePage"

function MyEvents(props) {
    console.log(clickedEvents);


    const { auth } = props;
    if (!auth.uid) return <Redirect to='/' />
    return (
        <div>
            {props.events.map(specificEvent => (
                <div class="card" style={{ width: '30rem', margin: 'auto', marginTop: "8%" }} >
                    <div class="card-body">
                        <h5 class="card-title">{specificEvent.eventName}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{specificEvent.startWorkOut}</h6>
                        <p class="card-text">{specificEvent.description}</p>
                        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                            <button type="button" class="btn btn-warning card-link">Edit</button>
                            <button type="button" class="btn btn-danger card-link">Delete</button>
                        </div>
                    </div>
                </div>
            ))}
            {/* {clickedEvents.map(clickedEvent => (
                <div class="card" style={{ width: '30rem', margin: 'auto', marginTop: "8%" }} >
                    <div class="card-body">
                        <h5 class="card-title">{clickedEvent.eventName}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{clickedEvent.startWorkOut}</h6>
                        <p class="card-text">{clickedEvent.description}</p>
                    </div>
                </div>
            ))} */}
        </div>
    )
}


const mapStateToProps = (state) => {

    const { events } = state.firestore.data

    console.log(state);
    let tempEvents = [];
    if (events) {
        for (let key in events) {
            if ( events[key].authorId == state.firebase.auth.uid )
                tempEvents.push(
                    {
                        eventName: events[key].eventName,
                        description: events[key].description,
                        authorId: events[key].authorId,
                        startWorkOut: events[key].startWorkOut,
                        numberOfParticipants: events[key].numberOfParticipants,
                        minAge: events[key].minAge
                    }
                )
        }
    }
    return {
        auth: state.firebase.auth,
        events: tempEvents || []
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'events' }
    ])
)(MyEvents)

