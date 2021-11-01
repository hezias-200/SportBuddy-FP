import React, { useState } from 'react'
import { Input, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { db, auth } from '../../config/fbConfig'

function SendMessage({ scroll, profile }) {
    const [msg, setMsg] = useState('')
    async function sendMessage(e) {
        e.preventDefault()
        const { uid, photoURL } = auth.currentUser
        await db.collection('messages').add({
            text: msg,
            photoURL: profile.imgUrl,
            uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setMsg('')
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
    <button class="msg_send_btn" type="button"></button>
    return (
        <div >
            <form  onSubmit={sendMessage}>
                <div className="sendMsg">
                    <Input style={{borderRadius:"5px",backgroundColor:"#135e96", fontSize: '15px', fontWeight: '550',width:"89%",height:"60px"}} placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
                    <Button style={{width:"10%",height:"60px",backgroundColor:"#135e96" ,fontSize: '15px', fontWeight: '550',marginLeft:"10px" }} type="submit">Send</Button>
                </div>
            </form>
        </div>
    )
}


const mapStateToProps = (state) => {
    const userUid = state.firebase.auth.uid
    const { users } = state.firestore.data
    let profileUser = null;
    for (let key in users) {
        for (let prop in users[key]) {
            if (users[key][prop] == userUid) {
                profileUser = {
                    imgUrl: users[key].finallyImageUrl|| '',
                }
            }  
        }
    }


return {
    auth: state.firebase.auth,
    profile: profileUser || '',
}
}


export default
    connect(mapStateToProps,null)(SendMessage)

