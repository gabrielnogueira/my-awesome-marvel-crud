import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchCharacters} from '../redux/actions';

const Master = (props) => {
    const { fetchCharacters } = props;

    useEffect(() => {
        fetchCharacters({limit:10});
    }, [fetchCharacters])

    return <div>Hello World! {props.characters.length}</div>
}

const mapStateToProps = state => ({
    characters: state.characters
})
const mapDispatchToProps = dispatch => bindActionCreators({
    fetchCharacters
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Master)