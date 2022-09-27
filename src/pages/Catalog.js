import React from "react";
import { useParams } from "react-router-dom";

import PageHeader from "../components/PageHeader/PageHeader";
import GameGrid from "../components/GameGrid/GameGrid";

const Catalog = () => {
    const { keyword } = useParams();

    return (
        <main className="main container">
            <PageHeader>
                Games
            </PageHeader>
            <GameGrid keyword={ keyword }/>
        </main>
    )
};

export default Catalog;