
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from "react-router-dom";
import { clickedEvents } from "./HomePage"

function MyEvents({auth,events}) {
    // console.log(props.firestore.collection);
    // props.map(e => { 
    //     console.log(e);
    //     //   props.firestore.collection('events').doc(e.id).update({
    //     //    "numberOfParticipants":[...e.numberOfParticipants,auth.uid] 
    //   })


    
    // const { events } = props.firestore.data

    if (!auth.uid) return <Redirect to='/' />
    return (
        <div>
            {events.map(specificEvent => (
                <div class="card" style={{ width: '30rem', margin: 'auto', marginTop: "2%" }} >
                    <div class="card-body">
                        <h5 class="card-title">{specificEvent.eventName}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{specificEvent.startWorkOut}</h6>
                        <p class="card-text">{specificEvent.description}</p>
                        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                        {(specificEvent.authorId == auth.uid) ?<button type="button" class="btn btn-warning card-link">Edit</button>:null}
                            <button type="button" class="btn btn-danger card-link">Delete</button>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}


const mapStateToProps = (state) => {

    const { events } = state.firestore.data

    let tempEvents = [];
    if (events) {
        for (let key in events) {
            events[key].numberOfParticipants.map(moreEventsIJoined=>{
                if(state.firebase.auth.uid==moreEventsIJoined){
                    tempEvents.push(
                        {
                            authorName:events[key].authorName,
                            eventName: events[key].eventName,
                            description: events[key].description,
                            authorId: events[key].authorId,
                            startWorkOut: events[key].startWorkOut,
                            numberOfParticipants: events[key].numberOfParticipants,
                            minAge: events[key].minAge
                        }
                    )

                }
            })
            if ( events[key].authorId == state.firebase.auth.uid ){
                tempEvents.push(
                    {
                        authorName:events[key].authorName,
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

