import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import {AuthProvider} from "./context/AuthService"

import Login from './pages/Login'
import Room from './pages/Room';
import Signup from './pages/Signup';
import LoggedInRoute from "./components/LoggedInRoute"

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Switch>
                    <LoggedInRoute exact path="/" component={Room} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                </Switch>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;