import React, {useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from '@material-ui/core';
import { Link, Redirect, useHistory } from "react-router-dom"
import {auth} from "../config/firebase"
import { useContext } from 'react';
import { AuthContext } from '../context/AuthService';

const useStyles = makeStyles({
    title: {
        color: 'red',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '350px',
        height: '350px',
        margin: '0 auto',
    },
});

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const classes = useStyles();
    const history = useHistory();
    const user = useContext(AuthContext)
    console.log(user)

    const handleSubmit = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email,password)
            .then(()=>{
                history.push("/")
            }) .catch((error)=>{
                console.error("ログイン失敗", error)
            })
    }

    if(user) {
        return <Redirect to="/" />
    }

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <h1 className={classes.title}>ログインページ</h1>
            <TextField type="email" label="メールアドレス" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField type="password" label="パスワード" variant="outlined" value={password} onChange={(e)=> setPassword(e.target.value)} />
            <Button type="submit" variant="contained" color="secondary">
                ログイン
            </Button>
            <Link to='/signup'>アカウントをお持ちでない方</Link>
        </form>
    );
};

export default Login;