import { makeStyles } from '@material-ui/core/styles';

const useNewBookingStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
    //   color: theme.palette.text.secondary,
    },
    image: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: '13px',
        color: '#8198fe'
    },
    listChip: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.spacing(2),
    },
    chip: {
        fontSize: '15px',
        border: '2px solid #0020a9',
        color: '#0020a9',
        fontWeight: 'bold'
    },
    formControlBox: {
        // border: '1px solid red',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    percentage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    progress: {
        width: '75%',
        paddingLeft: '40px',
        marginTop: '27px'
    },
    confirmButton: {
        backgroundColor: '#0020a9',
        color: 'white',
        marginBottom: '1rem',
        '&:hover': {
            backgroundColor: 'green'
        }
    },
    bookingHeader: {
        textDecoration: 'underline',
    }
}));

export default useNewBookingStyles;