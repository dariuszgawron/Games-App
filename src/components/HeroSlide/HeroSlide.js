import React from "react";
import { useNavigate } from "react-router-dom";

import igdbConfig, { imageSize } from "../../api/igdbConfig";

import "./HeroSlide.scss";

const HeroSlide = props => {
    const navigate = useNavigate([]);
    
    return (
        <div className="hero-slide">
            <img className="hero-slide__background" src={''} alt={''}/>
            <div className="hero-slide__overlay"></div>
            <div className="hero-slide__content">
                <div className="hero-slide__poster">
                    <img className="hero-slide__poster-img" src="" alt="" />
                </div>
                <div className="hero-slide__info">
                    <h2 className="hero-slide__title">
                        
                    </h2>

                </div>
            </div>
        </div>
    )
};

export default HeroSlide;