import React, {useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../api/Login";
import {mobile} from "../responsive";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {processStart} from "../redux/userRedux";

const Container = styled.div `
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
          rgba(255,255,255,0.5),
          rgba(255,255,255,0.5)),
  url("https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNsZWFuaW5nJTIwc2VydmljZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60")
  center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div `
  padding: 20px;
  width: 25%;
  background-color: black;
  color: white;
  ${mobile({
    width: "85%",
  })}
`;

const Title = styled.h1 `
  font-size: 24px;
  font-weight: 300;
  text-align: center;
`;

const Form = styled.form `
  display: flex;
  flex-direction: column;
`;

const Input = styled.input `
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const SubmitButton = styled.button `
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: forestgreen;
  color: black;
  cursor: pointer;
  margin: 10px 0;
  border-radius: 15px;
  transition: all 0.5s ease;
  
  &:hover {
    transform: scale(1.1);
    transform-origin: center
  }
`;

const LinkText = styled.a `
  margin: 5px 0;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

/**
 * @author Adeeba S D
 * @returns {JSX.Element} - Login Page with form
 */
const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    let {error, errorMessage} = useSelector(state => state.user);

    const handleLoginButtonClick = (event) => {
        event.preventDefault(); // prevents the refresh of the page
        login(dispatch, {email, password}).then(() => {});
    }

    const handleErrorDialogClose = () => {
        dispatch(processStart());
    };

    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input type="text" placeholder="Username"
                           onChange={(e)=> setEmail(e.target.value)}
                    />
                    <Input type="password" placeholder="Password"
                           onChange={(p) => setPassword(p.target.value)}
                    />
                    <SubmitButton onClick={handleLoginButtonClick}>LOGIN</SubmitButton>
                    <LinkText>DON'T REMEMBER YOUR PASSWORD?</LinkText>
                    {
                        error &&
                        <Dialog
                            open={error}
                            onClose={handleErrorDialogClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Error while logging into account!!"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {errorMessage}                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleErrorDialogClose} autoFocus>
                                    Agree
                                </Button>
                            </DialogActions>
                        </Dialog>
                    }
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Login;