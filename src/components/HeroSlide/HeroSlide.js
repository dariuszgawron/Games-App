import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import igdbConfig, { imageSize } from "../../api/igdbConfig";

import Button from "../Button/Button";

import "./HeroSlide.scss";

const HeroSlide = props => {
    const navigate = useNavigate([]);
    
    return (
        <div className="hero-slide">
            <img className="hero-slide__background" src={igdbConfig.imageUrl(imageSize.screenshotBig, props.game.screenshots[0].image_id)} alt={`${props.game.name} - cover`} />
            <div className="hero-slide__overlay"></div>
            <div className="hero-slide__content">
                <div className="hero-slide__poster">
                    <img className="hero-slide__poster-img" src={igdbConfig.imageUrl(imageSize.coverBig, props.game.cover.image_id)} alt={`${props.game.name} - cover`} />
                </div>
                <div className="hero-slide__info">
                    <h2 className="hero-slide__title">
                        {props.game.name}
                    </h2>
                    <div className="hero-slide__genres">
                    {   
                        ('genres' in props.game)
                        ?   props.game.genres.map((genre, index) => (
                                <span className="hero-slide__genres-item hero-slide__genres-item--mark" key={index}>
                                    {genre.name}
                                </span>
                            ))
                        :   '---'
                    }
                    </div>
                    <div className="hero-slide__rating">
                        <div className="hero-slide__rating-chart">
                            <div className="hero-chart">
                                <svg className="hero-chart-circle" viewBox="0 0 36 36">
                                    <path 
                                        className="hero-chart-circle__background"
                                        d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path 
                                        className="hero-chart-circle__foreground hero-chart-circle__foreground--primary hero-chart-circle__foreground--animate"
                                        strokeDasharray={`${props.game.rating ? Math.round(props.game.rating) : 0}, 100`}
                                        d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                    <text className="hero-chart-circle__title" x="18" y="21.55">
                                    {
                                        props.game.rating 
                                        ? Math.round(props.game.rating) 
                                        : 'N/A'
                                    }
                                    </text>
                                </svg>
                                <h4 className="hero-chart__description">
                                    members
                                </h4>
                            </div>
                        </div>
                        <div className="hero-slide__rating-chart">
                            <div className="hero-chart">
                                <svg className="hero-chart-circle hero-chart-circle--small" viewBox="0 0 36 36">
                                    <path 
                                        className="hero-chart-circle__background"
                                        d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path 
                                        className="hero-chart-circle__foreground hero-chart-circle__foreground--primary hero-chart-circle__foreground--animate"
                                        strokeDasharray={`${props.game.aggregated_rating ? Math.round(props.game.aggregated_rating) : 0}, 100`}
                                        d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                    <text className="hero-chart-circle__title" x="50%" y="22.25">
                                    {   
                                        props.game.aggregated_rating 
                                        ? Math.round(props.game.aggregated_rating) 
                                        : 'N/A'
                                    }
                                    </text>
                                </svg>
                                <h4 className="hero-chart__description">
                                    critics
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="hero-slide__buttons">
                        <Button onClick={() => navigate(`/games/${props.game.id}`)} className="button--primary">
                            <i className='button__icon button__icon--animate bx bxs-chevron-right'></i>
                            See more
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
};

HeroSlide.propTypes = {
    game: PropTypes.object.isRequired
};

export default HeroSlide;