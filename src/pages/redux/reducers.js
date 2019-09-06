import {actionTypes} from './actions';

export default (state, action) => {
    switch(action.type){
        case actionTypes.FETCH_CHARACTERS:
            return {
                ...state,
                characters: action.payload.data.data.results,
                isLoading:false
            }
        default:
            return state
    }
}