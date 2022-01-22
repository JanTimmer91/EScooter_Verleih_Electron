import React, {Component} from "react";
import styled from 'styled-components';
import {routes} from "../../routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

const NavTop = styled.div`
    background-color: white;
    display: flex;
    justify-content: space-between;
    padding: 0px 10px 10px;
`;

const PageTitle = styled.div`
    display: inline-block;
    font-weight: 500;
    font-size: 22px;
`;




class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            navbarTitle: 'Menu',
        }
    }


    render() {
        return (
            <NavTop>
                <div>
                    <PageTitle>HFU E-Scooter leihen</PageTitle>
                    <p style={{margin: "0px"}}>Willkommen, {localStorage.getItem('userName')}!</p>
                </div>
                <div>
                    <Button style={{marginBottom: "5px", marginTop: "5px", width: "130px"}} onClick={() => this.props.logout()}>Logout</Button>
                </div>
            </NavTop>
        );
    }
}

export default Menu;