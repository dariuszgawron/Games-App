import React from "react";

import PageHeader from "../components/PageHeader/PageHeader";
import GameGrid from "../components/GameGrid/GameGrid";

const Catalog = () => {
    return (
        <main className="main container">
            <PageHeader>
                Catalog
            </PageHeader>
            <GameGrid />
        </main>
    )
};

export default Catalog;