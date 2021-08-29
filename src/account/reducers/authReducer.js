
const initState = {
    authError: null
}
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log('error');
            return {
                ...state,
                authError: 'Login failed'
            }
        case 'LOGIN_SUCCESS':
            console.log('loginSUCCES');
            return {
                ...state,
                authError: null,
            }
        case 'SIGNOUT_SUCCESS':
            console.log('signoutsucces');
            return state;
        case 'SIGNUP_SUCCESS':
            console.log('signupsucces');
            return {
                ...state,
                authError: null
            }
            case 'SIGNUP_ERROR':
                console.log('signupError');
                return {
                    ...state,
                    authError: action.err.message
                }
        default:
            return state

    }

}
export default authReducer