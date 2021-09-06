
export const createEvent=(event)=>{
    return(dispatch,getState,{getFirebase,getFirestore})=>{
        const firestore=getFirestore();
        const profile=getState().firebase.profile;
        const autorId=getState().firebase.auth.uid;

        firestore.collection('events').add({
            ...event,
            authorId:autorId,
            createAt:new Date()
        }).then(()=>{
            
            dispatch({type:'CREATE_EVENT',event});

        }).catch((err)=>{
            dispatch({type:'CREATE_EVENT_ERROR',err})
        })
    }
};