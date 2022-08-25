import React, { useEffect, useState } from "react";

import igdbApi from "../../api/igdbApi";

const GameList = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const getGames = async () => {
            let response = null;
            let queryParams = 'fields: *;';
            response = await igdbApi.getGames(queryParams);
            setGames(response); 
        };
        getGames();
    },[]);

    return (
        <div className="game-list">
            {
                games.map((game, index) => {
                    return game.checksum;
                })
            }
        </div>
    )
};

export default GameList;