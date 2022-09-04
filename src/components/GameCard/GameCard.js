import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import igdbApi from "../../api/igdbApi";

import "./GameCard.scss";

const GameCard = props => {
    const [cover, setCover] = useState('');

    useEffect(() => {
        const getCover = async () => {
            const queryParams = `fields *; where game = ${props.game.cover};`;
            const response = await igdbApi.getCovers(queryParams);
            setCover(response[0]);
        };
        if(props.game.cover) {
            getCover();
        }
    }, [props.game.cover]);

    return (
        <div className="game-card">
            <Link className="game-card__link" to={`/games/${props.game.id}`}>
                {
                    cover ? (
                        <img className="game-card__cover" src={cover.url} alt={`${props.game.name} - cover`} />
                    ) : (
                        <div className="game-card__backdrop">
                            <i className="game-card__backdrop-icon bx bx-bug"></i>
                        </div>
                    )
                }
                <div className="game-card__data">
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
                    <h3 className="game-card__title">
                        {props.game.name}
                    </h3>
                </div>
            </Link>

            {/* <span>{props.game.name}</span>
            <span>{props.game.cover}</span>
            <span>{props.game.first_release_date}</span>
            <span>{props.game.franchise}</span>
            <span>{props.game.genres}</span>
            <span>{props.game.rating}</span>
            <span>{props.game.screenshots}</span>
            <span>{props.game.status}</span>
            <span>{props.game.total_rating}</span>
            <span>{props.game.webisites}</span>
            <span>{props.game.similar_games}</span>
            <span>{props.game.summary}</span>
            <span>{props.game.url}</span>
            <span>{props.game.category}</span>
            <span>{props.game.platforms}</span> */}
        </div>
    )
};

GameCard.propTypes = {
    game: PropTypes.object.isRequired
}

export default GameCard;