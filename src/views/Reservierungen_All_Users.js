import React, {Component} from "react";
import styled from 'styled-components';
import axios from "axios";
import url from "url";


import {Button} from 'react-bootstrap';
import {Container, Row, Col, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from "prop-types";


const ContentContainer = styled.div`

`;

const CardContainer = styled.div`
    margin: 25px 0px 0px 8px;
`;

const BigHeader = styled.div`
    margin: 26px 0px 0px 12px;
    font-weight: 300;
    font-size: 22px;
    display:inline-block;
`;

const InputContainer = styled.div`
    z-index: -1;
    border: solid lightgrey 0.5px;
    border-radius: 10px;
    background-color: white;
    padding: 32px 16px 0px 16px;
    margin: 20px 0px 0px 0px;
    display: "inline-block"
    :hover {
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .2);
        cursor: pointer;
    }
`;

const RefreshButtonContainer = styled.div`
    margin: 0px 0px 0px 24px;
    font-weight: 300;
    font-size: 22px;
    display: inline-block;
`;

const TrCustom = styled.tr`
   :hover{
     cursor:pointer;
   }
`;

class Reservierungen_All_Users extends Component {

    constructor(props) {
        super(props);

        this.state = {
            reservations: [],
            userInput: "",
            amountToDisplay: 10,
        };

    }

    componentDidMount() {
        document.body.style.backgroundColor = "rgba(203,203,210,.15)"
        this.getReservations()
    }

    getReservations() {
        axios.get('http://localhost/BUSINESSSW/reservationOverview.php')
            .then(response => response.data)
            .then(data => {
                this.setState({reservations: data})
            });
    }

    getTimeStamp() {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;
        return dateTime
    }

    render() {
        return (
            <ContentContainer className="content">
                <Container fluid>
                    <Row>
                        <Col sm>
                            <BigHeader>(Admin) Reservierungen aller Nutzer anzeigen</BigHeader>
                            <RefreshButtonContainer>
                                <Button style={{paddingLeft: "14px", paddingRight: "46px"}} onClick={() => window.location.reload()}>Neu laden</Button>
                            </RefreshButtonContainer>
                            <a style={{marginLeft: "22px", fontWeight: 300}}>Letzter Check: {this.getTimeStamp()}</a>
                        </Col>
                        <Col>
                            <div class="float-right">
                                <form>
                                    <a>Zeige </a>
                                    <input
                                        type='number'
                                        onChange={(event) => this.setState({amountToDisplay: event.target.value})}
                                    />
                                    <a> Reservierungen von insgesamt <b>{this.state.reservations.length}</b></a>
                                </form>
                            </div>
                        </Col>
                    </Row>
                    <CardContainer>
                        <Table striped hover>
                            <thead>
                            <tr>
                                <th></th>
                                <th>Reservierungs-ID</th>
                                <th>User-ID</th>
                                <th>Scooter-ID</th>
                                <th>Start-Datum</th>
                                <th>End-Datum</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.reservations.length !== 0 ?
                                this.state.reservations.map((reservation, i) => i < this.state.amountToDisplay ?

                                    <tr>
                                        <>
                                            <td><b>({i + 1})</b></td>
                                            <td>{reservation.RESERVATION_ID}</td>
                                            <td>{reservation.USER_ID}</td>
                                            <td>{reservation.SCOOTER_ID}</td>
                                            <td>{reservation.STARTDATE}</td>
                                            {
                                                new Date(reservation.ENDDATE) < new Date() ?
                                                    <>
                                                        <td>({reservation.STARTDATE})</td>
                                                        <b style={{color: "green", fontWeight: "bold"}}>Reservierung
                                                            abgelaufen</b></>
                                                    : <>
                                                        <td>({reservation.ENDDATE})</td>
                                                        <b style={{color: "red", fontWeight: "bold"}}>Reservierung
                                                            aktiv</b></>
                                            }                                        </>
                                    </tr>
                                    : null
                                ) :
                                <div style={{fontStyle: "italic"}}><br/>Es gibt noch keine Reservierungen. Gut für dich!
                                </div>

                            }
                            </tbody>
                        </Table>
                    </CardContainer>
                </Container>
            </ContentContainer>
        );
    }
}

Reservierungen_All_Users.propTypes = {
    RESERVATION_ID: PropTypes.string,
    USER_ID: PropTypes.string,
    SCOOTER_ID: PropTypes.string,
    STARTDATE: PropTypes.string,
    ENDDATE: PropTypes.string,

};
export default Reservierungen_All_Users;