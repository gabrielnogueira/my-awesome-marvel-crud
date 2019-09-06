import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchCharacters, fetchMoreCharacters} from '../redux/actions';
import ReactBricks from 'react-bricks-infinite';
import SearchBar from 'material-ui-search-bar'

const defaultParams = {limit:10}
const getFetchParams = (searchText=null, customParams={}) => {
    if(searchText){
        customParams.nameStartsWith = searchText;
    }

    return {
        ...defaultParams,
        ...customParams
    }
}

const Master = (props) => {
    const {characters, fetchCharacters, fetchMoreCharacters} = props;
    const [searchText, setSearchText] = useState();
    const [delaySearch, setDelaySearch] = useState();

    const clearDelay = () =>{
        if(delaySearch) {
            clearTimeout(delaySearch);
        }
    }

    useEffect(() => {
        fetchCharacters(getFetchParams(searchText));
    }, [fetchCharacters, searchText])


    return  props.isLoading ? 
            <div>Loading...</div> : 
            <div>
                <SearchBar
                    onChange={(searchText)=> {
                        clearDelay();
                        setDelaySearch(setTimeout(() => {
                            setSearchText(searchText);
                        }, 300))
                    }}
                    onRequestSearch={(searchText) => {
                        clearDelay(); 
                        setSearchText(searchText)
                    }}
                    style={{
                        margin: '0 auto',
                        maxWidth: 800
                    }}
                    />
                <ReactBricks
                    containerId = {"bricks-container-app"}
                    loadMoreBricks = {()=> {
                        fetchMoreCharacters(getFetchParams(searchText, {offset:characters.length}))
                    }}
                    hasMoreBricks  = {true}
                    reRender = {false}
                    bricks= {characters.map(char=><div>{char.name}</div>)}
                />
            </div>

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