import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./Header.scss";

const navLinks = [
    {
        title: 'Home',
        path: '/',
        icon: 'bx bx-home'
    },
    {
        title: 'Games',
        path: '/games',
        icon: 'bx bx-game'
    },
    {
        title: 'Info',
        path: '/info',
        icon: 'bx bx-info-circle'
    }
];

const Header = () => {
    const { pathname } = useLocation();

    return (
        <header className="header">
            <nav className="nav container">
                <div className="nav-logo">

                </div>
                <div className="nav-options">

                </div>
                <div className="nav-menu">
                    <ul className="nav-list">
                        {
                            navLinks.map((link, index) => (
                                <li className="nav-list__item" key={index}>
                                    <Link className="nav-link" to={link.path} >
                                        <i className={`nav-link__icon ${link.icon}`}></i>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </nav>
        </header>
    )
};

export default Header;