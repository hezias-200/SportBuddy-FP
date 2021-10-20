
export const createEvent=(event)=>{
    return(dispatch,getState,{getFirebase,getFirestore})=>{
        const firestore=getFirestore();
        const profile=getState().firebase.profile;
        const autorId=getState().firebase.auth.uid;
        firestore.collection('events').add({
            ...event,
            authorName:profile.firstName,
            authorId:autorId,
            createAt:new Date()
        }).then(()=>{
            dispatch({type:'CREATE_EVENT',event});

        }).catch((err)=>{
            dispatch({type:'CREATE_EVENT_ERROR',err})
        })
    }
};


export const chat=(messages)=>{
    return(dispatch,getState,{getFirebase,getFirestore})=>{
        const firestore=getFirestore();
        const profile=getState().firebase.profile;
        const autorId=getState().firebase.auth.uid;
        firestore.collection('messages').add({
            ...messages,
            authorId:autorId,
            createAt:new Date()
        }).then(()=>{
            dispatch({type:'CREATE_EVENT',messages});
        }).catch((err)=>{
            dispatch({type:'CREATE_EVENT_ERROR',err})
        })
    }
};