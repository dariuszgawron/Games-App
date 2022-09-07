import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import igdbConfig, { coverSize } from "../../api/igdbConfig";

import "./GameCard.scss";

const GameCard = props => {
    return (
        <div className="game-card">
            <Link className="game-card__link" to={`/games/${props.game.id}`}>
                {
                    Object.keys(props.cover).length>0 ? (
                        <img className="game-card__cover" src={igdbConfig.imageUrl(coverSize.big, props.cover.image_id)} alt={`${props.game.name} - cover`} />
                    ) : (
                        <div className="game-card__backdrop">
                            <i className="game-card__backdrop-icon bx bx-bug"></i>
                        </div>
                    )
                }
                <div className="game-card__data">
                    <h3 className="game-card__title">
                        {props.game.name}
                    </h3>
                    <div className="game-card__info">
                        <div className="game-card__platforms">
                            PS | XO
                        </div>
                        <div className="game-card__rating">
                            <span className="game_card__rating-text">
                                59
                            </span>
                        </div>
                    </div>
                    
                </div>
            </Link>
        </div>
    )
};

GameCard.propTypes = {
    game: PropTypes.object.isRequired,
    cover: PropTypes.object
};

export default GameCard;