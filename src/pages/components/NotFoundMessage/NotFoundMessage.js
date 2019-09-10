import React from 'react';
import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
        textAlign:'center',
        paddingTop:20
    },
  }));

export default (props)=>{
    const classes = useStyles();
    
    return <Typography className={classes.title} variant="h6" noWrap data-testid="notfound">
        {props.message || 'Not Found'}
    </Typography>
}