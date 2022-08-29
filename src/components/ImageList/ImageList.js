import React, { useEffect, useState } from "react";

import igdbApi from "../../api/igdbApi";

import "./ImageList.scss";

const ImageList = props => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const getImages = async () => {
            const queryParams = `fields *; where game = ${props.gameId}`;
            const response = await igdbApi.getImages(queryParams);
            setImages(response);
        };
        getImages();
    }, []);

    return (
        <div className="image-list">
            {
                
            }
        </div>
    )
};

export default ImageList;