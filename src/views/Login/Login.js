import React, { Component } from "react";
import axios from "axios";

import './login.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: ""
        }
        this.handleClickLogin = this.handleClickLogin.bind(this);
    }

    handleClickLogin = () => {

        const name = document.getElementById("name").value;
        const password = document.getElementById("password").value;

            axios.post('http://localhost/BUSINESSSW/login.php', {
                "name": name,
                "password": password
            
            })
            .then(response => response.data)
            .then(data => {
                if (data.ok.length >0) {
                    console.log("Name "+data.ok[0].NAME)
                    this.props.updateState(true, name, data.ok[0].USER_ID)

                } else {
                    new Notification("Login fehlgeschlagen", { body: "Zu dem Usernamen und Passwort ist kein registrierter Benutzer hinterlegt!" })
                }
            });
         
            
            ;


        }
    render() {
        const { name, password } = this.state;
            return(
                <div className='div-login'>
                    <h1>Anmelden</h1>
                    <div>
                            <input type='text' id='name' name='name' placeholder='name...'/>
                            <input type='password' id='password' name='password' placeholder='password...'/>
                            <button onClick={this.handleClickLogin}>Log In</button>
                    </div>
                </div>
            )
        }
    }