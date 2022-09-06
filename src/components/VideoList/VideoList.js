import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import igdbApi from "../../api/igdbApi";

import "./VideoList.scss";

const VideoList = props => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            const queryParams = `fields *; where game = ${props.gameId};`;
            const response = await igdbApi.getVideos(queryParams);
            setVideos(response);
        };
        getVideos();
    }, [props.gameId]);

    return (
        <div className="video-list">

        </div>
    )
};

VideoList.propTypes = {
    gameId: PropTypes.string.isRequired
};

export default VideoList;