import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../Modal/Modal";

import "./SearchModal.scss";

const SearchModal = () => {
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const [keyword, setKeyword] = useState('');

    const searchGame = useCallback(
        () => {
            console.log(keyword);
            if(keyword.trim.length>0) {
                navigate(`/games/search/${keyword}`);
            };
            setKeyword('');
        },
        [navigate, keyword]
    );

    useEffect(() => {
        const handleEnter = (event) => {
            event.preventDefault();
            if(event.keyCode === 13) {
                searchGame();
            }
        };
        document.addEventListener('keyup', handleEnter);
        return () => {
            document.removeEventListener('keyup', handleEnter);
        }
    }, [searchGame]);

    return (
        <div className="search-modal">
            <Modal active={false} modalId="search-modal">
                <div className="search-modal__box">
                    <input 
                        className="search-modal__input" 
                        ref={inputRef}
                        type="search"
                        placeholder="Search games"
                        onChange={event => setKeyword(event.target.value)} 
                    />
                    <button className="search-modal__button" onClick={searchGame} >
                        <i className="search-modal__button-icon bx bx-search"></i>
                    </button>
                </div>
            </Modal>
        </div>
    )
};

export default SearchModal;