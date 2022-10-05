import React, { useEffect, useState } from "react";

import igdbApi from "../../api/igdbApi";
import igdbConfig from "../../api/igdbConfig";

import Loader from "../Loader/Loader";
import GameCard from "../GameCard/GameCard";
import Button from "../Button/Button";

import "./GameGrid.scss";

const GameGrid = props => { 
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const getGames = async () => {
            const query = (props.keyword)
                ? `search "${props.keyword}"; fields *, cover.*, platforms.*, platforms.platform_logo.*; limit ${igdbConfig.gridItems};`
                : `fields *, cover.*, platforms.*, platforms.platform_logo.*; sort rating desc; limit ${igdbConfig.gridItems};`;
            try {
                const gamesResponse = await igdbApi.getGames(query);
                const pagesResponse = await igdbApi.getGames(query,'T');
                setGames(gamesResponse);
                setTotalPages(Math.ceil(pagesResponse.count/igdbConfig.gridItems));
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
            
        };
        getGames();
    }, [props.keyword]);

    const loadMore = async () => {
        const page = currentPage + 1;
        const offset = ((page - 1) * igdbConfig.gridItems) + 1;
        const query = (props.keyword)
            ? `search "${props.keyword}"; fields *, cover.*, platforms.*, platforms.platform_logo.*; offset ${offset}; limit ${igdbConfig.gridItems};`
            : `fields *, cover.*, platforms.*, platforms.platform_logo.*; sort rating desc; offset ${offset}; limit ${igdbConfig.gridItems};`;
        try {
            const response = await igdbApi.getGames(query);
            setGames([...games,...response]);
            setCurrentPage(page);
        } catch (error) {
            setError(error);
        } 
    }

    return (
        <div className="game-grid section">
        {
            loading 
            ?   <Loader />
            :   games && games.length>0
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
                                <Button onClick={loadMore} className='button--primary button--center'>
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