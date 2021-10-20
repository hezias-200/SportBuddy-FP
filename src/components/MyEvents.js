
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect, Link } from "react-router-dom";
import React from "react";
import { Accordion, Container, Row, Col } from 'react-bootstrap';

function MyEvents({ auth, events, firestore }) {
    const deleteEvent = (specificEvent) => {
        if (window.confirm("Are You Sure You want to Delete this event?"))
            firestore.collection('events').doc(`${specificEvent.eventId}`).delete()
    }
    if (!auth.uid) return <Redirect to='/' />
    return (
        <div className="container" style={{ marginTop: "5%" }}>
            <div style={{ textAlign: 'center', color: 'white' }} class="card-header">
                <h1>My Events</h1>
            </div>
            {events.map(specificEvent => (
                <div style={{ height: 'auto', width: 'auto', marginTop: "2%" }} >
                    <Accordion style={{ font: 'small-caps bold 15px/1 sans-serif', textAlign: 'center' }}>
                        <Accordion.Item eventKey="0"  >
                            <Accordion.Header  >
                                <h1 style={{ font: 'small-caps bold 24px/1 sans-serif', textAlign: 'center' }}>{specificEvent.eventName}</h1>
                            </Accordion.Header>
                            <Accordion.Body>
                                <Container>
                                    <Row >
                                        <Col >
                                            <p>Start: {specificEvent.startWorkOut}</p>
                                        </Col>
                                        <Col xs={6}>End Time:{specificEvent.endWorkOut}</Col>
                                        <Col>Date :{specificEvent.date}</Col>
                                    </Row>
                                    <Row md={4}>
                                        <Col>Min Age: {specificEvent.minAge}</Col>
                                    </Row>
                                    <Row md={4}  >
                                        <Col style={{ textAlign: 'center', margin: 'auto' }} >Description: {specificEvent.description}</Col>
                                    </Row>
                                </Container>
                                <div style={{ marginTop: '30px', marginLeft: '86%', width: "100%" }} class="btn-group" role="group" aria-label="Basic mixed styles example">
                                    <div>
                                        <Link class="btn btn-success" to={{
                                            pathname: '/editevent',
                                            state: { detail: specificEvent }
                                        }}>Edit</Link>
                                        <button onClick={() => {
                                            deleteEvent(specificEvent)
                                        }} type="button" class="btn btn-danger ">Delete</button>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            ))
            }
        </div >
    )
}

const mapStateToProps = (state) => {
    const { ordered } = state.firestore
    let tempEvents = [];
    for (let key in ordered) {
        for (let prop in ordered[key]) {
            if (ordered[key][prop].authorId == state.firebase.auth.uid) {
                tempEvents.push(
                    {
                        authorName: ordered[key][prop].authorName,
                        eventName: ordered[key][prop].eventName,
                        description: ordered[key][prop].description,
                        authorId: ordered[key][prop].authorId,
                        startWorkOut: ordered[key][prop].startWorkOut,
                        endWorkOut: ordered[key][prop].endWorkOut,
                        date: ordered[key][prop].startDate,
                        minAge: ordered[key][prop].minAge,
                        eventId: ordered[key][prop].id,
                        locationName: ordered[key][prop].locationName,
                        numberOfParticipants: ordered[key][prop].numberOfParticipants,
                        phone: ordered[key][prop].phone,
                        freeTraining: ordered[key][prop].freeTraining
                    }
                )
                console.log(ordered[key][prop]);
            }

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
)(MyEvents)

