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
            const queryParams = props.query ? props.query : 'fields *, cover.*, platforms.*; limit 20;';
            const response = await igdbApi.getGames(queryParams);
            setGames(response);
        };
        getGames();
    }, [props.query]);

    useEffect(() => {
        const getCovers = async () => {
            const gameIds = games.map(game => game.id).join(',');
            const queryParams = `fields *; where game = (${gameIds}); limit 20;`;
            const response = await igdbApi.getCovers(queryParams);
            setCovers(response);
        };
        if(games.length>0) {
            getCovers();
        }
    }, [games]);

    return (
        <section className="game-list section container">
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
                    games && games.length>0 ? (
                        <Swiper
                            spaceBetween={15}
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
                            No data
                        </div>
                    )  
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