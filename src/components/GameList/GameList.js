import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import igdbApi from "../../api/igdbApi";

import Loader from "../Loader/Loader";
import GameCard from "../GameCard/GameCard";

import "swiper/css";
import "swiper/css/navigation";
import "./GameList.scss";

const GameList = props => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navPrevRef = useRef(null);
    const navNextRef = useRef(null);

    useEffect(() => {
        const getGames = async () => {
            const queryParams = props.query ? props.query : 'fields *, cover.*, platforms.*, platforms.platform_logo.*; limit 20;';
            try {
                const response = await igdbApi.getGames(queryParams);
                setGames(response);
            } catch(error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        getGames();
    }, [props.query]);

    return (
        <section className="game-list section">
            <div className="section__header">
                <h2 className="section__title">
                    {props.title}
                </h2>
                <div className="section__navigation">
                    <div className="section__navigation-item" ref={navPrevRef}>
                        <i className="section__navigation-icon bx bx-chevron-left"></i>
                    </div>
                    <div className="section__navigation-item" ref={navNextRef}>
                        <i className="section__navigation-icon bx bx-chevron-right"></i>
                    </div>
                </div>
            </div>
            <div className="section__content">
            {
                loading 
                ?   <div className="section__loading">
                        <Loader />
                    </div>
                :   games && games.length>0 
                    ?   <Swiper
                            spaceBetween={10}
                            slidesPerView={1}
                            modules={[Navigation]}
                            navigation={{
                                prevEl: navPrevRef.current,
                                nextEl: navNextRef.current
                            }}
                            onBeforeInit={(swiper) => {
                                swiper.params.navigation.prevEl = navPrevRef.current;
                                swiper.params.navigation.nextEl = navNextRef.current;
                            }}
                            breakpoints={{
                                578: {
                                    slidesPerView: 2
                                },
                                768: {
                                    slidesPerView: 3
                                },
                                1100: {
                                    slidesPerView: 4
                                },
                                1300: {
                                    slidesPerView: 5
                                },
                                1400: {
                                    slidesPerView: 6
                                }
                            }}
                        >
                            {
                                games.map((game, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="game-list__content">
                                            <GameCard game={game} />
                                        </div>
                                    </SwiperSlide>  
                                ))
                            }
                        </Swiper>
                    :   <div className="game-list__info">
                            <i className='game-list__empty-icon bx bx-shocked'></i>
                            <span className="game-list__empty-text">
                                There is no data to display
                            </span>
                        </div>
            }
            </div>
        </section>
    )
};

MediaList.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string,
    query: PropTypes.string
};

export default GameList;