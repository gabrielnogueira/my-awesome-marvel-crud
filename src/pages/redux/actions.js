import api from 'api';

export const actionTypes = {
    FETCH_CHARACTERS: 'FETCH_CHARACTERS',
    FETCH_MORE_CHARACTERS: 'FETCH_MORE_CHARACTERS',
}

export const fetchCharacters = params => (
    {
        type: actionTypes.FETCH_CHARACTERS,
        payload: api.get('/characters', {
            ...params
        })
    }
)

export const fetchMoreCharacters = params => (
    {
        type: actionTypes.FETCH_MORE_CHARACTERS,
        payload: api.get('/characters', {
            ...params
        })
    }
)