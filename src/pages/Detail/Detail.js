import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {AppBar, Masonry} from '../components';
import {setCharacter, fetchCharacter, fetchMoreSeries, setCharacterData} from '../redux/actions';
import {getSelectedCharacter, getSeries, getTotalSeries} from  '../redux/selectors';
import {reduxForm} from 'redux-form';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    Button,
    Divider,
    Typography
  } from '@material-ui/core'
import {Field} from 'redux-form';
import Skeleton from './Skeleton';

const defaultParams = {limit:10}

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
    editArea:{
        padding: '1.5em',
        maxWidth: '960px',
        marginRight: 'auto',
        marginLeft: 'auto',
        display:'flex',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    }
  }));

const renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  )

const Details = (props) => {
    const {
        selectedCharacterId,
        selectedCharacter = {}, 
        series = null,
        totalSeries = 0, 
        setCharacter, 
        fetchCharacter, 
        fetchMoreSeries,
        setCharacterData,
        handleSubmit,
        initialize
    } = props;

    const classes = useStyles();
    const [stateEdit, setStateEdit] = useState(false);

    const saveCharacter = ({name, description}) => {
        setCharacterData(selectedCharacterId, name, description)
        setStateEdit(false);
    }

    const cancelEdit = () => {
        initialize(selectedCharacter)
        setStateEdit(false);
    }

    useEffect(() => {
        if(selectedCharacter.id){
            setCharacter(selectedCharacter);
        }else{
            fetchCharacter(selectedCharacterId)
        }

        // eslint-disable-next-line
    }, [setCharacter, fetchCharacter])

    const charImgSrc = selectedCharacter.thumbnail ? `${selectedCharacter.thumbnail.path}.${selectedCharacter.thumbnail.extension}` : '';
   
   return <div>
            <AppBar title={<div style={{width:'100%', textAlign:'center'}}>{selectedCharacter.name}</div>} />
            <div className={classes.editArea} >
                <img style={{width:'400px', borderRadius: '10px'}} src={charImgSrc} alt={selectedCharacter.name} />
                <div style={{paddingTop:40, paddingLeft:40, display:'flex', justifyContent:'center', flexDirection:'column', width:'100%'}}>
                    <Field name="name" component={renderTextField} label="Name" disabled={!stateEdit} />
                    <Field name="description" component={renderTextField} label="Description" style={{marginTop:20}} multiline rows={10} rowsMax={10} disabled={!stateEdit} />
                    <div style={{width:'100%', textAlign:'right'}}>
                        {!stateEdit && <Button className={classes.button} onClick={()=>setStateEdit(true)}>Edit</Button>}
                        {stateEdit && <div>
                            <Button variant="contained" color="primary" className={classes.button}  onClick={handleSubmit(saveCharacter)}>Save</Button>
                            <Button variant="outlined" className={classes.button} onClick={()=>cancelEdit()}>Cancel</Button>
                        </div>}
                    </div>
                </div>
            </div>
            <div style={{maxWidth: '960px', marginRight: 'auto', marginLeft: 'auto'}}>
                <Typography gutterBottom variant="h6" style={{marginLeft: '24px'}}>
                    Series
                </Typography>
                <Divider variant="middle" />
            </div>
            
            {series == null ? <div><Skeleton /></div> :
            <Masonry items={series.map(ser=>({id:ser.id, title:ser.title, imageSrc:`${ser.thumbnail.path}.${ser.thumbnail.extension}`}))}
                        total={totalSeries}
                        loadMore={()=> fetchMoreSeries(selectedCharacter.id, {offset:series.length, ...defaultParams})}
                />}
        </div>
}

const mapStateToProps = ({pages}, props) => {
    const selectedCharacter = getSelectedCharacter(pages, props.match.params.id);
   
    return {
        selectedCharacter,
        initialValues: selectedCharacter,
        selectedCharacterId: props.match.params.id,
        series: getSeries(pages, props.match.params.id),
        totalSeries: getTotalSeries(pages, props.match.params.id)
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    setCharacter, 
    fetchCharacter, 
    fetchMoreSeries,
    setCharacterData
}, dispatch)

const DetailsForm = reduxForm({
    form: 'selectedCharacter',
    enableReinitialize:true
})(Details)

export default connect(mapStateToProps, mapDispatchToProps)(DetailsForm)