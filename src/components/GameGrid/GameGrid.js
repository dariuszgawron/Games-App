import React, { useEffect, useState } from "react";

import igdbApi from "../../api/igdbApi";
import igdbConfig from "../../api/igdbConfig";

import GameCard from "../GameCard/GameCard";
import Button from "../Button/Button";

import "./GameGrid.scss";

const GameGrid = props => { 
    const [games, setGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const getGames = async () => {
            const query = (props.keyword)
                ? `search "${props.keyword}"; fields *, cover.*, platforms.*, platforms.platform_logo.*; limit ${igdbConfig.gridItems};`
                : `fields *, cover.*, platforms.*, platforms.platform_logo.*; sort rating desc; limit ${igdbConfig.gridItems};`;
            const gamesResponse = await igdbApi.getGames(query);
            const pagesResponse = await igdbApi.getGames(query,'T');
            setGames(gamesResponse);
            setTotalPages(Math.ceil(pagesResponse.count/igdbConfig.gridItems));
        };
        getGames();
    }, [props.keyword]);

    const loadMore = async () => {
        const page = currentPage+1;
        setCurrentPage(page);
        const offset = ((page-1) * igdbConfig.gridItems) + 1;
        const query = (props.keyword)
            ? `search "${props.keyword}"; fields *, cover.*, platforms.*, platforms.platform_logo.*; offset ${offset}; limit ${igdbConfig.gridItems};`
            : `fields *, cover.*, platforms.*, platforms.platform_logo.*; sort rating desc; offset ${offset}; limit ${igdbConfig.gridItems};`;
        const response = await igdbApi.getGames(query);
        setGames([...games,...response]);
    }

    return (
        <div className="game-grid section">
        {
            games && games.length>0
            ?   <>
                    <div className="game-grid__container">
                    {        
                        games.map((game, index) => {
                            return <GameCard game={game} key={index}/>
                        })
                    }
                    </div>
                    {
                        totalPages!==0 && currentPage<totalPages && (
                            <Button onClick={loadMore} class='button--primary button--center'>
                                Load more
                            </Button>
                        )
                    }
                </>
            :   <div className="game-grid__empty">
                    <i className="game-grid__empty-icon"></i>
                    <p className="game-grid__empty-text">
                        No data
                    </p>
                </div>
        }
        </div>
    )
};

export default GameGrid;