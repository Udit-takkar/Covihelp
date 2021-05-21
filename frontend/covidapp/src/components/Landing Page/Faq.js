import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Accordion, AccordionSummary, AccordionDetails, Box} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    Accordion: {
        // width: "calc(100vw - 180px)"
      },
      AccordianHeading: {
        fontSize: "20px",
        // marginLeft: "75px",
        color: "rgb(0,51,102)",
      },
      AccordionDetails: {
        fontSize: "16px",
        // marginLeft: "75px",
        color: "rgb(0,51,102)",
      },
      section: {
        padding: "75px 0px"
      },
}));

export default function Faq() {
    const classes = useStyles();
  
    return (
      <Grid
        className={classes.section}
      >
        <Box mt={3} mb={7}>
          <Typography variant='h3' >
            FAQs
          </Typography>
        </Box>
  
        <Accordion className={classes.Accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.AccordianHeading}>How do I a book an ambulance?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.AccordionDetails}>
              Just go to the booking page enter your pickup location then enter drop location and choose from available ambulances.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.AccordianHeading}>How do I return when I am done?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.AccordionDetails}>
              You can book one way or round trip if you want.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.AccordianHeading}>Can I cancel my bookings prior pickup time?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.AccordionDetails}>
              Yes, but only if you do it atleast an hour before pickup time.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.AccordianHeading}>Can non family members accompany patient?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.AccordionDetails}>
              Yes, but only if family members are not present.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
    )
  }