import {actionTypes} from './actions';

export default (state = {}, action) => {
    const {data} = action.payload ? action.payload : {};
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
                    }
                    
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
                }
                
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
        default:
            return state
    }
}