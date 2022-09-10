import React, { Suspense } from "react";

const GameList = React.lazy(() => import("../components/GameList/GameList"));

const today = new Date();
const sectionsConfig = [
    {
        title: 'Popular games',
        link: '/games',
        query: 'fields *, cover.*, platforms.*; sort rating desc; limit 20;'
    },
    {
        title: 'Recently released',
        link: '/games',
        query: `fields *, cover.*, platforms.*; where created_at <= ${today.getTime()/1000}; sort created_at desc; limit 20;`
    }, 
    {
        title: 'Coming soon',
        link: '/games',
        query: `fields *, cover.*, platforms.*; where created_at > ${today.getTime()/1000}; sort created_at asc; limit 20;`
    },
    {
        title: 'Top rated',
        link: '/games',
        query: 'fields *, cover.*, platforms.*; sort rating desc; limit 20;'
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