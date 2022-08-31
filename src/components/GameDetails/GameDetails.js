import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import igdbApi from "../../api/igdbApi";

import "./GameDetails.scss";

import ImageList from "../ImageList/ImageList";
import VideoList from "../VideoList/VideoList";
import GameSwiper from "../GameSwiper/GameSwiper";

const Details = () => {
    // const { id } = useParams();
    const id = '11111';
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [gameDetails, setGameDetails] = useState([]);
    const [gameCover, setGamecover] = useState({});
    const [gamePlatforms, setGamePlatforms] = useState([]);
    const [gameGenres, setGameGenres] = useState([]);

    useEffect(() => {
        const getGameDetails = async () => {
            const queryParams = `fields *; where id = ${id};`;
            try {
                const response = await igdbApi.getGames(queryParams);
                setGameDetails(response[0]);
            } catch(error) {
                setError(error);
            } finally {
                setLoading(false);
            }
            
            const getGameGenres = async () => {
                const queryParams = `fields *; where id = (${gameDetails.genres.join(', ')});`
                const response = await igdbApi.getGenres(queryParams);
                setGameGenres(response);
            };
            getGameGenres()
        };
        getGameDetails();
        
    }, [id, gameDetails.genres]);

    useEffect(() => {
        const getGameCover = async () => {
            const queryParams = `fields *; where game = ${id};`;
            const response = await igdbApi.getCovers(queryParams);
            setGamecover(response[0]);
            console.log(response);
        };
        getGameCover();
    }, [id]);

    if(error) return `Error: ${error.message}`;

    return (
        <div className="game-details">
            {loading && <div>Loading...</div>}
            {
                !loading && gameDetails && (
                    <div className="game-details__container">
                        <img src={gameCover.url} alt='' />
                        {gameDetails.name}
                        {gameDetails.created_at}
                        {gameDetails.first_release_date}
                        {gameDetails.storyline}
                        {gameDetails.summary}
                        {gameDetails.url}

                        {
                            gameGenres.map((genre, index) => (
                                <span key={index}>
                                    {genre.name}
                                </span>
                            ))
                        }

                        <div className="game-details__images">
                            <ImageList gameId={id} />
                        </div>

                        <div className="game-details__videos">
                            {/* <VideoList gameId={id} /> */}
                        </div>

                        <div className="game-details__similar">
                            <GameSwiper gameId={gameDetails.similar_games.join(',')}/>
                        </div>
                    </div>
                )
            }
        </div>
    )
};

export default Details;