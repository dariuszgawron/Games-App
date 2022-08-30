import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import igdbApi from "../../api/igdbApi";

import "./GameDetails.scss";

import ImageList from "../ImageList/ImageList";
import VideoList from "../VideoList/VideoList";
import GameSwiper from "../GameSwiper/GameSwiper";

const Details = () => {
    // const { id } = useParams();
    const id = '40104';
    const [gameDetails, setGameDetails] = useState([]);
    const [gameCover, setGamecover] = useState({});
    const [gamePlatforms, setGamePlatforms] = useState([]);
    const [gameGenres, setGameGenres] = useState([]);

    useEffect(() => {
        const getGameDetails = async () => {
            const queryParams = `fields *; id = ${id}`;
            const response = await igdbApi.getGames(queryParams);
            setGameDetails(response);
        };
        getGameDetails();
    }, [id]);

    useEffect(() => {
        const getGameCover = async () => {
            const queryParams = `fields *; game = ${id}`;
            const response = await igdbApi.getCovers(queryParams);
            setGamecover(response);
        };
        getGameCover();
    }, [id]);

    return (
        <div className="game-details">
            {
                gameDetails && (
                    <div className="game-details__container">
                        {gameCover.url}
                        {gameDetails.name}
                        <div className="game-details__images">
                            <ImageList gameId={id} />
                        </div>

                        <div className="game-details__videos">
                            <VideoList gameId={id} />
                        </div>
                    </div>
                )
            }
            
            
        </div>
    )
};

export default Details;