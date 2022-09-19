import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import igdbApi from "../../api/igdbApi";

import igdbConfig, { imageSize } from "../../api/igdbConfig";

import "./ImageList.scss";

const ImageList = props => {
    const [images, setImages] = useState([]);
    
    const openModal = event => {
        const imageModal = document.getElementById('image-modal');
        const imageSrc = igdbConfig.imageUrl(imageSize.screenshotHuge, event.target.getAttribute('data-filepath'));
        imageModal.querySelector('.image-modal__img').setAttribute('src', imageSrc);
        imageModal.classList.toggle('modal--active'); 
    } 

    useEffect(() => {
        const getImages = async () => {
            const queryParams = `fields *; where game = ${props.gameId};`;
            const response = await igdbApi.getScreenshots(queryParams);
            setImages(response);
        };
        getImages();
    }, [props.gameId]);

    return (
        <div className="image-list">
            {
                images.length>0 
                ?   images.map((image, index) => (
                        <div className="image-list__item" key={index}>
                            <img className="image-list__img" src={igdbConfig.imageUrl(imageSize.size720p, image.image_id)} alt={''} data-filepath={image.image_id} onClick={openModal}/>
                        </div>
                    ))
                :   'No images'
            }
        </div>
    )
};

ImageList.propTypes = {
    gameId: PropTypes.string.isRequired
};

export default ImageList;