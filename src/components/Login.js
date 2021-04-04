import { Button } from '@material-ui/core'
import { WhatsApp } from '@material-ui/icons'
import React from 'react'
import '../css/login.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { auth, provider } from '../firebase';
import { actionTypes } from '../reducer';
import { useStateValue } from '../StateProvider';


const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#23d566',
    },
  },
});

function Login() {

    const [{}, dispatch] = useStateValue();

    const signin = () => {
        auth.signInWithPopup(provider).then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            })
        }).catch((error) => alert(error.message));
    }
    
    return (
        <ThemeProvider theme={theme}>
            <div className="login">
            <div className="login__container">
                <div className="login__text">
                    <h1>Sign in to Whatsapp 👋</h1>
                </div>
                <Button type="submit" onClick={signin} variant="contained" color="primary">
                    <p>Google sign in</p>
                    <WhatsApp/>
                </Button>
            </div>
        </div>
        </ThemeProvider>
        
    )
}

export default Login
