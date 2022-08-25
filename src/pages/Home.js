import React from 'react';

import GameList from '../components/GameList/GameList';

const sectionsConfig = [
    {}
];

const Home = () => {
    return (
        <main className='main'>
            <div className='main__container'>
                <GameList />
            </div>
        </main>
    )
};

export default Home;