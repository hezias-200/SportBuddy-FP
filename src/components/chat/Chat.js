import React, { useState, useEffect, useRef } from 'react'
import SendMessage from './SendMessage'
import { db } from '../../config/fbConfig'
import "../chat/chat.css"
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from "react-router-dom";

function Chat({ auth }) {
    const scroll = useRef()
    const [messages, setMessages] = useState([])
    useEffect(() => {
        db.collection('messages').orderBy('createdAt').limit(1000).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    if (!auth.uid) return <Redirect to='/' />

    return (
        <div>
            <div className="msgs">
                {messages.map(({ id, text, photoURL,uid}) => (
                    <div>
                        <div key={id} className={`msg ${uid === auth.uid ? 'sent' : 'received'}`}>
                            {photoURL!=undefined?<img className='imgChat' src={photoURL} alt="" />:null}
                            <p className='pChat'>{text}</p>
                        </div>
                    </div>
                ))}
                <div ref={scroll}></div>
            </div>
                <SendMessage scroll={scroll}/>
        </div>
    )
}
const mapStateToProps = (state) => {
    const userUid = state.firebase.auth.uid
    const { users } = state.firestore.data
    return {
        auth: state.firebase.auth,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(Chat)

