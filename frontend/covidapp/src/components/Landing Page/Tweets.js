import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    StatusText: {
        color: "rgb(0,51,102)"
    },
}));

export default function Tweets() {
    const classes = useStyles()

    return (
        <Grid container justify='center' alignItems='center'>
            <Box p={10}>
                <Typography variant='h4' className={classes.StatusText}>
                    Coming soon
                </Typography>
            </Box>
        </Grid>
    )
}