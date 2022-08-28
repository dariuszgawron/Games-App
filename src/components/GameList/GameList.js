import React, { useEffect, useState } from "react";

import igdbApi from "../../api/igdbApi";

import "./GameList.scss";

const GameList = props => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const getGames = async () => {
            let response = null;
            const queryParams = 'fields *;';
            response = await igdbApi.getGames(queryParams);
            setGames(response);
        };
        getGames();
    },[])

    return (
        <div className="game-list">
            {
                games && games.map((game, index) => (
                    <div className="game-card" key={index}>
                        <span>{game.name}</span>
                        <span>{game.cover}</span>
                        <span>{game.first_release_date}</span>
                        <span>{game.franchise}</span>
                        <span>{game.genres}</span>
                        <span>{game.rating}</span>
                        <span>{game.screenshots}</span>
                        <span>{game.status}</span>
                        <span>{game.total_rating}</span>
                        <span>{game.webisites}</span>
                        <span>{game.similar_games}</span>
                        <span>{game.summary}</span>
                        <span>{game.url}</span>
                        <span>{game.category}</span>
                        <span>{game.platforms}</span>
                    </div>
                ))
            }
        </div>
    )
};

export default GameList;