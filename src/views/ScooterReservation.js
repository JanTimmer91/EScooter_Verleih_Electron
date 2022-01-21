import React, {Component} from "react";
import styled from 'styled-components';

import escooterimg_sw from '../assets/escooter_sw.jpg';
import escooterimg from '../assets/escooter.jpg';
import './ScooterReservation.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

//const ContentContainer = styled.div`

//`;

class ScooterReservation extends Component {

    scooters = {};

    goBackCallbackFunction = () => {this.handleClickScooterRentalBack();};
    
    constructor(props) {
        super(props);

        this.state = {
            scooterAvailable: false,
            availableScooterId: -1,
            activeReservationId: -1,
            reservedScooterId: -1,
            activePage: ""
        };

        this.handleRentScooter = this.handleRentScooter.bind(this);
        this.handleReturnScooter = this.handleReturnScooter.bind(this);
        this.handleReload = this.handleReload.bind(this);
    }

    getActiveScooterRental() {
        // Check if there is an open reservation

        axios.post('http://localhost/BUSINESSSW/reservationoverviewbypersonempty.php', {id: localStorage.getItem('userId')})
        .then(response => {
            if (response.data.length > 0) {
                this.setState({
                    activeReservationId: response.data[0].RESERVATION_ID,
                    reservedScooterId: response.data[0].SCOOTER_ID
                });
                this.showReturnScooterScreen();
            } else {
                this.setState({
                    activeReservationId: -1,
                    reservedScooterId: -1
                });
                this.scooterAvailable();
            }
            
        });
    }

    scooterAvailable() {
        // Chech if there is an available scooter

        axios.get('http://localhost/BUSINESSSW/getScooterStatus.php')
        .then(response => {
            this.scooters = response.data;
            this.setState({
                scooterAvailable: false,
                availableScooterId: -1
            });
            this.scooters.forEach((scooter) => {
                if (scooter.RESERVATION_STATUS == "Frei") {
                    this.setState({
                        scooterAvailable: true,
                        availableScooterId: parseInt(scooter.SCOOTER_ID)
                    });
                    
                }
            });
            if (this.state.scooterAvailable) {
                this.showRentScooterScreen();
            } else {
                this.showNoScootersAvailableScreen();
            }
        });
    }


    componentDidMount() {
        this.initScooterReservation();
    }


    initScooterReservation() {
        this.getActiveScooterRental();
    }



    handleRentScooter() {
        let post_data = {
            "scooterid": this.state.availableScooterId,
            "userid": localStorage.getItem('userId')
        };

        axios.post('http://localhost/BUSINESSSW/addReservation.php', post_data)
        .then(response => response.data)
        .then((data) => {
            if (data.update && data.insert) {
                this.showRentScooterSuccessScreen();
            } else {
                alert("Der E-Scooter konnte nicht ausgeliehen werden!");
            }            
        });
    }

    handleReturnScooter() {
        let post_data = {
            "reservationid": this.state.activeReservationId,
            "scooterid": this.state.reservedScooterId
        };

        axios.post('http://localhost/BUSINESSSW/removeReservation.php', post_data)
        .then(response => response.data)
        .then((data) => {
            if (data.Update3 && data.Update2) {
                this.showReturnScooterSuccessScreen();
            } else {
                alert("Die Rückgabe war nicht erfolgreich.");
            }            
        });
    }

    handleReload() {
        this.getActiveScooterRental();
    }


    // Functions for changing visible components

    showNoScootersAvailableScreen() {
        this.showScreen("no_scooter_page");
    }

    showRentScooterScreen() {
        this.showScreen("rent_page");
    }

    showReturnScooterScreen() {
        this.showScreen("return_page");
    }

    showRentScooterSuccessScreen() {
        this.showScreen("rent_success_page");
    }

    showReturnScooterSuccessScreen() {
        this.showScreen("return_success_page");
    }

    showScreen(elementId) {
        if (this.state.activePage != "") {
            document.getElementById(this.state.activePage).classList.toggle('rotated');
        }
        document.getElementById(elementId).classList.toggle('rotated');
        this.setState({activePage: elementId });   
    }

    render() {
        return (
            <div class="container">
                <h1>E-Scooter Leihen</h1>
                <div class="pages">
                    <div id="no_scooter_page" class="page rotated">
                        <div class="page_content" onClick={this.handleReload}>
                            <img src={escooterimg_sw} alt="E-Scooter"></img>
                            <p>Zur Zeit ist leider kein E-Scooter verfügbar.</p>
                        </div>
                    </div>
                    <div id="rent_page" class="page rotated">
                        <div class="page_content" onClick={this.handleRentScooter}>
                            <img src={escooterimg} alt="E-Scooter"></img>
                            <p>Jetzt E-Scooter ausleihen</p>
                        </div>
                    </div>
                    <div id="rent_success_page" class="page rotated">
                        <div class="successRental">
                            <img id="scooterImageSuccess" src={escooterimg_sw} alt="E-Scooter"></img>
                            <div class="text">
                                <h3>Reservierung erfolgreich.</h3>
                                <p>Der <span class="highlighted">E-Scooter Nr. {this.state.availableScooterId}</span> steht nun für Sie bereit</p>
                                <button onClick={this.handleReload}>Zurück</button>
                            </div>
                        </div>
                    </div>
                    <div id="return_page" class="page rotated">
                        <div class="page_content" onClick={this.handleReturnScooter}>
                            <img src={escooterimg_sw} alt="E-Scooter"></img>
                            <p>E-Scooter jetzt zurückgeben.</p>
                        </div>
                    </div>
                    <div id="return_success_page" class="page rotated">
                        <div class="page_content">
                            <img src={escooterimg_sw} alt="E-Scooter"></img>
                            <div class="text">
                                <h3>Der E-Scooter wurde zurückgegeben.</h3>
                                <button onClick={this.handleReload}>Zurück</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

ScooterReservation.propTypes = {};

export default ScooterReservation;