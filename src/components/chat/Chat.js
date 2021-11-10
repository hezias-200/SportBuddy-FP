import React, { useState, useEffect, useRef } from 'react'
import SendMessage from './SendMessage'
import { db } from '../../config/fbConfig'
import "../chat/chat.css"
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from "react-router-dom";
import swal from 'sweetalert';

function Chat({ auth, firestore,profile }) {
    const scroll = useRef()
    const [messages, setMessages] = useState([])
    useEffect(() => {
        db.collection('messages').orderBy('createdAt').limit(1000).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [])
    console.log(messages);
    const deleteMessage = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this message!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Your message has been deleted!", {
                        icon: "success",
                    });
                    firestore.collection('messages').doc(`${id}`).delete()
                }
            });
    }
    if (!auth.uid) return <Redirect to='/' />
    return (
        <div >
            <div className="msgs">
                {messages.map((message) => (
                    <div>
                        <div key={message.id} className={`msg ${message.uid === auth.uid ? 'sent' : 'received'}`}>
                            {auth.uid == "GQDjADqs6Vd4iHO7J8mgNhNGm5C2" ?
                                <div  class="btn btn-danger btn-sm" style={{marginBottom:"20px",borderRadius:"70px"}}>
                                    <i class="fas fa-minus-circle" onClick={() => {
                                        deleteMessage(message.messageId)
                                    }}>
                                    </i>
                                </div> : null}
                            <img className='imgChat' src={message.photoURL} alt="" />
                            <p className='pChat'>{message.text}</p>
                            <p className="pChat" style={{ marginBottom: "0.2px", color: "lightgray", fontSize: "8px" }}>{message.fullName} {message.createdAt.toDate().toString().split('GMT')[0]}</p>
                        </div>
                    </div>
                ))}
                <div ref={scroll}></div>
            </div>
            <SendMessage scroll={scroll} />
        </div>
    )
}
const mapStateToProps = (state) => {
    let userUid = state.firebase.auth.uid
    const { users } = state.firestore.data
    console.log(state.firestore);
    let profileUser = null;
    for (let key in users) {
            if (users[key].uid == userUid) {
                profileUser = {
                    imgUrl: (users[key].finallyImageUrl != undefined) ? users[key].finallyImageUrl : "https://hook.finance/sites/default/files/user.png",
                    firstName:users[key].firstName!=undefined?users[key].firstName:"New" ,
                    lastName:users[key].lastName != undefined?users[key].lastName:"User"  ,
                    fullName:users[key].fullName
                }
                
            }
        }
    return {
        auth: state.firebase.auth,
        firestore: state.firestore,
        profile:profileUser ||""

    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(Chat)

