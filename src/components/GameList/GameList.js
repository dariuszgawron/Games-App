import React, { useEffect, useState } from "react";

import igdbApi from "../../api/igdbApi";

import GameCard from "../GameCard/GameCard";

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
    }, [])

    return (
        <div className="game-list">
            {
                games && games.map((game, index) => {
                    return <GameCard game={game} key={index} />    
                })
            }
        </div>
    )
};

export default GameList;