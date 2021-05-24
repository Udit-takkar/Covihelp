import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GitHubIcon from "@material-ui/icons/GitHub";

const GITHUB_REPO_LINK = "https://github.com/kumarshobhit/Covihelp";

const useStyles = makeStyles((theme) => ({
  footer: {
    position: "relative",
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    padding: "30px 75px",
    marginTop: "20px",
    boxShadow: "0px 5px 5px 5px grey",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      className={classes.footer}
    >
      <Grid item xs={3} container justify="flex-start">
        <a href={GITHUB_REPO_LINK}>
          <GitHubIcon fontSize="large" />
        </a>
      </Grid>
      <Grid item xs={3} justify="flex-end">
        <Typography variant="h6">Contact us</Typography>
      </Grid>
    </Grid>
  );
}
