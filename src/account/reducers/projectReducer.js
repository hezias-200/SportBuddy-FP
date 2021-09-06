const initState = {}
const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_EVENT':
            console.log('created event', action.event);
            return state;
        case 'CREATE_EVENT_ERROR':
            console.log('create event EROOR', action.err);
            return state;
        case 'CREATE_PROFILE':
            console.log('create PROFILE', action.event);
            return state;
        case 'CREATE_PROFILE_ERROR':
            console.log('create PROFILE EROOR', action.err);
            return state;
        default:
            return state;
    }
}
export default projectReducer