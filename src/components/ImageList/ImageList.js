import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import igdbApi from "../../api/igdbApi";

import igdbConfig, { imageSize } from "../../api/igdbConfig";

import "./ImageList.scss";

const ImageList = props => {
    const [images, setImages] = useState([]);
    
    const openModal = event => {
        const imageModal = document.getElementById('image-modal');
        const imageSrc = igdbConfig.imageUrl(imageSize.size1080p, event.target.getAttribute('data-filepath'));
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
            images.length > 0 
            ?   <div className="image-list__grid">
                {
                    images.map((image, index) => (
                        <div className="image-list__grid-item" key={index}>
                            <img className="image-list__grid-img" src={igdbConfig.imageUrl(imageSize.screenshotBig, image.image_id)} alt={`${props.gameTitle} - gallery`} data-filepath={image.image_id} onClick={openModal}/>
                        </div>
                    ))
                }
                </div>
            :   <span className="image-list__empty">
                    <i className='image-list__empty-icon bx bxs-invader'></i>
                    There are no images for the selected game
                </span>
        }
        </div>
    )
};

ImageList.propTypes = {
    gameId: PropTypes.string.isRequired,
    gameTitle: PropTypes.string
};

export default ImageList;