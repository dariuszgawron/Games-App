import React, { Suspense } from "react";

const GameList = React.lazy(() => import("../components/GameList/GameList"));

const today = new Date();
const sectionsConfig = [
    {
        title: 'Popular games',
        link: '/games',
        query: 'fields *; limit 20;'
    },
    {
        title: 'Recently released',
        link: '/games',
        query: `fields *; where created_at <= ${today.getTime()}; sort created_at desc; limit 20;`
    }, 
    {
        title: 'Coming soon',
        link: '/games',
        query: `fields *; where created_at > ${today.getTime()}; sort created_at asc; limit 20;`
    },
    {
        title: 'Top rated',
        link: '/games',
        query: 'fields *; sort rating desc; limit 20;'
    }
];

const Home = () => {
    return (
        <main className="main">
            <Suspense>
                <GameList query={''}/>
            </Suspense>
            {
                sectionsConfig.map((section, index) => (
                    <section className="section" key={index}>
                        <div className="section__header">
                            <h2 className="section__title">
                                {section.title}
                            </h2>
                        </div>
                        <div className="section__content">
                            <Suspense>
                                <GameList query={section.query} />
                            </Suspense>
                        </div>
                    </section>
                ))
            }
        </main>
    )
};

export default Home;