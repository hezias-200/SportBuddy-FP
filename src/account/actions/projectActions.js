import { firestoreConnect } from "react-redux-firebase";

export const createEvent=(event)=>{
    return(dispatch,getState,{getFirebase,getFirestore})=>{
        const firestore=getFirestore();
        firestore.collection('events').add({
            ...event,
            eventName:'',
            authorId:12345,
            createAt:new Date()
        }).then(()=>{
            
            dispatch({type:'CREATE_EVENT',event});

        }).catch((err)=>{
            dispatch({type:'CREATE_EVENT_ERROR',err})
        })
    }
};