import React from 'react';
import { NavLink } from 'react-router-dom';
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavBar = () => {

    return (
        <div className="nav-bar__container">
            <NavLink to="/" activeClassName="selected"><FontAwesomeIcon icon={faHome} /></NavLink>
            <div>
                <NavLink to="/add-item" activeClassName="selected">Create Item</NavLink>
                <NavLink to="/max-price" activeClassName="selected">Find Max Price</NavLink>
            </div>
        </div>
        )
}

export default NavBar