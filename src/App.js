import React, {useState} from 'react';
import Menu from "./components/Menu/Menu";
import Reservierungen_All_Users from "./views/Reservierungen_All_Users";
import Reservierungen_Single_User from "./views/Reservierungen_Single_User";
import ScooterStatus from "./views/ScooterStatus";
import ScooterReservation from "./views/ScooterReservation";
import Login from "./views/Login/Login";

import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

function App() {

    function updateState(bool, userName, userId){
        localStorage.setItem('showWebsite', bool);
        localStorage.setItem('userName', userName);
        localStorage.setItem('userId', userId);
        window.location.reload()
    }
    function logout() {
        localStorage.setItem('showWebsite', '');
        localStorage.setItem('userName', '');
        localStorage.setItem('userId', '');
        window.location.reload()
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
        </BrowserRouter>
            : <Login updateState={updateState}/>
    );
}
export default App;
