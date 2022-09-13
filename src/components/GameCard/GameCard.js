import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import igdbConfig, { imageSize } from "../../api/igdbConfig";

import "./GameCard.scss";

const GameCard = props => {
    return (
        <div className="game-card">
            <Link className="game-card__link" to={`/games/${props.game.id}`}>
                {
                    ('cover' in props.game) ? (
                        <img className="game-card__cover" src={igdbConfig.imageUrl(imageSize.coverBig, props.game.cover.image_id)} alt={`${props.game.name} - cover`} />
                    ) : (
                        <div className="game-card__backdrop">
                            <i className="game-card__backdrop-icon bx bx-game"></i>
                        </div>
                    )
                }
                <div className="game-card__data">
                    <div className="game-card__info">
                        <div className="game-card__platforms">
                            PS | XO
                            {
                                'platforms' in props.game && 'platform_logo' in props.game.platforms 
                                ? props.game.platforms.platform_logo.image_id 
                                : ''
                            }
                        </div>
                        <div className="game-card__rating">
                            <span className="game_card__rating-text">
                                {Math.round(props.game.rating) || 'NA'}
                            </span>
                        </div>
                    </div>
                    <h3 className="game-card__title">
                        {props.game.name}
                    </h3>
                </div>
            </Link>
        </div>
    )
};

GameCard.propTypes = {
    game: PropTypes.object.isRequired
};

export default GameCard;