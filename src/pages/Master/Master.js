import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchCharacters, fetchMoreCharacters} from '../redux/actions';
import {AppBar, Masonry} from '../components';
import Skeleton from './Skeleton';

const defaultParams = {limit:20}
const getFetchParams = (searchText=null, customParams={}) => {
    if(searchText && searchText !== ''){
        customParams.nameStartsWith = searchText;
    }

    return {
        ...defaultParams,
        ...customParams
    }
}

const Master = (props) => {
    const {characters, fetchCharacters, fetchMoreCharacters, total} = props;
    const [searchText, setSearchText] = useState();
    
    useEffect(() => {
        fetchCharacters(getFetchParams(searchText));
    }, [fetchCharacters, searchText])

    return  <div>
                <AppBar onSearch={setSearchText} searchPlaceholder="Search Characters" />
                {props.isLoading ? <div><Skeleton /></div> :
                <Masonry items={characters.map(char=>({id:char.id, title:char.name, imageSrc:`${char.thumbnail.path}.${char.thumbnail.extension}` }))}
                         total={total}
                         loadMore={()=> fetchMoreCharacters(getFetchParams(searchText, {offset:characters.length}))}
                    />}
            </div>

}

const mapStateToProps = state => ({
    characters: state.characters,
    isLoading: state.isLoading,
    total: state.total,
})
const mapDispatchToProps = dispatch => bindActionCreators({
    fetchCharacters,
    fetchMoreCharacters
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Master)