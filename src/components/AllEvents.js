
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from "react-router-dom";
import React from 'react'
import Table from 'react-bootstrap/Table';
import { format } from 'date-fns';

function AllEvents({ auth, events }) {
    const [eventFilter, setEventFilter] = React.useState('')
    const handleOnChange = (e) => {
        setEventFilter({ ...eventFilter, [e.target.id]: e.target.value })
    }
    if (!auth.uid) return <Redirect to='/' />
    return (
        <div className="container">
            <input style={{ marginTop: '30px' }} id="filterInput" onChange={handleOnChange} placeholder="Search Your Sport" type="text" />
            <Table responsive style={{ background: 'white' }} >
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Event Name</th>
                        <th>Location</th>
                        <th>Min Age</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Description</th>
                        <th>Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (!eventFilter) && events.map(event => (
                            format(new Date(), 'yyyy-MM-dd') != event.startDate ? null :
                            <tr>
                                <td>
                                    {event.authorName}
                                </td>
                                <td>{event.eventName}</td>
                                <td>{event.locationName}</td>
                                <td>{event.minAge}</td>
                                <td>{event.startDate}</td>
                                <td>{event.startWorkOut}-{event.endWorkout}</td>
                                <td>{event.description}</td>
                                {(auth.uid != event.authorId) ?
                                    <td>
                                        <a
                                            href={`https://wa.me/${event.phone}`}
                                            class="whatsapp_float"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            <i class="fab fa-whatsapp"></i>
                                        </a>
                                    </td> : null}

                            </tr>
                        )
                        )
                    }
                    {
                        (eventFilter) && events.map(event => (
                            event.eventName.includes(eventFilter.filterInput) ?
                                <tr>
                                    <td>{event.authorName}</td>
                                    <td>{event.eventName}</td>
                                    <td>{event.locationName}</td>
                                    <td>{event.minAge}</td>
                                    <td>{event.startDate}</td>
                                    <td>{event.startWorkOut}-{event.endWorkout}</td>
                                    <td>{event.description}</td>
                                </tr> : null

                        ))}
                </tbody>
            </Table>
        </div>
    )
}

const mapStateToProps = (state) => {

    const { events } = state.firestore.data
    let tempEvents = [];
    if (events) {
        for (let key in events) {
            tempEvents.push(events[key]
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
)(AllEvents)
