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
    const navPrevRef = useRef(null);
    const navNextRef = useRef(null);

    useEffect(() => {
        const getGames = async () => {
            let response = null;
            const queryParams = props.query ? props.query : 'fields *;';
            response = await igdbApi.getGames(queryParams);
            setGames(response);
        };
        getGames();
    }, [props.query]);

    return (
        <div className="game-list">
            {
                games && games.length>0 ? (
                    <Swiper
                        spaceBetween={15}
                        slidesPerView={1}
                    >
                        {
                            games.map((game, index) => (
                                <SwiperSlide key={index}>
                                    <GameCard game={game} />
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