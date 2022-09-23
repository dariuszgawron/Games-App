import React from "react";
import { Link, useLocation } from "react-router-dom";

import SearchModal from "../SearchModal/SearchModal";

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
    }
];

const Header = () => {
    const { pathname } = useLocation();

    const openSearchModal = event => {
        const searchModal = document.getElementById('search-modal');
        searchModal.classList.toggle('modal--active'); 
    };

    return (
        <header className="header header--fixed">
            <nav className="nav container">
                <div className="nav-logo">
                    Logo
                </div>
                <div className="nav__buttons">
                    <div className="nav__menu">
                        <ul className="nav-list">
                        {
                            navLinks.map((link, index) => (
                                <li className="nav-list__item" key={index}>
                                    <Link className="nav-link" to={link.path} >
                                        <i className={`nav-link__icon ${link.icon}`}></i>
                                        <span className="nav-link__text">{link.title}</span>
                                    </Link>
                                </li>
                            ))
                        }
                        </ul>
                    </div>
                    <div className="nav-search" onClick={openSearchModal}>
                        <i className='nav-search__icon bx bx-search'></i>
                    </div>
                </div>
            </nav>
            
            <SearchModal />
        </header>
    )
};

export default Header;