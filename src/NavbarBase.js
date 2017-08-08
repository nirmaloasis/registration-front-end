import React, { Component } from 'react';
import {Navbar,Nav,NavItem} from 'react-bootstrap'

export default class NavbarBase extends Component{
     constructor(props){
            super(props);
            
        }
       
       
    render(){
       

        return(
            <Navbar inverse collapseOnSelect>
            <Navbar.Header>
            <Navbar.Brand>
                <a href="#">Dashboard</a>
            </Navbar.Brand>
            <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
            
            <Nav pullRight>
                
                <NavItem onClick={this.props.logout}>logout</NavItem>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
        )
    }
}