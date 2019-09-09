import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchCharacters, fetchMoreCharacters, setIsLoading} from '../redux/actions';
import {AppBar, Masonry} from '../components';

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
    const {characters = null, 
        fetchCharacters, 
        fetchMoreCharacters, 
        setIsLoading,
        total, 
        isLoading} = props;
    const [searchText, setSearchText] = useState();

    const searchCharacters = (searchText) => {
        setIsLoading(true);
        setSearchText(searchText);
    }

    useEffect(() => {
        fetchCharacters(getFetchParams(searchText));
    }, [fetchCharacters, searchText])

    return  <div>
                <AppBar title={<div>Marvel Comics Explorer</div>} 
                        onSearch={(value)=> (value.length >= 3 || !value) && searchCharacters(value)} 
                        searchPlaceholder="Search Characters" />
                {isLoading ? 
                    <Masonry.Skeleton /> :
                    <Masonry items = {
                        characters.map(char => ({
                            id: char.id,
                            title: char.name,
                            imageSrc: `${char.thumbnail.path}.${char.thumbnail.extension}`
                        }))
                    }
                    total = {total}
                    loadMore = {() => fetchMoreCharacters(getFetchParams(searchText, {
                            offset: characters.length
                        }))}
                    />}
            </div>

}

const mapStateToProps = ({pages}) => ({
    characters: pages.characters,
    total: pages.total,
    isLoading: pages.isLoading
})
const mapDispatchToProps = dispatch => bindActionCreators({
    fetchCharacters,
    fetchMoreCharacters,
    setIsLoading
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Master)