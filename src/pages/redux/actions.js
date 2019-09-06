import api from 'api';

export const actionTypes = {
    FETCH_CHARACTERS: 'FETCH_CHARACTERS'
}

export const fetchCharacters = params => ({
    type: actionTypes.FETCH_CHARACTERS,
    payload: api.get('/characters', {...params})
})