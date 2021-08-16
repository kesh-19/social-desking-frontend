import React from 'react'
import axios from 'axios'
import Config from './Config';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InfoIcon from '@material-ui/icons/Info';
import TeammateDisplayBig from './TeammateDisplayBig';
import TeammateDisplay from './TeammateDisplay';
import { Hidden } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      marginBottom: '10px'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      marginLeft: '10px'
    },
    accordionHeader: {
        backgroundColor: '#0020a9',
        color: 'white',
        // display: 'flex',
    }
  }));

  const AccordionHeaderSummary = withStyles({
    root: {
      backgroundColor: '#0020a9',
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56,
      },
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {},
  })(MuiAccordionSummary);


  const Accordion = withStyles({
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    expanded: {},
  })(MuiAccordion);

const Recommendations = () => {
    // const [recommendations, setRecommendations] = React.useState(null);
    const [recommendations, setRecommendations] = React.useState(0);
    const [showRecommendations, setShowRecommendations] = React.useState(false);

    const classes = useStyles();

    React.useEffect(() => {
        let today = new Date("2022-07-31");
        let dd, mm, yyyy = null
        
        let i = 1
        let recs = {}
        while (i < 8) {
            today.setDate(today.getDate() + 1)
            
            if ([1,2,3,4,5].includes(today.getDay())) {
                dd = String(today.getDate()).padStart(2, '0');
                mm = String(today.getMonth() + 1).padStart(2, '0'); 
                yyyy = today.getFullYear();
                i++

                let url = Config.serverUrl + '/desking/getrecommendations/' +
                    JSON.parse(window.localStorage.getItem('user')).userId + '/' +
                        yyyy + '-' + mm + '-' + dd
                
                        // //console.log(url)
                axios.get(url)
                    .then(data => {
                        let date = url.split('/')
                        if (data.data.length > 0) setShowRecommendations(true)
                        recs[date[date.length-1]] = data.data
                        if (Object.keys(recs).length === 7) setRecommendations(recs)
                    })
                } 
            }        
    }, [])

    React.useEffect(() => {
        //console.log(recommendations)
    }, [recommendations])
    
    return (
        <div>
            {
                showRecommendations &&
                    <div className={classes.root}>
                        <Accordion>
                            <AccordionHeaderSummary
                                expandIcon={<ExpandMoreIcon color="error" />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className={classes.accordionHeader}
                            >
                                <InfoIcon />
                                <Typography className={classes.heading}>Click to show where your teammates have booked desks!</Typography>
                            </AccordionHeaderSummary>
                            <AccordionDetails style={{display: 'flex', flexDirection: 'column'}}>
                                {
                                    recommendations && Object.keys(recommendations).sort().map(key => {
                                        let obj = recommendations[key]
                                        //console.log(obj)

                                        return (
                                            <div>
                                                <Hidden only="xs">
                                                {
                                                    obj.length > 0 &&
                                                        <Accordion>
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                                aria-controls="panel1a-content"
                                                                id="panel1a-header"
                                                            >
                                                                {key}
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                <TeammateDisplayBig teammate={[...obj]} />
                                                            </AccordionDetails>
                                                        </Accordion>
                                                }
                                                </Hidden>
                                                <Hidden only={['sm','md', 'lg','xl']}>
                                                {
                                                    obj.length > 0 &&
                                                        <Accordion>
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                                aria-controls="panel1a-content"
                                                                id="panel1a-header"
                                                            >
                                                                {key}
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                <TeammateDisplay teammate={[...obj]} />
                                                            </AccordionDetails>
                                                        </Accordion>
                                                }
                                                </Hidden>
                                                
                                            </div>
                                        )
                                    })
                                }
                            </AccordionDetails>
                        </Accordion>
                    </div>
            }
        </div>
    )
}

export default Recommendations
