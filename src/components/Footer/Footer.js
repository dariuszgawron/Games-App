import React from "react";

import './Footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__content footer__content--center container">
                <div className="footer__info">
                    &#169; Copyright by Dariusz Gawron
                </div>
                <div className="footer__info">
                    <span className="footer__info-text">
                        This product uses the IGDB API but is not endorsed or certified by IGDB.
                    </span>
                </div>
            </div>
        </footer>
    )
};

export default Footer;