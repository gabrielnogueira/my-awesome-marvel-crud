// eslint-disable-next-line
export const getSelectedCharacter = (state, id) => state.customCharacters[id] || state.characters.filter(char=>char.id == id)[0] || {}

export const getSeries = (state, id) => state.customCharacters[id] ? state.customCharacters[id].series || null : null;

export const getTotalSeries = (state, id) => state.customCharacters[id] ? state.customCharacters[id].totalSeries || 0 : 0;

