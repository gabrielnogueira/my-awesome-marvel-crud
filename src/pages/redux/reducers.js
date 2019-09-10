import {actionTypes} from './actions';

export default (state = {
    characters:[],
    customCharacters:[],
    isLoading: true,
}, action) => {
    const data = action.payload ? action.payload.data || {} : {};
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
            }
        case actionTypes.SET_CHARACTER_DATA:
                const {id, name, description}  = data;
                return {
                    ...state,
                    customCharacters:{
                        ...state.customCharacters,
                        [id]:{
                            ...state.customCharacters[id],
                            name,
                            description
                        }
                    },
                    isLoading:false
                }
        case actionTypes.FETCH_CHARACTER:
            const {series, character}  = data;
            return {
                ...state,
                customCharacters:{
                    ...state.customCharacters,
                    [character.id]:{
                        ...character,
                        series: series.results,
                        totalSeries: series.total
                    }
                },
                isLoading:false
            }
        case actionTypes.FETCH_SERIES:
                return {
                    ...state,
                    customCharacters:{
                        ...state.customCharacters,
                        [data.character.id]:{
                            ...state.customCharacters[data.character.id],
                            series: data.series.results,
                            totalSeries: data.series.total,
                        }
                    }
                }
        case actionTypes.FETCH_MORE_SERIES:
            return {
                ...state,
                customCharacters:{
                    ...state.customCharacters,
                    [data.character.id]:{
                        ...state.customCharacters[data.character.id],
                        series: [   
                            ...state.customCharacters[data.character.id].series,
                            ...data.series.results,
                        ],
                        totalSeries: data.series.total,
                    }
                }
            }
        case actionTypes.SET_IS_LOADING:
        return {
            ...state,
           isLoading:action.payload
        }
        default:
            return state
    }
}