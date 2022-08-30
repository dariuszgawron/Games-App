import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import igdbApi from "../../api/igdbApi";

import "./ImageList.scss";

const ImageList = props => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const getImages = async () => {
            const queryParams = `fields *; where game = ${props.gameId}`;
            const response = await igdbApi.getScreenshots(queryParams);
            setImages(response);
        };
        getImages();
    }, [props.gameId]);

    return (
        <div className="image-list">
            {
                images && images.map((image, index) => (
                    <div>
                        <img src={image.url} alt={''} />
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