import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import igdbApi from "../../api/igdbApi";

import igdbConfig, { screenshotSize } from "../../api/igdbConfig";

import "./ImageList.scss";

const ImageList = props => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const getImages = async () => {
            const queryParams = `fields *; where game = ${props.gameId};`;
            const response = await igdbApi.getScreenshots(queryParams);
            setImages(response);
            console.log(response);
        };
        getImages();
    }, [props.gameId]);

    return (
        <div className="image-list">
            {
                images && images.map((image, index) => (
                    <div key={index}>
                        <img src={igdbConfig.imageUrl(screenshotSize.size700p, image.image_id)} alt={''} />
                    </div>
                ))
            }
        </div>
    )
};

ImageList.propTypes = {
    gameId: PropTypes.string.isRequired
};

export default ImageList;