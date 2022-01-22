import React, {useState} from 'react';
import Menu from "./components/Menu/Menu";
import Reservierungen_All_Users from "./views/Reservierungen_All_Users";
import Reservierungen_Single_User from "./views/Reservierungen_Single_User";
import ScooterStatus from "./views/ScooterStatus";
import ScooterReservation from "./views/ScooterReservation";
import Login from "./views/Login/Login";

import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import RoutingElectron from './views/RoutingElectron';

const { ipcRenderer } = window.require('electron');

function App() {

    function updateState(bool, userName, userId){
        ipcRenderer.send('LOGGED_IN_CHANGED', true);
        localStorage.setItem('showWebsite', bool);
        localStorage.setItem('userName', userName);
        localStorage.setItem('userId', userId);
        window.location.reload()
    }
    function logout() {
        ipcRenderer.send('LOGGED_IN_CHANGED', false);
        localStorage.setItem('showWebsite', '');
        localStorage.setItem('userName', '');
        localStorage.setItem('userId', '');
        window.location.reload()
    }

    ipcRenderer.on('LOGOUT_USER', (event, message) => {
        logout()
    });

    if (localStorage.getItem('showWebsite') === 'true') {
        ipcRenderer.send('LOGGED_IN_CHANGED', true);
    }

    return (
        localStorage.getItem('showWebsite') === 'true' ?
            <BrowserRouter>
            <Menu userName={localStorage.getItem('userName')} logout={logout}/>
            <Switch>
                <Route path='/reservierungshistorie' component={Reservierungen_Single_User}/>
                <Route path='/scooterStatus' component={ScooterStatus}/>
                <Route path='/' component={ScooterReservation}/>
            </Switch>
            <RoutingElectron></RoutingElectron>
        </BrowserRouter>
            : <Login updateState={updateState}/>
    );
}
export default App;
