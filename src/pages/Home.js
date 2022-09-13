import React, { Suspense } from "react";

import igdbConfig from "../api/igdbConfig";

const GameList = React.lazy(() => import("../components/GameList/GameList"));

const today = new Date();
const sectionsConfig = [
    {
        title: 'Popular games',
        link: '/games',
        query: `fields *, cover.*, platforms.*, platforms.platform_logo.*; where rating > 0; sort rating desc; limit ${igdbConfig.swiperItems};`
    },
    {
        title: 'Recently released',
        link: '/games',
        query: `fields *, cover.*, platforms.*, platforms.platform_logo.*; where created_at <= ${today.getTime()/1000}; sort created_at desc; limit ${igdbConfig.swiperItems};`
    }, 
    {
        title: 'Coming soon',
        link: '/games',
        query: `fields *, cover.*, platforms.*, platforms.platform_logo.*; where created_at > ${today.getTime()/1000}; sort created_at asc; limit ${igdbConfig.swiperItems};`
    },
    {
        title: 'Top rated',
        link: '/games',
        query: `fields *, cover.*, platforms.*, platforms.platform_logo.*; sort rating desc; limit ${igdbConfig.swiperItems};`
    }
];

const Home = () => {
    return (
        <main className="main">
            {
                sectionsConfig.map((section, index) => (
                    <Suspense key={index}>
                        <GameList title={section.title} link={section.link} query={section.query} />
                    </Suspense>
                ))
            }
        </main>
    )
};

export default Home;