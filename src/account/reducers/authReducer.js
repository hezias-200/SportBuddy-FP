
const initState = {
    authError: null,
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
            return {
                ...state,
                authError: action.err.message
            }
            case 'EDITPROFILE_SUCCESS':
                console.log('signupsucces');
                return {
                    ...state,
                    authError: null
                }
                case 'EDITPROFILE_ERROR':
                return {
                    ...state,
                    authError: action.err.message
                }
                case 'CREATE_EVENT_SUCCESS':
                    console.log('signupsucces');
                    return {
                        ...state,
                        authError: null
                    }
                    case 'CREATE_EVENT_ERROR':
                    return {
                        ...state,
                        authError: action.err.message
                    }

        default:
            return state
    }
}
export default authReducer