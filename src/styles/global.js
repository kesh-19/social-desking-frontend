import { makeStyles } from '@material-ui/core/styles';

const useGlobalStyles = makeStyles((theme) => ({
    primary: {
        color: "#0020a9"
    },
    backdrop: {
      zIndex: 999999,
      color: '#fff',
    },
  }));

export default useGlobalStyles;