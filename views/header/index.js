'use strict'
import React from 'react'
import { Link } from 'react-router'
import style from './style'

import { NavLink, UncontrolledDropdown, Nav, NavItem, Navbar, NavbarBrand, Button, NavbarToggler, Collapse, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';

class Header extends React.Component {
  render() {
    return (
      <div>
      <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">Text Editor</NavbarBrand>
            <Nav navbar>
              <NavItem>
                <Link className={style.indexLink} to="/view">View a note</Link>
              </NavItem>
              <NavItem>
                <Link className={style.indexLink} to="/add">Create a note</Link>
              </NavItem>
              
            </Nav>
        </Navbar>
      </div>
    )
  }
}

export default Header
