import React, { useEffect, useState } from "react";
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import igdbApi from "../../api/igdbApi";

import HeroSlide from "../HeroSlide/HeroSlide";

import "./HeroSlider.scss";

const HeroSlider = () => {
    SwiperCore.use([Autoplay]);

    const [slides, setSlides] = useState([]);

    useEffect(() => {
        const getGames = async () => {
            const queryParams = 'fields *; limit 3;';
            const response = igdbApi.getGames(queryParams);
            setSlides(response);
        };
        getGames();
    }, [])

    return (
        <div className="hero-slider">
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                modules={[Autoplay]}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false
                }}
                speed={3000}
                loop={true}
            >
                {
                    slides.map((game, index) => (
                        <SwiperSlide key={index}>
                            <HeroSlide game={game} key={index} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
};

export default HeroSlider;