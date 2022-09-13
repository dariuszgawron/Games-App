import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import igdbApi from "../../api/igdbApi";
import igdbConfig, { imageSize, websitesCategory } from "../../api/igdbConfig";

import "./GameDetails.scss";

import ImageList from "../ImageList/ImageList";
import VideoList from "../VideoList/VideoList";
import GameList from "../GameList/GameList";

const getDate = (unixTimestamp) => {
    const months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    const date = new Date(unixTimestamp*1000);
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

const Details = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [gameDetails, setGameDetails] = useState([]);

    useEffect(() => {
        const getGameDetails = async () => {
            const queryParams = `
                fields *, 
                cover.*,
                genres.*,
                release_dates.*, release_dates.platform.*,
                platforms.*, platforms.platform_logo.*,
                involved_companies.*,involved_companies.company.*,
                game_engines.*,
                websites.*,
                screenshots.*,
                videos.*; 
                where id = ${id};`;
            try {
                const response = await igdbApi.getGames(queryParams);
                setGameDetails(response[0]);
            } catch(error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        getGameDetails();
    }, [id]);

    if(error) 
        return `Error: ${error.message}`;

    return (
        <div className="game-details container">
            {loading && <div>Loading...</div>}
            {
                !loading && gameDetails && (
                    <div className="game-details__container">
                        <img className="game-details__cover" src={igdbConfig.imageUrl(imageSize.coverBig, gameDetails.cover.image_id)} alt={`${gameDetails.name} - cover`} />
                        <div className="game-details__info">
                            <h2 className="game-details__title game-details__title--center">{gameDetails.name}
                            </h2>
                            <hr />
                            <div className="game-details__genres">
                                {/* <span className="game-details__genres-label">Genres: </span> */}
                                {   
                                    ('genres' in gameDetails)
                                    ?   gameDetails.genres.map((genre, index) => (
                                            <span className="game-details__genres-item" key={index}>
                                                {`${genre.name}`}
                                            </span>
                                        ))
                                    :   '---'
                                }
                            </div>
                            <div className="game-details__platforms">
                                <span className="game-details__platforms-label">
                                    Platforms: 
                                </span>
                                {
                                    ('platforms' in gameDetails)
                                    ?   gameDetails.platforms.map((platform, index) => (
                                            <span className="game-details__platforms-item" key={index}>
                                                {`${platform.name}`}
                                                <img src={`${igdbConfig.imageUrl(imageSize.thumb, platform.platform_logo.image_id)}`} alt=''/>
                                            </span>
                                        ))
                                    :   '---'
                                }
                            </div>
                            <div className="game-details__release-date">
                                <span className="game-details__release-date-label">
                                    Release date: 
                                </span>
                                <span className="game-details__release-date-item">
                                    {/* {getDate(gameDetails.created_at)} */}
                                    {
                                        ('first_release_date' in gameDetails)
                                        ?   getDate(gameDetails.first_release_date)
                                        :   '---'
                                    }
                                </span>
                            </div>
                            <div className="game-details__ratings">
                                {gameDetails.rating ? Math.round(gameDetails.rating) : '--'} / {gameDetails.rating_count || '--'}<br/>
                                {gameDetails.aggregated_rating ? Math.round(gameDetails.aggregated_rating) : '--'} / {gameDetails.aggregated_rating_count || '--'}
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
                                ('release_dates' in gameDetails) 
                                ?   gameDetails.release_dates.map((releaseDate, index) => (
                                        <span className="" key={index}>
                                            {releaseDate.platform.name} - {releaseDate.human}
                                        </span>
                                    ))
                                :   'No data'
                            }<br/>
                            Developers:
                            {
                                ('involved_companies' in gameDetails)
                                ?   gameDetails.involved_companies
                                        .filter(company => company.developer === true)
                                        .map((developer, index) => (
                                            <span className="" key={index}>
                                                {developer.company.name}
                                            </span>
                                        ))
                                :   'No data'
                            }<br/>
                            
                            Publishers:
                            {
                                ('involved_companies' in gameDetails)
                                ?   gameDetails.involved_companies
                                        .filter(company => company.publisher === true)
                                        .map((publisher, index) => (
                                            <span className="" key={index}>
                                                {publisher.company.name}
                                            </span>
                                        ))
                                :   'No data'
                            }<br/>

                            Age rating: 
                            {

                            }<br/>

                            Game engine: 
                            {
                                ('game_engines' in gameDetails)
                                ?   gameDetails.game_engines.map((gameEngine, index) => (
                                        <span className="" key={index}>
                                            {gameEngine.name}
                                        </span>    
                                    ))
                                :   'No data'
                            }
                        </div>

                        <div className="game-details__tab-content">
                            {gameDetails.url}<br/>
                            Websites:
                            {
                                ('websites' in gameDetails)
                                ?   gameDetails.websites.map((website, index) => (
                                        <span className="" key={index}>
                                            {`${website.url} | ${websitesCategory[website.category]}`}<br/>
                                        </span>
                                    ))
                                :   'No data'
                            }
                        </div>

                        <div className="game-details__similar">
                            {   
                                gameDetails.similar_games && (
                                    <GameList title='Similar games' query={`fields *, cover.*, platforms.*, platforms.platform_logo.*; where id=(${gameDetails.similar_games.join(',')}); limit ${igdbConfig.swiperItems};`}/>
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