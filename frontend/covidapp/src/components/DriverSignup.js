import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { signup } from "../features/authentication/auth";
import { Alert } from "@material-ui/lab";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "85px",
    minWidth: "45vw",
    backgroundColor: "white",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  subLink: {
    display: "flex",
    justifyContent: "space-between",
  },
  contact: {
    height: "100px",
  },
}));

export default function DriverSignup() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const [formState, setFormState] = useState({
    numberplate: "",
    driversName: "",
    contact: null,
    address: "",
    available: false,
    password: "",
  });
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);
    // const res = await dispatch(signup(formState));
    // console.log(res);

    // if (res.type === "auth/signup/rejected") {
    //   setErrorMessage(res.payload);
    //   console.log(res.payload);
    // } else {
    //   console.log(res.payload);
    //   setErrorMessage(null);
    //   setFormState({
    //     numberplate: "",
    // driversName: "",
    // contact: null,
    // address: "",
    // available: false,
    // password: "",
    //   });
    // }
  };
  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="driversName"
                variant="outlined"
                required
                fullWidth
                id="driversName"
                label="Driver Name"
                value={formState.driversName}
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PhoneInput
                className={classes.contact}
                inputProps={{
                  name: "contact",
                  required: true,
                  autoFocus: true,
                }}
                placeholder="Contact Number"
                value={formState.contact}
                onChange={(e) => setFormState({ ...formState, contact: e })}
                inputStyle={{
                  height: "55px",
                  width: "275px",
                }}
                disableCountryCode="true"
                disableDropdown="true"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                value={formState.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="numberplate"
                label="Number Plate"
                name="numberplate"
                value={formState.numberplate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </Grid>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">
                Available Now
              </InputLabel>
              <Select
                native
                value={formState.available}
                onChange={handleChange}
                label="usertype"
                inputProps={{
                  name: "available",
                  id: "outlined-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                <option value={"Yes"}>Yes</option>
                <option value={"No"}>No</option>
              </Select>
            </FormControl>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid container className={classes.subLink}>
              <Link href="/driverlogin" variant="body2">
                Already have an account? Sign in
              </Link>
              <Link href="/signup" variant="body2">
                Sign Up as a Customer
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
