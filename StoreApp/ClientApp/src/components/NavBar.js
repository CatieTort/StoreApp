import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { faBars, faEye, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavBar = () => {

    const [drawerOpen, setDrawer] = useState(false);

    return (
        <div className="nav-bar__container">
            <div className="nav-bar__sec">
                <div onClick={() => setDrawer(!drawerOpen)}>
                    <FontAwesomeIcon icon={faBars} className={drawerOpen ? `nav-bar__button open`: `nav-bar__button closed`} />
                </div>
                <div className="nav-bar__title">
                   StoreApp
                </div>
            </div>

            <div className={drawerOpen ? `nav-bar__sec nav-bar__drawer nav-bar__drawer--open` : `nav-bar__sec nav-bar__drawer nav-bar__drawer--closed`}>
                <NavLink exact to="/" activeClassName="selected" onClick={() => setDrawer(false)}>
                    <FontAwesomeIcon icon={faEye} style={{paddingRight: "10px"}} />View All Items</NavLink>
                <NavLink to="/add-item" activeClassName="selected" onClick={() => setDrawer(false)}>
                    <FontAwesomeIcon icon={faPlus} style={{ paddingRight: "10px" }} />Create Item</NavLink>
                <NavLink to="/max-price" activeClassName="selected" onClick={() => setDrawer(false)}>
                    <FontAwesomeIcon icon={faSearch} style={{ paddingRight: "10px" }} />Search Max Item Price</NavLink>
            </div>
        </div>
        )
}

export default NavBar