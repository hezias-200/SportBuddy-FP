export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' });

        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err })
        });
    }
}
export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' });
        });
    }
}
export const createProfile = (user) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const autorId = getState().firebase.auth.uid;
        firestore.collection('users').doc(autorId).update({
            ...user,
            imgUrl:user.imgUrl,
            age: user.age,
            city: user.city,
            description: user.description,
            phone: user.phone,
        }).then(() => {
            dispatch({ type: 'CREATEPROFILE_SUCCESS' })

        }).catch(err => {
            dispatch({ type: 'CREATEPROFILE_ERROR', err })
        })
    }
}
export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({

                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0],
            })
              


        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })

        }).catch(err => {
            dispatch({ type: 'SIGNUP_ERROR', err })


        })
    }
}

