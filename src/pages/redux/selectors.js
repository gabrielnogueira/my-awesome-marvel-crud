import {createSelector} from 'reselect';

export const getState = state => state;

export const getSelectedCharacter = (state, id) => createSelector(
    getState,
    state => {
        // eslint-disable-next-line
        return state.selectedCharacter || state.characters.filter(char=>char.id == id)[0] || {};
    }
)(state)

