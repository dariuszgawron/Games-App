import React from "react";
import PropTypes from "prop-types";

import "./GameCard.scss";

const GameCard = props => {
    return (
        <div className="game-card">
            <div className="game-card">
                <span>{props.game.name}</span>
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
                <span>{props.game.platforms}</span>
            </div>
        </div>
    )
};

GameCard.propTypes = {
    game: PropTypes.object.isRequired
}

export default GameCard;