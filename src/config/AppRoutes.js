import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Detail from "../pages/Detail";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/games/search/:keyword' element={<Catalog />} />
            <Route path='/games/:id' element={<Detail />} />
            <Route path='/games' element={<Catalog />} />
            <Route path='/' element={<Home />} />
        </Routes>
    )
};

export default AppRoutes;