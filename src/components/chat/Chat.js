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
        db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    if (!auth.uid) return <Redirect to='/' />

    return (
        <div style={{ marginTop: '5%'}} className="msgs">
            {messages.map(({ id, text, photoURL, uid }) => (
                <div>
                    <div key={id} className={`msg ${uid === auth.uid ? 'sent' : 'received'}`}>
                        <img className='imgChat' src={photoURL} alt="" />
                        <p className='pChat'>{text}</p>
                    </div>
                </div>
            ))}
            <div ref={scroll}></div>
            <SendMessage scroll={scroll} />
        </div>
    )
}
const mapStateToProps = (state) => {
    const userUid = state.firebase.auth.uid
    const { users } = state.firestore.data
    let profileUser = null;
    for (let user in users) {
        if (user == userUid) {
            profileUser = {
                firstName: users[user].firstName,
                imageName: users[user].imageName,
                lastName: users[user].lastName,
                age: users[user].age,
                city: users[user].city,
                description: users[user].description,
                imgUrl: users[user].finallyImageUrl
            }
        }
    }
    return {
        auth: state.firebase.auth,
        profile: profileUser || ''
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(Chat)

