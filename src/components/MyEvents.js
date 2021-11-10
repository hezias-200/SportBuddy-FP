
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import swal from 'sweetalert';
import { Redirect, Link } from "react-router-dom";
import React from "react";
import { Accordion, Container, Row, Col } from 'react-bootstrap';

function MyEvents({ auth, events, firestore }) {
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
        <div className="container" style={{ marginTop: "8%", width: '50%' }}>
            <div style={{ textAlign: 'center', color: 'white' }} class="card-header">
                <h1>My Events</h1>
            </div>
            <div style={{ height: '50px', width: "100%" }} >
                {events.map(specificEvent => (
                    <Accordion style={{ marginTop: "2%", font: 'small-caps bold 15px/1 sans-serif', width: "100%" }}>
                        <Accordion.Item eventKey="0"  >
                            <Accordion.Header  >
                                <h1 style={{ font: 'small-caps bold 15px/1 sans-serif', textAlign: 'center', width: "100%" }}>{specificEvent.eventName}</h1>
                            </Accordion.Header>
                            <Accordion.Body>
                                <Container style={{ font: 'bold 10px/1 sans-serif' }}>
                                    <Row md={4} >
                                        <Col md={4}>
                                            <p>Time of training: {specificEvent.startWorkOut}-{specificEvent.endWorkOut}</p>
                                        </Col>
                                        <Col md={4}>
                                            <p >Create At: {specificEvent.createAt.toDate().toDateString()}</p>
                                        </Col>
                                        <Col>Date :{specificEvent.date}</Col>
                                    </Row>
                                    <Row md={4}  >
                                        <Col md={4}>Min Age: {specificEvent.minAge}</Col>
                                        <Col md={4}>Price: {specificEvent.price} &#8362;</Col>
                                        <Col md={4}>Location Name: {specificEvent.locationName}</Col>
                                    </Row>
                                    <Row md={4} style={{ marginTop: "8px" }}  >
                                        <Col md="auto" style={{ textAlign: 'center', margin: 'auto' }} >Description:
                                            <p style={{ width: "100%", overflow: "clip" }}>
                                                {specificEvent.description}
                                            </p>
                                        </Col>
                                    </Row>
                                    <div style={{ marginTop: "8px",width:"100%",marginLeft:"auto" }} class="btn-group" role="group" aria-label="Basic mixed styles example">
                                        <div>
                                        <Link class="btn btn-success btn-sm" to={{
                                            pathname: '/editevent',
                                            state: { detail: specificEvent }
                                        }}>Edit</Link>
                                        </div>
                                        <div style={{marginLeft:"10px"}}>
                                        <button  onClick={() => {
                                            deleteEvent(specificEvent)
                                        }} type="button" class="btn btn-danger btn-sm">Delete</button>

                                        </div>
                                    </div>
                                </Container>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                )
                )
                }
            </div>
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
                        freeTraining: ordered[key][prop].freeTraining,
                        createAt: ordered[key][prop].createAt,
                        price: ordered[key][prop].price,
                    }
                )
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

