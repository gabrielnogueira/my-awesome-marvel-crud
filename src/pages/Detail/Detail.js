import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {AppBar, Masonry} from '../components';
import {fetchSeries, fetchMoreSeries} from '../redux/actions';
import {getSelectedCharacter} from  '../redux/selectors';
import Skeleton from './Skeleton';

const defaultParams = {limit:20}

const Details = (props) => {
    const {selectedCharacter = {}, series = null, totalSeries = 0, isLoading = true, fetchSeries} = props; 

    useEffect(() => {
        fetchSeries(selectedCharacter.id, defaultParams);
    }, [fetchSeries])

    return <div>
            <AppBar title={<div style={{width:'100%', textAlign:'center'}}>{selectedCharacter.name}</div>} />
            {series == null ? <div><Skeleton /></div> :
            <Masonry items={series.map(ser=>({id:ser.id, title:ser.name, imageSrc:`${ser.thumbnail.path}.${ser.thumbnail.extension}` }))}
                        total={totalSeries}
                        loadMore={()=> fetchMoreSeries(selectedCharacter.id, {offset:series.length, ...defaultParams})}
                />}
        </div>
}

const mapStateToProps = (state, props) => ({
    selectedCharacter: getSelectedCharacter(state, props.match.params.id),
    isLoading: state.isLoading,
    series: state.series,
    totalSeries: state.totalSeries
})
const mapDispatchToProps = dispatch => bindActionCreators({
    fetchSeries,
    fetchMoreSeries
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Details)