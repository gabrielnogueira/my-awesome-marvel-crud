import {actionTypes} from './actions';

export default (state, action) => {
    const {data} = action.payload ? action.payload.data : {};
    switch(action.type){
        case actionTypes.FETCH_CHARACTERS:
            return {
                ...state,
                characters: data.results,
                total: data.total,
                isLoading:false
            }
        case actionTypes.FETCH_MORE_CHARACTERS:
                return {
                    ...state,
                    characters: [
                        ...state.characters,
                        ...data.results,
                    ],
                    total: data.total,
                    isLoading:false
                }
        default:
            return state
    }
}