import React, {useState} from 'react';
import { makeStyles} from "@material-ui/core/styles";
import { TextField, Button } from '@material-ui/core';
import { Link, useHistory } from "react-router-dom";
import { auth } from '../config/firebase';

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

const Signup = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const classes = useStyles();
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        auth
            .createUserWithEmailAndPassword(email, password)
        .then((response)=>{
            response.user.updateProfile({
                displayName: username,
            })
            .then(() => {
                history.push('/');
            });
        })
        .catch((error)=>{
            console.error('ユーザー作成失敗', error);
        });
    };
    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <h1 className={classes.title}>ユーザー登録ページ</h1>
            <TextField type="text" label="ユーザー名" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <TextField type="email" label="メールアドレス" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value) }/>
            <TextField type="password" label="パスワード" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Button variant="contained" color="primary">
                登録
            </Button>
            <Link to='/login'>既にアカウントをお持ちの方</Link>
        </form>
    );
};

export default Signup;