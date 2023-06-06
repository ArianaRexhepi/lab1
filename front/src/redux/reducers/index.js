import { SET_USER } from '../actions/types';

const initialUserState = {
    user: null,
};

const rootReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}

export default rootReducer;