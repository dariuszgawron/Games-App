import React, { useEffect, useState } from "react";

import igdbApi from "../../api/igdbApi";

import GameCard from "../GameCard/GameCard";

import "./GameGrid.scss";

const GameGrid = props => { 
    const [games, setGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const getGames = async () => {
            const keyword = (props.keyword) ? `search "${props.keyword}"; ` : '';
            const query = `${keyword}fields *, cover.*, platforms.*, platforms.platform_logo.*; sort rating desc; limit 20;`;
            const response = await igdbApi.getGames(query);
            setGames(response);
        };
        getGames();
    }, [props.keyword]);

    const loadMore = async () => {
        setCurrentPage(currentPage+1);
        const keyword = (props.keyword) ? `search "${props.keyword}"; ` : '';
        const offset = (currentPage-1) * 20;
        const query = `${keyword}fields *, cover.*, platforms.*, platforms.platform_logo.*; sort rating desc; offset ${offset}; limit 20;`;
        const response = await igdbApi.getGames(query);
        setGames([...games,...response]);
    }

    return (
        <div className="game-grid section">
        {
            games && games.length>0
            ?   <div className="game-grid__container">
                {        
                    games.map((game, index) => {
                        return <GameCard game={game} key={index}/>
                    })
                }
                </div>
            :   <div className="game-grid__empty">
                    <i className="game-grid__empty-icon"></i>
                    <p className="game-grid__empty-text">
                        No data
                    </p>
                </div>
        }
            <button onClick={loadMore}>Load more</button>
        </div>
    )
};

export default GameGrid;