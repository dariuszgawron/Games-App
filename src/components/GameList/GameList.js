import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import igdbApi from "../../api/igdbApi";

import GameCard from "../GameCard/GameCard";

import "swiper/css";
import "swiper/css/navigation";
import "./GameList.scss";

const GameList = props => {
    const [games, setGames] = useState([]);
    const [covers, setCovers] = useState([]);
    // const navPrevRef = useRef(null);
    // const navNextRef = useRef(null);

    useEffect(() => {
        console.log(props.query);
        const getGames = async () => {
            const queryParams = props.query ? props.query : 'fields *; limit 20;';
            const response = await igdbApi.getGames(queryParams);
            setGames(response);
        };
        getGames();
    }, [props.query]);

    useEffect(() => {
        const getCovers = async () => {
            const gameIds = games.map(game => game.id).join(',');
            console.log(gameIds);
            const queryParams = `fields *; where game = (${gameIds}); limit 20;`;
            const response = await igdbApi.getCovers(queryParams);
            setCovers(response);
        };
        if(games.length>0) {
            getCovers();
        }
    }, [games]);

    return (
        <div className="game-list">
            {
                games && games.length>0 ? (
                    <Swiper
                        spaceBetween={15}
                        slidesPerView={2}
                        modules={[Navigation]}
                        navigation={{
                            prevEl: props.navPrevRef.current,
                            nextEl: props.navNextRef.current
                        }}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = props.navPrevRef.current;
                            swiper.params.navigation.nextEl = props.navNextRef.current;
                        }}
                        breakpoints={{
                            578: {
                                slidesPerView: 3
                            },
                            768: {
                                slidesPerView: 4
                            },
                            1100: {
                                slidesPerView: 5
                            },
                            1300: {
                                slidesPerView: 6
                            }
                        }}
                    >
                        {
                            games.map((game, index) => (
                                <SwiperSlide key={index}>
                                    <GameCard game={game} cover={covers.find(cover => cover.game === game.id) || {} } />
                                </SwiperSlide>  
                            ))
                        }
                    </Swiper>
                ) : (
                    <div className="media-list__info">

                    </div>
                )
                    
            }
        </div>
    )
};

MediaList.propTypes = {
    query: PropTypes.string
};

export default GameList;