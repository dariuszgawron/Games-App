import React, { Suspense, useRef } from "react";

const GameList = React.lazy(() => import("../components/GameList/GameList"));

const today = new Date();
const sectionsConfig = [
    {
        title: 'Popular games',
        link: '/games',
        query: 'fields *; sort rating desc; limit 20;'
    },
    {
        title: 'Recently released',
        link: '/games',
        query: `fields *; where created_at <= ${today.getTime()/1000}; sort created_at desc; limit 20;`
    }, 
    {
        title: 'Coming soon',
        link: '/games',
        query: `fields *; where created_at > ${today.getTime()/1000}; sort created_at asc; limit 20;`
    },
    {
        title: 'Top rated',
        link: '/games',
        query: 'fields *; sort rating desc; limit 20;'
    }
];

const Home = () => {
    const navPrevRef = useRef(null);
    const navNextRef = useRef(null);

    return (
        <main className="main">
            {
                sectionsConfig.map((section, index) => (
                    <section className="section container" key={index}>
                        <div className="section__header">
                            <h2 className="section__title">
                                {section.title}
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
                            <Suspense>
                                <GameList query={section.query} navPrevRef={navPrevRef} navNextRef={navNextRef} />
                            </Suspense>
                        </div>
                    </section>
                ))
            }
        </main>
    )
};

export default Home;