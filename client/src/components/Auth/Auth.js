import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Typography,
  Paper,
  Grid,
  Avatar,
  Button,
  FormControl,
} from "@material-ui/core/index";
import LockOpenRoundedIcon from "@material-ui/icons/LockOpenRounded";
import GoogleLogin from "react-google-login";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Input from "../Auth/Input";
import Icon from "./Icon";
import {
  googleSignIn,
  logOut,
  signIn,
  signUp,
} from "../../actions/userActions";

const AuthContainer = styled(Paper)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 20vw;
  padding: 5vh;
  margin: auto;
  box-shadow: 2px 2px 5px lightgrey, -2px -2px 5px lightgrey,
    -2px 2px 5px lightgrey, 2px -2px 5px lightgrey;
`;
const SwitchText = styled.div`
  width: 100%;
  text-align: end;
  margin-top: 1vh;
`;

const SignButton = styled(Button)`
  && {
    width: 100%;
    margin: 1vh 1vh;
  }
`;

const Auth = () => {
  const { REACT_APP_CLIENT_ID } = process.env;
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.authReducer);

  const [isSignup, setIsSignup] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("profile")) {
      history.push("/home");
    }
  });

  useEffect(() => {});

  const handleshowPass = () => {
    setShowPass(!showPass);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSwitch = () => {
    setIsSignup(!isSignup);
    dispatch(logOut());
    setShowPass(false);
    console.log(state.error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signUp(formData, history));
    } else {
      dispatch(signIn(formData, history));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    dispatch(googleSignIn(result, token));
    history.push("/home");
  };

  const googleError = (err) => {
    console.log("Google Sign In was unsuccessful");
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
      }}
    >
      <AuthContainer elevation={3} variant="outlined">
        <Avatar style={{ height: "100px", width: "100px" }}>
          <LockOpenRoundedIcon fontSize="large" />
        </Avatar>
        <Typography style={{ margin: "5vh" }} variant="h4">
          {isSignup ? "Sign up" : "Sign In"}
        </Typography>
        <form>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            {state.error && (
              <Typography color="error">Incorrect Password or Email</Typography>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPass ? "text" : "password"}
              handleshowPass={handleshowPass}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
            <SignButton variant="contained" onClick={handleSubmit}>
              {isSignup ? "Sign Up" : "Sign In"}
            </SignButton>
          </Grid>
        </form>
        {!isSignup && (
          <GoogleLogin
            clientId={REACT_APP_CLIENT_ID}
            render={(renderProps) => (
              <Button
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
                style={{ margin: "2vh 0" }}
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
        )}
        <SwitchText>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <Button onClick={handleSwitch}>
            {isSignup ? "Sign in" : "Sign Up"}
          </Button>
        </SwitchText>
      </AuthContainer>
    </div>
  );
};

export default Auth;
