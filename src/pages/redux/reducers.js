import {actionTypes} from './actions';

export default (state, action) => {
    const {data} = action.payload ? action.payload.data : {};
    switch(action.type){
        case actionTypes.FETCH_CHARACTERS:
            return {
                ...state,
                characters: data.results,
                total: data.total,
            }
        case actionTypes.FETCH_MORE_CHARACTERS:
            return {
                ...state,
                characters: [
                    ...state.characters,
                    ...data.results,
                ],
                total: data.total,
            }
        case actionTypes.FETCH_SERIES:
                return {
                    ...state,
                    series: data.results,
                    totalSeries: data.total,
                }
        case actionTypes.FETCH_MORE_SERIES:
            return {
                ...state,
                series: [
                    ...state.series,
                    ...data.results,
                ],
                totalSeries: data.total,
            }
        default:
            return state
    }
}