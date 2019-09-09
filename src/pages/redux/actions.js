import api from 'api';

export const actionTypes = {
    FETCH_CHARACTERS: 'FETCH_CHARACTERS',
    FETCH_MORE_CHARACTERS: 'FETCH_MORE_CHARACTERS',
    FETCH_CHARACTER: 'FETCH_CHARACTER',
    FETCH_MORE_SERIES: 'FETCH_MORE_SERIES',
    SET_CHARACTER_DATA: 'SET_CHARACTER_DATA',
    SET_IS_LOADING: 'SET_IS_LOADING'
}

export const fetchCharacters = params => dispatch => {
    dispatch(setIsLoading(true));
    api.get('/characters', {
        ...params
    }).then(result=>dispatch({
            type: actionTypes.FETCH_CHARACTERS,
            payload: result.data
        }
    ))
}

export const fetchMoreCharacters = params => dispatch => {
    api.get('/characters', {
        ...params
    }).then(result => dispatch({
        type: actionTypes.FETCH_MORE_CHARACTERS,
        payload: result.data
        }
    ))
}
//tentar buscar as series antes e setar o character já com serie, economizamos 1 chamada ao reducer
export const setCharacter = character => dispatch =>{
        api.get(`/characters/${character.id}/series`, {
            limit:10
        }).then(result=> dispatch({
            type: actionTypes.FETCH_CHARACTER,
            payload: {data:{character, series:result.data.data}},
        }))
}

export const fetchCharacter = id => dispatch => {
    const getCharacter = api.get(`/characters/${id}`, {});

    const getSeries = api.get(`/characters/${id}/series`, {
        limit:10
    });

    Promise.all([getCharacter, getSeries]).then(([characterResult, seriesResult]) => {
        dispatch({
            type: actionTypes.FETCH_CHARACTER,
            payload: {data:{character:characterResult.data.data.results[0], series:seriesResult.data.data}},
        })
    })
}

export const fetchMoreSeries = (id, params) => dispatch => {
    api.get(`/characters/${id}/series`, {
        ...params
    }).then(result=> dispatch({
            type: actionTypes.FETCH_MORE_SERIES,
            payload: {data:{character:{id}, series:result.data.data}},
        })
    )
}

export const setCharacterData = (id, name, description) => ({
    type:actionTypes.SET_CHARACTER_DATA,
    payload: {data:{id, name, description}}
})

export const setIsLoading = (isLoading) => ({
    type:actionTypes.SET_IS_LOADING,
    payload: isLoading
})