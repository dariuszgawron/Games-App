import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import igdbApi from "../../api/igdbApi";
import igdbConfig, { coverSize } from "../../api/igdbConfig";

import "./GameDetails.scss";

import ImageList from "../ImageList/ImageList";
import VideoList from "../VideoList/VideoList";
import GameList from "../GameList/GameList";

const getDate = (unixTimestamp) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date(unixTimestamp*1000);
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

const Details = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [gameDetails, setGameDetails] = useState([]);
    const [gameCover, setGamecover] = useState('');
    const [gamePlatforms, setGamePlatforms] = useState([]);
    const [gameReleaseDates, setGameReleaseDates] = useState([]);
    const [gameGenres, setGameGenres] = useState([]);
    const [gameSimilarGames, setGameSimilarGames] = useState([]);

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
        };
        const getGameCover = async () => {
            const queryParams = `fields *; where game = ${id};`;
            const response = await igdbApi.getCovers(queryParams);
            if(response[0]) {
                setGamecover(response[0].image_id);
            }
        };
        getGameDetails();
        getGameCover();
    }, [id]);

    useEffect(() => {
        if(!loading && gameDetails) {
            const getGameGenres = async () => {
                const queryParams = `fields *; where id = (${gameDetails.genres.join(', ')});`
                const response = await igdbApi.getGenres(queryParams);
                setGameGenres(response);
            };
            const getGamePlatforms = async () => {
                const queryParams = `fields *, platform.*; where id = (${gameDetails.platforms.join(', ')});`
                const response = await igdbApi.getPlatforms(queryParams);
                console.log('test');
                console.log(response);
                setGamePlatforms(response);
            };
            const getGameSimilarGames = async () => {
                const queryParams = `fields *; where id = (${gameDetails.similar_games.join(', ')});`;
                const response = await igdbApi.getGames(queryParams);
                setGameSimilarGames(response);
            };
            const getGameReleaseDates = async () => {
                const queryParams = `fields *, platform.name; where id = (${gameDetails.release_dates.join(', ')});`;
                const response = await igdbApi.getReleaseDates(queryParams);
                setGameReleaseDates(response);
            }

            if(gameDetails.genres && gameDetails.genres.length>0) {
                getGameGenres();
            }
            if(gameDetails.platforms && gameDetails.platforms.length>0) {
                getGamePlatforms();
            }
            if(gameDetails.similar && gameDetails.similar_games.length>0) {
                getGameSimilarGames();
            }
            if(gameDetails.release_dates && gameDetails.release_dates.length>0) {
                getGameReleaseDates();
            }
        }
    }, [gameDetails, loading]);

    // useEffect(() => {
    //     if(gamePlatforms) {
    //         const getGamePlatformLogo
    //     }
    // }, [gamePlatforms]);

    if(error) return `Error: ${error.message}`;

    return (
        <div className="game-details container">
            {loading && <div>Loading...</div>}
            {
                !loading && gameDetails && (
                    <div className="game-details__container">
                        <img className="game-details__cover" src={igdbConfig.imageUrl(coverSize.big, gameCover)} alt='' />
                        <div className="game-details__info">
                            <h2 className="game-details__title game-details__title--center">{gameDetails.name}</h2>
                            <hr />
                            <div className="game-details__genres">
                                {/* <span className="game-details__genres-label">Genres: </span> */}
                                {
                                    gameGenres.map((genre, index) => (
                                        <span className="game-details__genres-item" key={index}>
                                            {`${genre.name}`}
                                        </span>
                                    ))
                                }
                            </div>
                            <div className="game-details__platforms">
                                <span className="game-details__platforms-label">Platforms: </span>
                                {
                                    gamePlatforms.map((platform, index) => (
                                        <span className="game-details__platforms-item" key={index}>
                                            {`${platform.name}`}
                                        </span>
                                    ))
                                }
                            </div>
                            <div className="game-details__release-date">
                                <span className="game-details__release-date-label">Release date: </span>
                                <span className="game-details__release-date-item">
                                    {/* {getDate(gameDetails.created_at)} */}
                                    {getDate(gameDetails.first_release_date)}
                                </span>
                            </div>
                            <div className="game-details__ratings">
                                
                            </div>
                        </div>
                        <div className="game-details__nav">
                            <ul className="game-details__nav-pills">
                                <li className="game-details__nav-pill">
                                    Description
                                </li>
                                <li className="game-details__nav-pill">
                                    Gallery
                                </li>
                                <li className="game-details__nav-pill">
                                    Trailers
                                </li>
                                <li className="game-details__nav-pill">
                                    Details
                                </li>
                                <li className="game-details__nav-pill">
                                    Links
                                </li>
                            </ul>
                        </div>
                        <div className="game-details__tab-content">
                            {gameDetails.storyline}

                            {gameDetails.summary}
                        </div>
                        
                        <div className="game-details__tab-content">
                            <div className="game-details__images">
                                <ImageList gameId={id} />
                            </div>
                        </div>

                        <div className="game-details__tab-content">
                            <div className="game-details__videos">
                                <VideoList gameId={id} />
                            </div>
                        </div>

                        <div className="game-details__tab-content">
                            Release dates: <br/>
                            {
                                gameReleaseDates.map((releaseDate, index) => (
                                    <span key={index}>
                                        {releaseDate.platform.name} - {releaseDate.human}
                                    </span>
                                ))
                            }
                            Developers: <br/>
                            
                            Publishers: <br/>

                            Age rating: <br/>
                        </div>

                        <div className="game-details__tab-content">
                            {gameDetails.url} <br/><br/>
                            
                        </div>



                        <div className="game-details__similar">
                            {/* <GameSwiper gameId={gameDetails.similar_games.join(',')}/> */}
                            {   
                                gameDetails.similar_games && (
                                    <GameList gameId={gameDetails.similar_games.join(',')} />
                                )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
};

export default Details;