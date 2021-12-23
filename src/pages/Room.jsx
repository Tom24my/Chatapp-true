import React, {useContext, useEffect, useState} from 'react';
import {auth, db } from "../config/firebase"
import {useHistory} from "react-router-dom"
import {AuthContext} from "../context/AuthService"

import{ makeStyles} from '@material-ui/core/styles';
import { Button, Card, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    message: {
        padding: '15px',
        margin: '15px',
    },
})

const Room = () => {
    const history = useHistory();
    const classes = useStyles();
    const user = useContext(AuthContext)
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        db.collection('messages')
            .add({
                content: text,
                username: user.displayName,
                createdAt: new Date(),
            })
            .then(() => {
                console.log('追加成功');
            })
            .catch((error) =>{
                console.error('追加失敗', error);
            });
    }

    useEffect(()=> {
        db.collection("messages").onSnapshot((querySnapshot)=> {
            const messages = querySnapshot.docs.map((doc) => {
                return doc.data();
            });
            setMessages(messages);
        });
    }, []);

    const logout = () => {
        auth.signOut()
        history.push("/login")
    }
    return( 
    <>
        <h1>Room</h1>
            {messages.map((message, index) => {
                return (
                    <Card key={index} className={classes.message}>
                        <Typography>メッセージ投稿者:{message.username}</Typography>
                        <Typography>{message.constent}</Typography>
                    </Card>
                );
            })}
        <form onSubmit={handleSubmit}>
            <TextField 
                variant="outlined" 
                size="small" 
                placeholder="メッセージを入力" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
            />
            <Button variant="contained" color="secondary"></Button>
        </form>
        <button onClick={logout}>ログアウト</button>
    </>
    );
};

export default Room;