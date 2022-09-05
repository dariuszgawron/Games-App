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
    const navPrevRef = useRef(null);
    const navNextRef = useRef(null);

    useEffect(() => {
        const getGames = async () => {
            const queryParams = props.query ? props.query : 'fields *;';
            const response = await igdbApi.getGames(queryParams);
            setGames(response);
        };
        getGames();
    }, [props.query]);

    useEffect(() => {
        const getCovers = async () => {
            const gameIds = games.map(game => game.id).join(',');
            const queryParams = `fields *; where game = ${gameIds};`;
            const response = await igdbApi.getCovers(queryParams);
            setCovers(response);
        };
        getCovers();
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
                            prevEl: navPrevRef.current,
                            nextEl: navNextRef.current
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
                                    <GameCard game={game} cover={covers.find(cover => cover.game === game.id)} />
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