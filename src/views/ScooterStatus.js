
import React, { Component } from "react";
import axios from "axios";

export default class ScooterStatus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countFreeScooter: 0,
            scooters: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost/BUSINESSSW/getScooterStatus.php')
            .then(response => {
                this.scooters = response.data;
                let element =0
                for (let index = 0; index < this.scooters.length; index++) {
                    if(this.scooters[index].RESERVATION_STATUS=="Frei"){
                        element++;
                        this.setState({
                            countFreeScooter: element
                        });
                    }           
                }

            });
            
            ;


    }

    render() {
        const { countFreeScooter } = this.state;
        return (
            <div className="card text-center m-3">
                <h5 className="card-header">Verfügbarkeit prüfen</h5>
                <div className="card-body">
                    Anzahl verfügbarer Scooter: {countFreeScooter}
                </div>
            </div>
        );
    }
}

export { ScooterStatus }; 