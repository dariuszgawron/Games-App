import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import igdbApi from "../../api/igdbApi";
import igdbConfig, { imageSize, websitesCategory } from "../../api/igdbConfig";

import "./GameDetails.scss";

import ImageList from "../ImageList/ImageList";
import VideoList from "../VideoList/VideoList";
import GameList from "../GameList/GameList";
import ImageModal from "../ImageModal/ImageModal";

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
    const [developers, setDevelopers] = useState([]);
    const [publishers, setPublishers] = useState([]);

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
                if('involved_companies' in response[0]) {
                    setDevelopers(response[0].involved_companies.filter(company => company.developer === true));
                    setPublishers(response[0].involved_companies.filter(company => company.publisher === true));
                }
            } catch(error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        getGameDetails();
        window.scrollTo(0, 0);
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
                            <div className="game-details-data">
                                <h4 className="game-details-data__label">
                                    Genres: 
                                </h4>
                                <div className="game-details-data__items">
                                {   
                                    ('genres' in gameDetails)
                                    ?   gameDetails.genres.map((genre, index) => (
                                            <span className="game-details-data__item game-details-data__item--mark" key={index}>
                                                {`${genre.name}`}
                                            </span>
                                        ))
                                    :   '---'
                                }
                                </div>
                            </div>
                            <div className="game-details-data">
                                <h4 className="game-details-data__label">
                                    Platforms: 
                                </h4>
                                <div className="game-details-data__items">
                                {
                                    ('platforms' in gameDetails)
                                    ?   gameDetails.platforms.map((platform, index) => (
                                            <span className="game-details-data__item game-details-data__item--mark" key={index}>
                                                {`${platform.name}`}
                                                {/* <img src={`${igdbConfig.imageUrl(imageSize.thumb, platform.platform_logo.image_id)}`} alt=''/> */}
                                            </span>
                                        ))
                                    :   '---'
                                }
                                </div>
                            </div>
                            <div className="game-details-data">
                                <h4 className="game-details-data__label">
                                    Release date: 
                                </h4>
                                <div className="game-details-data__items">
                                    <span className="game-details-data__item">
                                    {
                                        ('first_release_date' in gameDetails)
                                        ?   getDate(gameDetails.first_release_date)
                                        :   '---'
                                    }
                                    </span>
                                </div>
                            </div>
                            <div className="game-details-data">
                                <h4 className="game-details-data__label">
                                    Ratings:
                                </h4>
                                <div className="game-details-data__items">
                                    <div className="game-details-data__item">
                                        <div className="chart">
                                            <svg className="chart-circle" viewBox="0 0 36 36">
                                                <path 
                                                    className="chart-circle__background"
                                                    d="M18 2.0845
                                                        a 15.9155 15.9155 0 0 1 0 31.831
                                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                                />
                                                <path 
                                                    className="chart-circle__foreground chart-circle__foreground--primary chart-circle__foreground--animate"
                                                    strokeDasharray={`${gameDetails.rating ? Math.round(gameDetails.rating) : 0}, 100`}
                                                    d="M18 2.0845
                                                        a 15.9155 15.9155 0 0 1 0 31.831
                                                        a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                                <text className="chart-circle__title" x="18" y="20.75">
                                                    {gameDetails.rating ? Math.round(gameDetails.rating) : 'N/A'}
                                                </text>
                                            </svg>
                                            <h4 className="chart__description">
                                                members
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="game-details-data__item">
                                        <div className="chart">
                                            <svg className="chart-circle" viewBox="0 0 36 36">
                                                <path 
                                                    className="chart-circle__background"
                                                    d="M18 2.0845
                                                        a 15.9155 15.9155 0 0 1 0 31.831
                                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                                />
                                                <path 
                                                    className="chart-circle__foreground chart-circle__foreground--primary chart-circle__foreground--animate"
                                                    strokeDasharray={`${gameDetails.aggregated_rating ? Math.round(gameDetails.aggregated_rating) : 0}, 100`}
                                                    d="M18 2.0845
                                                        a 15.9155 15.9155 0 0 1 0 31.831
                                                        a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                                <text className="chart-circle__title" x="50%" y="20.75">
                                                    {gameDetails.aggregated_rating ? Math.round(gameDetails.aggregated_rating) : 'N/A'}
                                                </text>
                                            </svg>
                                            <h4 className="chart__description">
                                                critics
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className="game-details-section game-details-section--description">
                            <h3 className="game-details-section__title">
                                Description
                            </h3>
                            <div className="game-details-section__content">
                                {gameDetails.storyline || 'No description'}
                            </div>
                        </div>
                        
                        <div className="game-details-section game-details-section--gallery">
                            <h3 className="game-details-section__title">
                                Gallery
                            </h3>
                            <div className="game-details__images">
                                <ImageList gameId={id} />
                            </div>
                        </div>

                        <div className="game-details-section game-details-section--trailers">
                            <h3 className="game-details-section__title">
                                Trailers
                            </h3>
                            <div className="game-details__videos">
                                <VideoList gameId={id} />
                            </div>
                        </div>

                        <div className="game-details-section game-details-section--more">
                            <h3 className="game-details-section__title">
                                More info
                            </h3>
                            <div className="game-details-section__content game-details-section__content--more">
                                <div className="game-details-section__group">
                                    <div className="game-details-data">
                                        <h4 className="game-details-data__label">
                                            Release dates: 
                                        </h4>
                                        <div className="game-details-data__items">
                                            <ul className="game-details-data__list">
                                            {
                                                ('release_dates' in gameDetails) 
                                                ?   gameDetails.release_dates.map((releaseDate, index) => (
                                                        <li className="game-details-data__item" key={index}>
                                                            {releaseDate.human} - {releaseDate.platform.name}
                                                        </li>
                                                    ))
                                                :   <span className="game-details-data__item">
                                                        ---
                                                    </span>
                                            }
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="game-details-data">
                                        <h4 className="game-details-data__label">
                                            Developers:
                                        </h4>
                                        <div className="game-details-data__items">
                                        {
                                            developers.length>0
                                            ?   developers.map((developer, index) => (
                                                    <span className="game-details-data__item game-details-data__item--mark" key={index}>
                                                        {developer.company.name}
                                                    </span>
                                                ))
                                            :   <span className="game-details-data__item">
                                                    ---
                                                </span>
                                        }
                                        </div>
                                    </div>
                                    <div className="game-details-data">
                                        <h4 className="game-details-data__label">
                                            Publishers:
                                        </h4>
                                        <div className="game-details-data__items">
                                        {
                                            publishers.length>0
                                            ?   publishers.map((publisher, index) => (
                                                    <span className="game-details-data__item game-details-data__item--mark" key={index}>
                                                        {publisher.company.name}
                                                    </span>
                                                ))
                                            :   <span className="game-details-data__item">
                                                    ---
                                                </span>
                                        }
                                        </div>
                                    </div>
                                </div>
                                <div className="game-details-section__group">
                                    <div className="game-details-data">
                                        <h4 className="game-details-data__label">
                                            Age rating: 
                                        </h4>
                                        <div className="game-details-data__items">
                                        {
                                            '---'
                                        }
                                        </div>
                                    </div>
                                    <div className="game-details-data">
                                        <h4 className="game-details-data__label">
                                            Game engine: 
                                        </h4>
                                        <div className="game-details-data__items">
                                        {
                                            ('game_engines' in gameDetails)
                                            ?   gameDetails.game_engines.map((gameEngine, index) => (
                                                    <span className="game-details-data__item game-details-data__item--mark" key={index}>
                                                        {gameEngine.name}
                                                    </span>    
                                                ))
                                            :   <span className="game-details-data__item">
                                                    ---
                                                </span>
                                        }
                                        </div>
                                    </div>
                                    <div className="game-details-data">
                                        <h4 className="game-details-data__label">
                                            Websites: 
                                        </h4>
                                        <div className="game-details-data__items">
                                        {
                                            ('websites' in gameDetails)
                                            ?   gameDetails.websites.map((website, index) => (
                                                    <a href={website.url} className="game-details-data__item game-details-data__item--mark" target={`_blank`} key={index}>
                                                        <i className={`game-details-data__icon ${websitesCategory[website.category].icon}`}></i>
                                                        {websitesCategory[website.category].title}
                                                    </a>    
                                                ))
                                            :   <span className="game-details-data__item">
                                                    ---
                                                </span>
                                        }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="game-details-section game-details-section--websites">
                            <h3 className="game-details-section__title">
                                Websites:
                            </h3>
                            {gameDetails.url}<br/>
                            <div className="game-details-sectiom__content">
                            {
                                ('websites' in gameDetails)
                                ?   gameDetails.websites.map((website, index) => (
                                        <span className="game-details-data__item" key={index}>
                                            <a href={website.url} >
                                                {websitesCategory[website.category].title}
                                            </a>
                                        </span>
                                    ))
                                :   <span className="game-details-data__item">
                                        No websites
                                    </span>
                            }
                            </div>
                        </div> */}

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
            <ImageModal />
        </div>
    )
};

export default Details;