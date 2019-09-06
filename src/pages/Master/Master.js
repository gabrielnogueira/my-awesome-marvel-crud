import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchCharacters, fetchMoreCharacters} from '../redux/actions';
import ReactBricks from 'react-bricks-infinite';

const Master = (props) => {
    const {characters, fetchCharacters, fetchMoreCharacters } = props;

    useEffect(() => {
        fetchCharacters({limit:10});
    }, [fetchCharacters])

    if(props.isLoading){
        return <div>Loading...</div>
    }

    const charactersCard = characters.map(char=><div>{char.name}</div>)

    return  <ReactBricks
        containerId = {"bricks-container-app"}
        loadMoreBricks = {()=> fetchMoreCharacters({limit:10, offset:characters.length})}
        hasMoreBricks  = {true}
        reRender = {false}
        bricks= {charactersCard}
    />
}

const mapStateToProps = state => ({
    characters: state.characters,
    isLoading: state.isLoading
})
const mapDispatchToProps = dispatch => bindActionCreators({
    fetchCharacters,
    fetchMoreCharacters
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Master)