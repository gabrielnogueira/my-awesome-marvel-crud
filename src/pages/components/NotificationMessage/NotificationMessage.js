import React, {useState, useEffect} from 'react';
import {
    Snackbar,
    SnackbarContent,
    Button,
    IconButton,
  } from '@material-ui/core'
  import clsx from 'clsx';
  import { amber, green } from '@material-ui/core/colors';
  import CheckCircleIcon from '@material-ui/icons/CheckCircle';
  import ErrorIcon from '@material-ui/icons/Error';
  import CloseIcon from '@material-ui/icons/Close';
  import { makeStyles } from '@material-ui/core/styles';

  const variantIcon = {
    success: CheckCircleIcon,
    error: ErrorIcon,
  };

  const useStyles1 = makeStyles(theme => ({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  }));

export default (props) => {
    const [open, setOpen] = useState(false);
    const {onLoad} = props;
    useEffect(() => {
        onLoad(setOpen.bind(this));
        // eslint-disable-next-line
    }, [onLoad])
    return <Snackbar
        anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={props.onClose}
    >
                <MySnackbarContentWrapper {...props} />
        </Snackbar>
}

const MySnackbarContentWrapper =  (props) => {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];
  
    return (
      <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    );
  }