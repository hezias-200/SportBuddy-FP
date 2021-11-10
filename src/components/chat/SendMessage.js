import React, { useState } from 'react'
import { Input, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { db, auth } from '../../config/fbConfig'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
function SendMessage({ scroll, profile }) {
    console.log(profile);
    const [msg, setMsg] = useState('')
    const [idMsg, setIdMsg] = useState('')
    async function sendMessage(e) {
        e.preventDefault()
        const { uid, photoURL } = auth.currentUser
        await db.collection('messages').add({
            firstName:profile.firstName,
            lastName:profile.lastName ,
            fullName: profile.fullName ,
            text: msg,
            photoURL: profile.imgUrl != undefined ? profile.imgUrl : "",
            uid,
            createdAt: new Date()
            
        }).then(message => {
            db.collection('messages').doc(message.id).update({
                messageId: message.id
            })
        })
        setMsg('')
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }

    <button class="msg_send_btn" type="button"></button>
    return (
        <div >
            <form onSubmit={sendMessage}>
                <div className="sendMsg">
                    <Input style={{ borderRadius: "5px", backgroundColor: "#135e96", fontSize: '15px', fontWeight: '550', width: "89%", height: "60px" }} placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
                    <Button style={{ width: "10%", height: "60px", backgroundColor: "#135e96", fontSize: '15px', fontWeight: '550', marginLeft: "10px" }} type="submit">Send</Button>
                </div>
            </form>
        </div>
    )
}


const mapStateToProps = (state) => {
    const userUid = state.firebase.auth.uid
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
        profile: profileUser || '',
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(SendMessage)

