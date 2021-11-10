
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import React from 'react'
import Table from 'react-bootstrap/Table';
import { Redirect, Link } from "react-router-dom";
import swal from 'sweetalert';

function AllEvents({ auth, events, firestore }) {
    const [eventFilter, setEventFilter] = React.useState('')
    const handleOnChange = (e) => {
        setEventFilter({ ...eventFilter, [e.target.id]: e.target.value })
    }
    const deleteEvent = (specificEvent) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this event!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Your event has been deleted!", {
                        icon: "success",
                    });
                    firestore.collection('events').doc(`${specificEvent.eventId}`).delete()
                }
            });
    }
    if (!auth.uid) return <Redirect to='/' />
    return (
        <div className="container">
            <input style={{ marginTop: '30px' }} id="filterInput" onChange={handleOnChange} placeholder="Search Your Sport" type="text" />
            <Table responsive style={{ background: 'white' }} >
                <thead >
                    <tr>
                        <th>Full Name</th>
                        <th>Event Name</th>
                        <th>Location</th>
                        <th>Min Age</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Description</th>
                        <th>Contact</th>
                        {
                            (auth.uid == "GQDjADqs6Vd4iHO7J8mgNhNGm5C2" ?
                                <th>Admin</th> : null)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        (!eventFilter) && events.map(event => (
                            <tr>
                                <td>
                                    {event.authorName}
                                </td>
                                <td>{event.eventName}</td>
                                <td>{event.locationName}</td>
                                <td>{event.minAge}</td>
                                <td>{event.startDate}</td>
                                <td>{event.startWorkOut}-{event.endWorkOut}</td>
                                <td>{event.description}</td>
                                {(auth.uid != event.authorId) ?
                                    <td>
                                        <div style={{ display: "flex", width: "70px" }}>
                                            <a
                                                href={`https://wa.me/${event.phone}`}
                                                class="whatsapp_float"
                                                target="_blank"
                                                rel="noopener noreferrer">
                                                <i class="fab fa-whatsapp"></i>
                                            </a>
                                            <div class="callus">
                                                <a href={`tel:${event.phone}`}>
                                                    <i class="fa fa-phone fab" ></i>
                                                </a>
                                            </div>
                                        </div>
                                    </td> : null
                                }
                                <td>
                                    {
                                        auth.uid == "GQDjADqs6Vd4iHO7J8mgNhNGm5C2" ?
                                            <div style={{ width: "100%", marginLeft: "auto" }} class="btn-group" role="group" aria-label="Basic mixed styles example">
                                                <div>
                                                    <Link class="btn btn-success btn-sm" to={{
                                                        pathname: '/editevent',
                                                        state: { detail: event }
                                                    }}>
                                                        <i class="fas fa-edit"></i>
                                                    </Link>
                                                </div>
                                                <div style={{ marginLeft: "10px" }}>
                                                    <button onClick={() => {
                                                        deleteEvent(event)
                                                    }} type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </div>: null
                                    }
                                </td>
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
                                    <td>{event.startWorkOut}-{event.endWorkOut}</td>
                                    <td>{event.description}</td>
                                    {(auth.uid != event.authorId) ?
                                        <td>
                                            <div style={{ display: "flex", width: "70px" }}>
                                                <a
                                                    href={`https://wa.me/${event.phone}`}
                                                    class="whatsapp_float"
                                                    target="_blank"
                                                    rel="noopener noreferrer">
                                                    <i class="fab fa-whatsapp"></i>
                                                </a>
                                                <div class="callus">
                                                    <a href={`tel:${event.phone}`}>
                                                        <i class="fa fa-phone fab" ></i>
                                                    </a>
                                                </div>

                                            </div>
                                        </td> : null}
                                </tr> : null
                        ))}
                </tbody>
            </Table>
        </div>
    )
}

const mapStateToProps = (state) => {
    const { events } = state.firestore.data
    const { ordered } = state.firestore

    let tempEvents = [];
    for (let key in ordered) {
        for (let prop in ordered[key]) {
            tempEvents.push(
                {
                    authorName: ordered[key][prop].authorName,
                    eventName: ordered[key][prop].eventName,
                    description: ordered[key][prop].description,
                    authorId: ordered[key][prop].authorId,
                    startWorkOut: ordered[key][prop].startWorkOut,
                    endWorkOut: ordered[key][prop].endWorkOut,
                    startDate: ordered[key][prop].startDate,
                    minAge: ordered[key][prop].minAge,
                    eventId: ordered[key][prop].id,
                    locationName: ordered[key][prop].locationName,
                    numberOfParticipants: ordered[key][prop].numberOfParticipants,
                    phone: ordered[key][prop].phone,
                    freeTraining: ordered[key][prop].freeTraining,
                    createAt: ordered[key][prop].createAt,
                    price: ordered[key][prop].price,
                }
            )
        }
    }
    return {

        auth: state.firebase.auth,
        events: tempEvents || [],
        firestore: state.firestore

    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'events' }
    ])
)(AllEvents)

