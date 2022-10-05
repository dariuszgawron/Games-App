import React, { useRef } from "react";

import Modal from "../Modal/Modal";

import "./ImageModal.scss";

const ImageModal = props => {
    const imageRef = useRef(null);

    const onClose = () => imageRef.current.setAttribute('src','');

    return (
        <div className="image-modal">
            <Modal active={false} onClose={onClose} modalId='image-modal'>
                <img className="image-modal__img" ref={imageRef} alt={`${props.title} - gallery`} />
            </Modal>
        </div>
    )
};

export default ImageModal;