import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    StatusText: {
        color: "rgb(0,51,102)"
    },
    Section: {
        padding: "75px 0px"
    },
    Text: {
        fontSize: '32px',
        marginBottom: '24px',
        fontWeight: '700',
        color: "rgb(0,51,102)",
    },
    Subtext: {
        fontSize: '14px',
        textAlign: 'center',
        color: "rgb(0,51,102)"
    },
    item: {
        boxShadow: "0px 0px 4px grey",
        padding: "30px",
        width: '450px',
        textAlign: "center"
    }
}));

export default function Overview() {
    const classes = useStyles()

    return (
        <Grid container className={classes.Section}>
            <Box mt={3} mb={7}>
                <Typography variant='h3' >
                    Overview
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={6} container justify='center' alignItems='center' >
                    <Box m={2} className={classes.item}>
                        <Typography className={classes.Text}>
                            SignUp
                        </Typography>
                        <Typography className={classes.Subtext}>
                            Signup and enjoy full benifits, It's totally free!
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} container justify='center' alignItems='center'>
                    <Box m={2} className={classes.item}>
                        <Typography className={classes.Text}>
                            Pickup
                        </Typography>
                        <Typography className={classes.Subtext}>
                            Enter pickup and drop locations with pincodes
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} container justify='center' alignItems='center'>
                    <Box m={2} className={classes.item}>
                        <Typography className={classes.Text}>
                            Ambulance
                        </Typography>
                        <Typography className={classes.Subtext}>
                            Enter time and choose from available options
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} container justify='center' alignItems='center'>
                    <Box m={2} className={classes.item}>
                        <Typography className={classes.Text}>
                            To Hospital
                        </Typography>
                        <Typography className={classes.Subtext}>
                            Now get to your nearest hospital in no time
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    )
}