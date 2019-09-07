import api from 'api';

export const actionTypes = {
    FETCH_CHARACTERS: 'FETCH_CHARACTERS',
    FETCH_MORE_CHARACTERS: 'FETCH_MORE_CHARACTERS',
    FETCH_SERIES: 'FETCH_SERIES',
    FETCH_MORE_SERIES: 'FETCH_MORE_SERIES'
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

export const fetchSeries = (id, params) => (
    {
        type: actionTypes.FETCH_SERIES,
        payload: api.get(`/characters/${id}/series`, {
            ...params
        })
    }
)

export const fetchMoreSeries = (id, params) => (
    {
        type: actionTypes.FETCH_MORE_CHARACTERS,
        payload: api.get(`/characters/${id}/series`, {
            ...params
        })
    }
)