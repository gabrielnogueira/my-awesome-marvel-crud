import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchCharacters} from '../redux/actions';

const Master = (props) => {
    const { fetchCharacters } = props;

    useEffect(() => {
        fetchCharacters({limit:10});
    }, [fetchCharacters])

    if(props.isLoading){
        return <div>Loading...</div>
    }

    return <div>Hello World! {props.characters.length}</div>
}

const mapStateToProps = state => ({
    characters: state.characters,
    isLoading: state.isLoading
})
const mapDispatchToProps = dispatch => bindActionCreators({
    fetchCharacters
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Master)